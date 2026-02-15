export interface Scenario {
  id: string;
  title: string;
  category: "sms" | "whatsapp" | "email";
  sender: string;
  message: string;
  answer: "scam" | "suspicious" | "safe";
  difficulty: "easy" | "medium" | "hard";
}

export const scenarios: Scenario[] = [
  {
    id: "poste-1",
    title: "رسالة من البريد التونسي",
    category: "sms",
    sender: "PosteTN",
    message:
      "عزيزي العميل، طردك في انتظارك في مكتب البريد. يرجى دفع رسوم التوصيل ١٥ دينار عبر الرابط التالي لتأكيد التسليم: http://poste-tn.xyz/pay لتفادي إرجاع الطرد خلال ٢٤ ساعة.",
    answer: "scam",
    difficulty: "easy",
  },
  {
    id: "biat-1",
    title: "تنبيه من البنك",
    category: "sms",
    sender: "BIAT Bank",
    message:
      "تنبيه أمني: تم رصد محاولة دخول غير مصرح بها لحسابك البنكي. لتأمين حسابك فوراً اضغط هنا: http://biat-secure.net/verify أو سيتم تعليق الحساب.",
    answer: "scam",
    difficulty: "easy",
  },
  {
    id: "whatsapp-1",
    title: "طلب رمز التحقق",
    category: "whatsapp",
    sender: "صديق",
    message:
      "سلام خويا، وصلتني رسالة فيها كود بالغلط على نمرتك. تنجم تبعثهولي؟ هو كود متاع حاجة نحب نقوم بيها. عاجل برشا!",
    answer: "scam",
    difficulty: "medium",
  },
  {
    id: "steg-1",
    title: "فاتورة الكهرباء STEG",
    category: "sms",
    sender: "STEG",
    message:
      "الشركة التونسية للكهرباء والغاز: فاتورتك لشهر جانفي جاهزة للخلاص. المبلغ: ١٢٧.٥٠٠ دينار. آخر أجل: ٢٨/٠١. خلّص عبر: http://steg-facture.com/pay",
    answer: "scam",
    difficulty: "medium",
  },
  {
    id: "marketplace-1",
    title: "بيع على Facebook Marketplace",
    category: "whatsapp",
    sender: "مشتري",
    message:
      "مرحبا، حبيت نشري المنتج اللي حاطو في Marketplace. نبعثلك الفلوس عن طريق تحويل بريدي. ابعثلي نمرة بطاقة التعريف الوطنية متاعك باش نعمل التحويل.",
    answer: "scam",
    difficulty: "medium",
  },
  {
    id: "job-1",
    title: "عرض عمل مغري",
    category: "email",
    sender: "HR@company-tn.com",
    message:
      "تهانينا! تم اختيارك للعمل معنا براتب ٣٠٠٠ دينار شهرياً. العمل من المنزل ٣ ساعات يومياً فقط. لتأكيد التسجيل أرسل نسخة من بطاقة هويتك + صورة شخصية إلى هذا البريد.",
    answer: "scam",
    difficulty: "easy",
  },
  {
    id: "operator-1",
    title: "رسالة من المشغل",
    category: "sms",
    sender: "Ooredoo",
    message:
      "Ooredoo: استهلاكك للأنترنت وصل ٩٠٪. باش تزيد ١ Go مجاناً اضغط هنا: http://ooredoo-bonus.tk/free",
    answer: "scam",
    difficulty: "easy",
  },
  {
    id: "real-bank-1",
    title: "إشعار بنكي حقيقي",
    category: "sms",
    sender: "BanqueTN",
    message:
      "عملية سحب بمبلغ ٢٥٠ دينار من حسابك يوم ١٥/٠١ الساعة ١٤:٣٠ من شباك آلي شارع الحبيب بورقيبة. للاستفسار اتصل بوكالتك.",
    answer: "safe",
    difficulty: "hard",
  },
];
