import { generateObject } from "ai";
import { model } from "@/lib/azure";
import { z } from "zod";

export async function POST(req: Request) {
  const { scenario, userChoice } = await req.json();

  console.log("\n══════════════════════════════════════════");
  console.log("📡 [SIMULATE API] Request received");
  console.log("──────────────────────────────────────────");
  console.log("Scenario:", scenario.title);
  console.log("Sender:", scenario.sender);
  console.log("Category:", scenario.category);
  console.log("User Choice:", userChoice);
  console.log("Correct Answer:", scenario.answer);
  console.log("──────────────────────────────────────────");

  try {
    const result = await generateObject({
      model,
      schema: z.object({
        explanation: z.string().describe("شرح مبسط باللغة العربية لماذا هذه الرسالة احتيالية أو آمنة"),
        redFlags: z.array(z.string()).describe("قائمة العلامات التحذيرية في الرسالة"),
        tactic: z.string().describe("الأسلوب النفسي المستخدم في محاولة الاحتيال"),
        advice: z.string().describe("نصيحة عملية للمستخدم"),
      }),
      prompt: `أنت خبير أمن سيبراني تونسي. حلل الرسالة التالية واشرح للمستخدم بطريقة بسيطة وواضحة.

الرسالة: "${scenario.message}"
المرسل: ${scenario.sender}
نوع الرسالة: ${scenario.category}
الإجابة الصحيحة: ${scenario.answer === "scam" ? "احتيال" : scenario.answer === "suspicious" ? "مشبوه" : "آمن"}
اختيار المستخدم: ${userChoice === "scam" ? "احتيال" : userChoice === "suspicious" ? "مشبوه" : "آمن"}

اشرح:
1. لماذا هذه الرسالة ${scenario.answer === "scam" ? "احتيالية" : "آمنة"}
2. ما هي العلامات التحذيرية (إن وجدت)
3. ما الأسلوب النفسي المستخدم للتلاعب بالضحية
4. نصيحة عملية للحماية

استخدم لغة عربية بسيطة مفهومة للجميع. كن مختصراً ومباشراً.`,
    });

    console.log("\n✅ [SIMULATE API] AI Response:");
    console.log(JSON.stringify(result.object, null, 2));
    console.log("══════════════════════════════════════════\n");

    return Response.json(result.object);
  } catch (error) {
    console.error("\n❌ [SIMULATE API] Error:", error);
    console.log("══════════════════════════════════════════\n");
    return Response.json(
      { error: "AI generation failed", details: String(error) },
      { status: 500 }
    );
  }
}
