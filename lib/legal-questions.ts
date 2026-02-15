import type { Locale } from "./i18n";

export interface LegalQuestion {
  id: number;
  question: Record<Locale, string>;
  options: { label: Record<Locale, string>; correct: boolean }[];
  explanation: Record<Locale, string>;
  law: string;
}

export const legalQuestions: LegalQuestion[] = [
  {
    id: 1,
    question: {
      ar: "هل الدخول إلى حساب شخص آخر بدون إذنه يُعتبر جريمة في تونس؟",
      en: "Is accessing someone's account without permission a crime in Tunisia?",
      fr: "Acceder au compte de quelqu'un sans permission est-il un crime en Tunisie ?",
    },
    options: [
      {
        label: {
          ar: "نعم، جريمة يعاقب عليها القانون",
          en: "Yes, it's a punishable crime",
          fr: "Oui, c'est un crime punissable",
        },
        correct: true,
      },
      {
        label: {
          ar: "لا، إذا لم أسرق شيئاً",
          en: "No, if I didn't steal anything",
          fr: "Non, si je n'ai rien vole",
        },
        correct: false,
      },
      {
        label: {
          ar: "فقط إذا كان حساباً بنكياً",
          en: "Only if it's a bank account",
          fr: "Seulement si c'est un compte bancaire",
        },
        correct: false,
      },
    ],
    explanation: {
      ar: "الدخول غير المرخص لنظام معلوماتي هو جريمة بموجب القانون التونسي، حتى لو لم يحدث أي ضرر مادي. العقوبة قد تصل إلى السجن والغرامة المالية.",
      en: "Unauthorized access to a computer system is a crime under Tunisian law, even if no material damage occurs. Penalties can include prison and fines.",
      fr: "L'acces non autorise a un systeme informatique est un crime selon la loi tunisienne, meme sans dommage materiel. Les sanctions peuvent inclure la prison et des amendes.",
    },
    law: "Article 199 bis - Penal Code",
  },
  {
    id: 2,
    question: {
      ar: "هل مشاركة صور شخصية لشخص آخر بدون موافقته قانونية؟",
      en: "Is sharing someone's personal photos without consent legal?",
      fr: "Est-il legal de partager les photos personnelles de quelqu'un sans consentement ?",
    },
    options: [
      {
        label: {
          ar: "نعم، إذا كانت الصور عادية",
          en: "Yes, if the photos are normal",
          fr: "Oui, si les photos sont normales",
        },
        correct: false,
      },
      {
        label: {
          ar: "لا، هذا انتهاك للخصوصية ويعاقب عليه",
          en: "No, it's a privacy violation and punishable",
          fr: "Non, c'est une violation de la vie privee et c'est punissable",
        },
        correct: true,
      },
      {
        label: {
          ar: "نعم، إذا كنت صديقه",
          en: "Yes, if you're their friend",
          fr: "Oui, si vous etes son ami",
        },
        correct: false,
      },
    ],
    explanation: {
      ar: "نشر أو مشاركة صور خاصة بدون موافقة صاحبها يُعد انتهاكاً للخصوصية ويعاقب عليه القانون التونسي.",
      en: "Publishing or sharing private photos without the owner's consent is a privacy violation punishable under Tunisian law.",
      fr: "Publier ou partager des photos privees sans le consentement du proprietaire est une violation de la vie privee punissable par la loi tunisienne.",
    },
    law: "Personal Data Protection Law 2004",
  },
  {
    id: 3,
    question: {
      ar: "هل انتحال هوية شخص آخر على الإنترنت يُعتبر جريمة؟",
      en: "Is impersonating someone online considered a crime?",
      fr: "Usurper l'identite de quelqu'un en ligne est-il considere comme un crime ?",
    },
    options: [
      {
        label: {
          ar: "لا، هو مجرد حساب مزيف",
          en: "No, it's just a fake account",
          fr: "Non, c'est juste un faux compte",
        },
        correct: false,
      },
      {
        label: {
          ar: "فقط إذا استخدمته للاحتيال المالي",
          en: "Only if used for financial fraud",
          fr: "Seulement si utilise pour une fraude financiere",
        },
        correct: false,
      },
      {
        label: {
          ar: "نعم، يُعاقب عليه حتى بدون ضرر مالي",
          en: "Yes, it's punishable even without financial harm",
          fr: "Oui, c'est punissable meme sans prejudice financier",
        },
        correct: true,
      },
    ],
    explanation: {
      ar: "انتحال هوية شخص آخر رقمياً هو جريمة بموجب القانون التونسي. إنشاء حساب وهمي باسم شخص آخر يمكن أن يؤدي إلى عقوبة سجنية.",
      en: "Digitally impersonating someone is a crime under Tunisian law. Creating a fake account in someone's name can lead to imprisonment.",
      fr: "Usurper l'identite numerique de quelqu'un est un crime selon la loi tunisienne. Creer un faux compte au nom de quelqu'un peut mener a l'emprisonnement.",
    },
    law: "Article 199 ter - Penal Code",
  },
  {
    id: 4,
    question: {
      ar: "هل استخدام شبكة WiFi لجارك بدون إذنه قانوني؟",
      en: "Is using your neighbor's WiFi without permission legal?",
      fr: "Est-il legal d'utiliser le WiFi de votre voisin sans permission ?",
    },
    options: [
      {
        label: {
          ar: "نعم، إذا لم يضع كلمة مرور",
          en: "Yes, if there's no password",
          fr: "Oui, s'il n'y a pas de mot de passe",
        },
        correct: false,
      },
      {
        label: {
          ar: "لا، يُعتبر دخولاً غير مرخصاً لنظام اتصالات",
          en: "No, it's unauthorized access to a communication system",
          fr: "Non, c'est un acces non autorise a un systeme de communication",
        },
        correct: true,
      },
      {
        label: {
          ar: "نعم، WiFi ملك عام",
          en: "Yes, WiFi is public property",
          fr: "Oui, le WiFi est un bien public",
        },
        correct: false,
      },
    ],
    explanation: {
      ar: "استخدام شبكة إنترنت بدون إذن صاحبها يُعد دخولاً غير مرخص. حتى لو كانت الشبكة بدون حماية، فهي ملك خاص.",
      en: "Using someone's internet without permission is unauthorized access. Even if the network is unprotected, it's private property.",
      fr: "Utiliser l'internet de quelqu'un sans permission est un acces non autorise. Meme si le reseau n'est pas protege, c'est une propriete privee.",
    },
    law: "Telecommunications Law 2001",
  },
  {
    id: 5,
    question: {
      ar: "إذا اكتشفت ثغرة أمنية في موقع حكومي، هل يمكنك استغلالها؟",
      en: "If you discover a security vulnerability in a government website, can you exploit it?",
      fr: "Si vous decouvrez une faille de securite sur un site gouvernemental, pouvez-vous l'exploiter ?",
    },
    options: [
      {
        label: {
          ar: "نعم، لمساعدتهم على إصلاحها",
          en: "Yes, to help them fix it",
          fr: "Oui, pour les aider a la corriger",
        },
        correct: false,
      },
      {
        label: {
          ar: "لا، يجب الإبلاغ عنها دون استغلالها",
          en: "No, you should report it without exploiting it",
          fr: "Non, vous devez la signaler sans l'exploiter",
        },
        correct: true,
      },
      {
        label: {
          ar: "نعم، إذا لم أسبب ضرراً",
          en: "Yes, if I don't cause damage",
          fr: "Oui, si je ne cause pas de dommage",
        },
        correct: false,
      },
    ],
    explanation: {
      ar: "حتى بنية حسنة، استغلال ثغرة أمنية بدون إذن مسبق يُعد جريمة. الطريقة الصحيحة هي الإبلاغ عن الثغرة للجهة المعنية أو لـ CERT التونسي.",
      en: "Even with good intentions, exploiting a security vulnerability without prior authorization is a crime. The correct approach is to report it to the relevant authority or Tunisian CERT.",
      fr: "Meme avec de bonnes intentions, exploiter une faille de securite sans autorisation prealable est un crime. L'approche correcte est de la signaler a l'autorite concernee ou au CERT tunisien.",
    },
    law: "Article 199 bis - Penal Code",
  },
  {
    id: 6,
    question: {
      ar: "هل إرسال رسائل تهديد عبر فيسبوك أو واتساب يُعتبر جريمة؟",
      en: "Is sending threatening messages via Facebook or WhatsApp a crime?",
      fr: "Envoyer des messages menacants via Facebook ou WhatsApp est-il un crime ?",
    },
    options: [
      {
        label: {
          ar: "لا، هي مجرد كلام على الإنترنت",
          en: "No, it's just words on the internet",
          fr: "Non, ce ne sont que des mots sur internet",
        },
        correct: false,
      },
      {
        label: {
          ar: "فقط إذا نفذت التهديد",
          en: "Only if you carry out the threat",
          fr: "Seulement si vous executez la menace",
        },
        correct: false,
      },
      {
        label: {
          ar: "نعم، التهديد الرقمي جريمة كالتهديد المباشر",
          en: "Yes, digital threats are crimes like direct threats",
          fr: "Oui, les menaces numeriques sont des crimes comme les menaces directes",
        },
        correct: true,
      },
    ],
    explanation: {
      ar: "التهديد عبر وسائل الاتصال الرقمية له نفس الحكم القانوني كالتهديد المباشر. يمكن ملاحقة المرسل قضائياً حتى لو كان التهديد عبر الإنترنت.",
      en: "Digital threats carry the same legal weight as direct threats. The sender can be prosecuted even if the threat was made online.",
      fr: "Les menaces numeriques ont le meme poids juridique que les menaces directes. L'expediteur peut etre poursuivi meme si la menace a ete faite en ligne.",
    },
    law: "Article 222 - Penal Code",
  },
];
