import { generateObject } from "ai";
import { model } from "@/lib/azure";
import { z } from "zod";
import { getCached, setCache } from "@/lib/cache";

const CACHE_KEY = "questions";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function POST() {
  console.log("\n══════════════════════════════════════════");
  console.log("⚖️ [GENERATE QUESTIONS] Request received");
  console.log("══════════════════════════════════════════");

  const cached = getCached(CACHE_KEY);
  if (cached) {
    console.log("✅ [GENERATE QUESTIONS] Returning cached result");
    console.log("══════════════════════════════════════════\n");
    return Response.json(cached);
  }

  try {
    const result = await generateObject({
      model,
      schema: z.object({
        questions: z.array(
          z.object({
            id: z.number().describe("رقم السؤال"),
            question: z.object({
              ar: z.string().describe("السؤال بالعربية"),
              en: z.string().describe("السؤال بالإنجليزية"),
              fr: z.string().describe("السؤال بالفرنسية"),
            }),
            options: z.array(
              z.object({
                label: z.object({
                  ar: z.string(),
                  en: z.string(),
                  fr: z.string(),
                }),
                correct: z.boolean(),
              })
            ).describe("3 خيارات مع إجابة واحدة صحيحة"),
            explanation: z.object({
              ar: z.string().describe("الشرح بالعربية"),
              en: z.string().describe("الشرح بالإنجليزية"),
              fr: z.string().describe("الشرح بالفرنسية"),
            }),
            law: z.string().describe("المرجع القانوني التونسي"),
          })
        ),
      }),
      prompt: `أنت خبير قانوني تونسي متخصص في الجرائم الإلكترونية والقانون الرقمي التونسي.

أنشئ 6 أسئلة متنوعة لاختبار الوعي القانوني الرقمي للمواطنين التونسيين.

القوانين التونسية المرجعية:
- المجلة الجزائية التونسية (الفصول 199 مكرر، 199 ثالثاً، 222، 226 مكرر)
- القانون عدد 63 لسنة 2004 المتعلق بحماية المعطيات الشخصية
- قانون الاتصالات 2001
- القانون الأساسي عدد 61 لسنة 2016 المتعلق بمكافحة الإرهاب وغسل الأموال
- القانون عدد 5 لسنة 2004 المتعلق بالأمن المعلوماتي

المواضيع التي يجب تغطيتها:
1. الدخول غير المرخص للأنظمة المعلوماتية
2. انتهاك الخصوصية ونشر المعطيات الشخصية
3. انتحال الهوية الرقمية
4. التهديد والتحرش الإلكتروني
5. الاحتيال الإلكتروني
6. حقوق المستخدم في حالة الجرائم الإلكترونية

لكل سؤال:
- سؤال واقعي مرتبط بالحياة اليومية في تونس
- 3 خيارات (إجابة واحدة صحيحة)
- الخيارات الخاطئة يجب أن تبدو معقولة
- شرح مبسط وواضح بالعربية والإنجليزية والفرنسية
- مرجع قانوني تونسي دقيق (رقم الفصل والقانون)

اجعل الأسئلة عملية ومرتبطة بمواقف يومية يمكن أن يواجهها المواطن التونسي.
استخدم لغة بسيطة مفهومة للجميع.`,
    });

    console.log("\n✅ [GENERATE QUESTIONS] Generated", result.object.questions.length, "questions");
    console.log("══════════════════════════════════════════\n");

    setCache(CACHE_KEY, result.object, CACHE_TTL);
    return Response.json(result.object);
  } catch (error) {
    console.error("\n❌ [GENERATE QUESTIONS] Error:", error);
    console.log("══════════════════════════════════════════\n");
    return Response.json(
      { error: "AI generation failed", details: String(error) },
      { status: 500 }
    );
  }
}
