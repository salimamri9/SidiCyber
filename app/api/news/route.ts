import { generateObject } from "ai";
import { model } from "@/lib/azure";
import { z } from "zod";

async function fetchNewsHeadlines(): Promise<string[]> {
  const queries = [
    "cybersecurity Tunisia",
    "أمن سيبراني تونس",
    "piratage Tunisie",
    "cyber attack Tunisia",
    "احتيال إلكتروني تونس",
  ];

  const headlines: string[] = [];

  for (const query of queries) {
    try {
      const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=ar&gl=TN&ceid=TN:ar`;
      const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) continue;
      const xml = await res.text();
      const titleMatches = xml.match(/<item>[\s\S]*?<title>([\s\S]*?)<\/title>/g);
      if (titleMatches) {
        for (const match of titleMatches.slice(0, 3)) {
          const title = match.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, "").trim();
          if (title) headlines.push(title);
        }
      }
    } catch {
      // Skip failed queries
    }
  }

  return [...new Set(headlines)].slice(0, 10);
}

export async function POST() {
  console.log("\n══════════════════════════════════════════");
  console.log("📰 [NEWS API] Request received");
  console.log("══════════════════════════════════════════");

  try {
    const headlines = await fetchNewsHeadlines();
    console.log("Fetched headlines:", headlines.length);

    const headlinesContext = headlines.length > 0
      ? `\n\nعناوين أخبار حقيقية حديثة (استخدمها كمرجع إن كانت ذات صلة):\n${headlines.map((h, i) => `${i + 1}. ${h}`).join("\n")}`
      : "";

    const result = await generateObject({
      model,
      schema: z.object({
        articles: z.array(
          z.object({
            id: z.string().describe("معرف فريد"),
            title: z.object({
              ar: z.string(),
              en: z.string(),
              fr: z.string(),
            }),
            summary: z.object({
              ar: z.string().describe("ملخص 3-5 جمل"),
              en: z.string(),
              fr: z.string(),
            }),
            whyItMatters: z.object({
              ar: z.string(),
              en: z.string(),
              fr: z.string(),
            }),
            lessons: z.array(z.object({
              ar: z.string(),
              en: z.string(),
              fr: z.string(),
            })).describe("3 دروس مستفادة"),
            actions: z.array(z.object({
              ar: z.string(),
              en: z.string(),
              fr: z.string(),
            })).describe("3 إجراءات وقائية"),
            severity: z.enum(["critical", "high", "medium"]).describe("مستوى الخطورة"),
            category: z.enum(["phishing", "data_breach", "malware", "social_engineering", "policy"]).describe("تصنيف التهديد"),
            date: z.string().describe("تاريخ تقريبي"),
          })
        ),
      }),
      prompt: `أنت خبير أمن سيبراني تونسي ومحرر صحفي. أنشئ 5 أخبار ومقالات حديثة عن تهديدات الأمن السيبراني المتعلقة بتونس والمنطقة.
${headlinesContext}

المطلوب: 5 مقالات إخبارية متنوعة تشمل:
- حوادث سيبرانية حقيقية أو واقعية تمس تونس أو المنطقة العربية
- تهديدات حديثة (تصيد، اختراق بيانات، برامج خبيثة، هندسة اجتماعية)
- تحديثات سياسات الأمن الرقمي

لكل مقال يجب أن تجيب على:
1. ماذا حدث؟ (ملخص 3-5 جمل)
2. لماذا هذا مهم للمواطن التونسي؟
3. 3 دروس يجب أن يتعلمها المواطنون
4. 3 إجراءات وقائية ملموسة

اجعل المحتوى:
- واقعي ومرتبط بالسياق التونسي
- مبسط وغير تقني
- تعليمي ومفيد عملياً
- بالعربية والإنجليزية والفرنسية

التصنيفات: phishing, data_breach, malware, social_engineering, policy
مستويات الخطورة: critical, high, medium

أعطِ لكل مقال تاريخ تقريبي حديث (فيفري 2026 أو قبله بقليل).`,
    });

    console.log("\n✅ [NEWS API] Generated", result.object.articles.length, "articles");
    console.log("══════════════════════════════════════════\n");

    return Response.json(result.object);
  } catch (error) {
    console.error("\n❌ [NEWS API] Error:", error);
    console.log("══════════════════════════════════════════\n");
    return Response.json(
      { error: "AI generation failed", details: String(error) },
      { status: 500 }
    );
  }
}
