import { generateObject } from "ai";
import { model } from "@/lib/azure";
import { z } from "zod";
import { getCached, setCache } from "@/lib/cache";

const CACHE_KEY = "scenarios";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function POST() {
  console.log("\n══════════════════════════════════════════");
  console.log("🎯 [GENERATE SCENARIOS] Request received");
  console.log("══════════════════════════════════════════");

  const cached = getCached(CACHE_KEY);
  if (cached) {
    console.log("✅ [GENERATE SCENARIOS] Returning cached result");
    console.log("══════════════════════════════════════════\n");
    return Response.json(cached);
  }

  try {
    const result = await generateObject({
      model,
      schema: z.object({
        scenarios: z.array(
          z.object({
            id: z.string().describe("معرف فريد للسيناريو"),
            title: z.string().describe("عنوان السيناريو بالعربية"),
            category: z.enum(["sms", "whatsapp", "email"]).describe("نوع الرسالة"),
            sender: z.string().describe("اسم المرسل كما يظهر للمستخدم"),
            message: z.string().describe("نص الرسالة الكامل"),
            answer: z.enum(["scam", "suspicious", "safe"]).describe("التصنيف الصحيح"),
            difficulty: z.enum(["easy", "medium", "hard"]).describe("مستوى الصعوبة"),
          })
        ).describe("قائمة السيناريوهات"),
      }),
      prompt: `أنت خبير أمن سيبراني تونسي. أنشئ 8 سيناريوهات تدريبية متنوعة لتعليم المواطنين التونسيين كيفية اكتشاف الاحتيال الرقمي.

المطلوب:
- 8 سيناريوهات مختلفة ومتنوعة
- مزيج من: SMS، WhatsApp، Email
- مزيج من: احتيال (scam)، مشبوه (suspicious)، آمن (safe)
- على الأقل 1-2 رسائل آمنة حقيقية لتدريب التمييز
- مستويات صعوبة متنوعة: easy، medium، hard

السيناريوهات يجب أن تكون واقعية ومرتبطة بالسياق التونسي:
- مؤسسات تونسية: البريد التونسي، BIAT، BNA، Attijari، STEG، SONEDE، Ooredoo، Tunisie Télécom، Orange
- مواقف يومية: طرود بريدية، فواتير، عروض عمل، جوائز، تحويلات بنكية
- لهجة تونسية في رسائل WhatsApp (خويا، برشا، نحب، إلخ)
- روابط مشبوهة بنطاقات غريبة (.xyz، .tk، .ml) للرسائل الاحتيالية
- روابط رسمية حقيقية للرسائل الآمنة

لكل سيناريو:
- id: معرف فريد (مثل "poste-2024", "biat-alert")
- title: عنوان وصفي بالعربية
- category: "sms" أو "whatsapp" أو "email"
- sender: اسم المرسل كما يظهر
- message: نص الرسالة الكاملة (واقعية ومفصلة)
- answer: "scam" أو "suspicious" أو "safe"
- difficulty: "easy" أو "medium" أو "hard"

اجعل الرسائل الاحتيالية مقنعة وواقعية حتى يتعلم المستخدم التمييز. الرسائل الآمنة يجب أن تبدو كإشعارات حقيقية من مؤسسات تونسية.`,
    });

    console.log("\n✅ [GENERATE SCENARIOS] Generated", result.object.scenarios.length, "scenarios");
    console.log("══════════════════════════════════════════\n");

    setCache(CACHE_KEY, result.object, CACHE_TTL);
    return Response.json(result.object);
  } catch (error) {
    console.error("\n❌ [GENERATE SCENARIOS] Error:", error);
    console.log("══════════════════════════════════════════\n");
    return Response.json(
      { error: "AI generation failed", details: String(error) },
      { status: 500 }
    );
  }
}
