// بيانات توضيحية فقط — ليست بيانات سوق حقيقية.

export const SAMPLE_AD = `للبيع شقة فاخرة في حي النرجس شمال الرياض 🏙️
المساحة 185م² — 3 غرف نوم و2 حمام
السعر 1,250,000 ريال
مقدم 20% والباقي أقساط على 5 سنوات
مميزات: مسبح، موقف خاص، قريبة من طريق الملك سلمان`;

export type Parsed = { label: string; value: string }[];

export function parseAd(text: string): Parsed {
  const t = text.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
  const num = (re: RegExp) => {
    const m = t.match(re);
    return m ? m[1].replace(/,/g, "") : null;
  };
  const type = /فيلا/.test(t) ? "فيلا" : /أرض|ارض/.test(t) ? "أرض" : /شقة/.test(t) ? "شقة" : /دوبلكس/.test(t) ? "دوبلكس" : null;
  const loc = t.match(/(?:حي|في)\s+([\u0600-\u06FF]+(?:\s[\u0600-\u06FF]+)?)/)?.[1] ?? null;
  const area = num(/(\d[\d,]*)\s*(?:م²|م2|متر|م\b)/);
  const price = num(/(?:السعر|بسعر|سعر)\s*:?\s*(\d[\d,]*)/) ?? num(/(\d[\d,]{5,})/);
  const rooms = num(/(\d+)\s*غرف/);
  const baths = num(/(\d+)\s*(?:حمام|دورات)/);
  const down = num(/مقدم\s*(\d+)\s*%/);
  const years = num(/(\d+)\s*سنوات/);
  const currency = /جنيه/.test(t) ? "EGP" : "SAR";
  const features = t.match(/مميزات\s*:?\s*(.+)/)?.[1]?.trim() ?? null;
  const ppm = area && price ? Math.round(Number(price) / Number(area)).toLocaleString("en-US") : null;
  const out: Parsed = [];
  const add = (label: string, v: string | null, suffix = "") => v && out.push({ label, value: v + suffix });
  add("النوع", type);
  add("الموقع", loc);
  add("المساحة", area, " م²");
  add("السعر", price ? Number(price).toLocaleString("en-US") : null, ` ${currency}`);
  add("الغرف", rooms);
  add("الحمامات", baths);
  add("المقدم", down, "%");
  add("الأقساط", years, " سنوات");
  add("سعر المتر", ppm, ` ${currency}`);
  add("المميزات", features);
  return out;
}

export const SCENARIOS = {
  conservative: { label: "متحفظ", roi: 6.1, irr: 7.4, npv: 182000, flows: [38, 44, 49, 55, 60, 64, 70] },
  realistic: { label: "واقعي", roi: 8.6, irr: 10.2, npv: 341000, flows: [42, 51, 58, 66, 74, 82, 90] },
  optimistic: { label: "متفائل", roi: 11.3, irr: 13.8, npv: 528000, flows: [48, 59, 70, 80, 90, 100, 112] },
} as const;
export type ScenarioKey = keyof typeof SCENARIOS;

export const COMPARE = {
  conservative: [{ k: "العقار", v: 6.1 }, { k: "الذهب", v: 5.2 }, { k: "الودائع", v: 4.5 }, { k: "REITs", v: 5.6 }],
  realistic: [{ k: "العقار", v: 8.6 }, { k: "الذهب", v: 6.0 }, { k: "الودائع", v: 5.0 }, { k: "REITs", v: 6.8 }],
  optimistic: [{ k: "العقار", v: 11.3 }, { k: "الذهب", v: 7.5 }, { k: "الودائع", v: 5.4 }, { k: "REITs", v: 8.4 }],
};

export const AUDIENCE_MSG = {
  gulf: { label: "مستثمر خليجي", text: "فرصة استثمارية في شمال الرياض: شقة 185م² بعائد إيجاري تقديري 8.6% سنويًا. تقرير التحليل الكامل في الرابط 👇" },
  home: { label: "مشتري سكن", text: "بيتك القادم في حي النرجس: 3 غرف، مسبح، وموقف خاص. مقدم 20% والباقي أقساط مريحة على 5 سنوات." },
  investor: { label: "مستثمر", text: "سعر المتر أقل من متوسط الحي بنحو 7% (تقدير تحليلي). التدفق النقدي وسيناريوهات العائد في التقرير المرفق." },
} as const;

export const PIPELINE = ["Lead", "Contacted", "Negotiation", "Won"] as const;

export const TEMPLATES = [
  { id: "lux", name: "Executive Luxury", head: "bg-royal", accent: "bg-gold" },
  { id: "modern", name: "Modern Investment", head: "bg-navy-500", accent: "bg-positive" },
  { id: "brochure", name: "Marketing Brochure", head: "bg-gold", accent: "bg-navy-700" },
  { id: "land", name: "Land & Development", head: "bg-gold-700", accent: "bg-navy-500" },
  { id: "clean", name: "Clean Professional", head: "bg-mist", accent: "bg-navy-700" },
] as const;

// الأسعار غير محددة في المشروع بعد — قيم قابلة للتكوين.
export const PLANS = [
  { name: "Free", title: "مجاني", price: null as string | null, cta: "ابدأ مجانًا", features: ["Smart Paste لاستخراج البيانات", "تحليل مالي أساسي", "تقرير PDF بهوية عقاري AI"] },
  { name: "Professional", title: "المحترفين", price: null as string | null, cta: "اختر باقة المحترفين", features: ["كل مزايا المجاني", "5 أنماط تقارير وشعار مكتبك", "رابط مستثمر تفاعلي", "محتوى تسويقي بالذكاء الاصطناعي", "CRM ومسار الصفقات"] },
  { name: "Business", title: "الأعمال", price: null as string | null, cta: "تواصل معنا", features: ["كل مزايا المحترفين", "فريق متعدد المستخدمين", "لوحة تنفيذية للمحفظة", "دعم مخصص"] },
];
