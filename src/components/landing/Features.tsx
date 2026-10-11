import { useState } from "react";
import { Loader2, Wand2, MapPin, School, Hospital, ShoppingBag, MessageCircle, Send, Phone } from "lucide-react";
import villa from "@/assets/villa.jpg";
import { Reveal, SectionHead, DemoTag, CircuitLine, CountUp, btn } from "./primitives";
import { SAMPLE_AD, parseAd, SCENARIOS, COMPARE, AUDIENCE_MSG, PIPELINE, type ScenarioKey, type Parsed } from "./mock-data";
import { cn } from "@/lib/utils";

/* 5.3 Smart Paste */
export function SmartPaste() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<Parsed>(parseAd(SAMPLE_AD));
  const [loading, setLoading] = useState(false);
  const [tried, setTried] = useState(false);
  const run = () => {
    setLoading(true);
    setTried(true);
    setTimeout(() => { setResult(parseAd(text)); setLoading(false); }, 700);
  };
  return (
    <section id="features" className="scroll-mt-20 bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal><SectionHead eyebrow="Smart Paste AI" title={<>الصق الإعلان كما هو. <span className="text-gold">نرتّب الباقي.</span></>} desc="إعلانات واتساب والمجموعات مكتوبة بأي شكل. عقاري AI يستخرج منها الحقول التي يحتاجها التحليل في ثوانٍ." /></Reveal>

        <Reveal className="mt-14 grid items-center gap-6 lg:grid-cols-[1fr_auto_1.1fr]">
          {/* chat bubble */}
          <div className="rounded-3xl bg-ivory p-6 shadow-soft ring-1 ring-line">
            <div className="mb-4 flex items-center gap-3 border-b border-line pb-4">
              <div className="grid size-10 place-items-center rounded-full bg-positive/15 text-positive-text"><MessageCircle className="size-5" /></div>
              <div><p className="font-semibold text-navy-900">مجموعة عقارات شمال الرياض</p><p className="text-xs text-text-2">رسالة واردة</p></div>
            </div>
            <div className="whitespace-pre-line rounded-2xl rounded-tr-sm bg-surface p-4 text-[15px] leading-loose text-navy-900 shadow-soft">
              {tried && text ? text : SAMPLE_AD}
            </div>
          </div>

          <div className="hidden w-28 lg:block"><CircuitLine className="h-12 w-full" d="M0 25 H250 L300 5 H450 L500 25 H710" nodes={[250, 710]} /></div>

          {/* structured card */}
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-deep">
            <div className="mb-5 flex items-center justify-between">
              <p className="text-lg font-bold text-navy-900">بيانات منظمة</p>
              <DemoTag>محاكاة توضيحية</DemoTag>
            </div>
            {loading ? (
              <div className="flex h-56 items-center justify-center gap-2 text-text-2"><Loader2 className="size-5 animate-spin" /> جارٍ الاستخراج…</div>
            ) : result.length === 0 ? (
              <div className="flex h-56 flex-col items-center justify-center text-center text-text-2">
                <p className="font-semibold text-navy-900">لم نجد بيانات واضحة</p>
                <p className="mt-1 text-sm">جرّب نصًا يحتوي على المساحة أو السعر أو عدد الغرف.</p>
              </div>
            ) : (
              <dl className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {result.map((f, i) => (
                  <div key={f.label} className={cn("animate-in fade-in slide-in-from-bottom-2 rounded-xl border border-line bg-mist/60 p-3 fill-mode-both", f.label === "المميزات" && "col-span-2 sm:col-span-3")} style={{ animationDelay: `${i * 70}ms` }}>
                    <dt className="text-xs text-text-2">{f.label}</dt>
                    <dd className={cn("mt-1 font-bold text-navy-900", f.label === "سعر المتر" && "text-gold-700")} dir={/^[\d,.\s%A-Z²م]+$/.test(f.value) ? "ltr" : undefined}>{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </Reveal>

        <Reveal className="mt-10 rounded-3xl border border-dashed border-gold-500/60 bg-ivory p-6">
          <label htmlFor="try" className="mb-3 flex items-center justify-between font-bold text-navy-900">
            جرّب بنفسك <DemoTag>يعمل محليًا في متصفحك</DemoTag>
          </label>
          <div className="flex flex-col gap-3 md:flex-row">
            <textarea id="try" value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="الصق نص إعلان عقاري هنا…" className="flex-1 resize-none rounded-xl border border-line bg-surface p-4 text-[15px] focus:border-gold-500 focus:outline-none" />
            <button onClick={run} disabled={!text.trim() || loading} className={cn(btn.primary, "disabled:cursor-not-allowed disabled:opacity-50 md:self-end")}>
              {loading ? <Loader2 className="size-5 animate-spin" /> : <Wand2 className="size-5" />} استخراج
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 5.4 Financial engine */
export function Financial() {
  const [sc, setSc] = useState<ScenarioKey>("realistic");
  const d = SCENARIOS[sc];
  const max = 112;
  return (
    <section id="overview" className="scroll-mt-20 bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal><SectionHead eyebrow="Financial Engine" title={<>أرقام تفهمها <span className="gold-underline">قبل</span> أن تعرض الصفقة</>} /></Reveal>
          <div className="flex rounded-2xl border border-line bg-surface p-1.5 shadow-soft" role="radiogroup" aria-label="السيناريو">
            {(Object.keys(SCENARIOS) as ScenarioKey[]).map((k) => (
              <button key={k} role="radio" aria-checked={sc === k} onClick={() => setSc(k)} className={cn("rounded-xl px-5 py-2.5 text-sm font-semibold transition", sc === k ? "bg-primary text-primary-foreground shadow-soft" : "text-text-2 hover:text-navy-900")}>
                {SCENARIOS[k].label}
              </button>
            ))}
          </div>
        </div>

        <Reveal className="mt-12 overflow-hidden rounded-[2rem] border border-line bg-surface shadow-deep">
          <div className="grid lg:grid-cols-[1.4fr_1fr]">
            <div className="border-line p-7 lg:border-e lg:p-10">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-bold text-navy-900">التدفق النقدي التراكمي (ألف ريال)</h3>
                <DemoTag />
              </div>
              <div className="flex h-64 items-end gap-3 border-b border-line pb-1">
                {d.flows.map((f, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <span dir="ltr" className="tabular text-xs font-semibold text-gold-700">{f}</span>
                    <div className="w-full rounded-t-lg bg-gold shadow-soft transition-all duration-500" style={{ height: `${(f / max) * 210}px` }} />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex gap-3 text-center text-xs text-text-2">{d.flows.map((_, i) => <span key={i} className="flex-1">س{i + 1}</span>)}</div>

              <div className="mt-10">
                <div className="mb-2 flex justify-between text-sm"><span className="font-bold text-navy-900">مؤشر تقييم السعر</span><span className="text-text-2">سعر المتر مقابل مرجع الحي</span></div>
                <div className="relative h-3 rounded-full" style={{ background: "linear-gradient(to left, var(--warning), var(--gold-300), var(--positive))" }}>
                  <div className="absolute -top-1.5 size-6 rounded-full border-4 border-surface bg-primary shadow-deep transition-all" style={{ insetInlineStart: sc === "conservative" ? "48%" : sc === "realistic" ? "34%" : "22%" }} />
                </div>
                <div className="mt-2 flex justify-between text-xs text-text-2"><span>أقل من المرجع</span><span>ضمن المرجع</span><span>أعلى من المرجع</span></div>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="grid grid-cols-3 border-b border-line">
                {([["ROI", d.roi, "%"], ["IRR", d.irr, "%"]] as const).map(([k, v, s]) => (
                  <div key={k} className="border-e border-line p-6">
                    <p dir="ltr" className="text-end text-xs font-bold text-text-2">{k}</p>
                    <p className="mt-2 text-3xl font-bold text-navy-900"><CountUp value={v} decimals={1} suffix={s} /></p>
                  </div>
                ))}
                <div className="p-6">
                  <p dir="ltr" className="text-end text-xs font-bold text-text-2">NPV</p>
                  <p className="mt-2 text-xl font-bold text-gold-700"><CountUp value={d.npv / 1000} suffix="K" /></p>
                </div>
              </div>
              <div className="flex-1 p-7">
                <h3 className="mb-5 font-bold text-navy-900">العائد السنوي المتوقع مقارنةً بالبدائل</h3>
                <div className="space-y-4">
                  {COMPARE[sc].map((c, i) => (
                    <div key={c.k}>
                      <div className="mb-1 flex justify-between text-sm"><span className={cn(i === 0 ? "font-bold text-navy-900" : "text-text-2")}>{c.k}</span><span dir="ltr" className="tabular font-semibold">{c.v}%</span></div>
                      <div className="h-2.5 rounded-full bg-mist"><div className={cn("h-full rounded-full transition-all duration-500", i === 0 ? "bg-gold" : "bg-navy-500/40")} style={{ width: `${(c.v / 12) * 100}%` }} /></div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs leading-relaxed text-text-2">التقييم مؤشر تحليلي وليس ضمانًا للسعر السوقي.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 5.5 Asset data */
export function AssetData() {
  return (
    <section className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <SectionHead eyebrow="Asset Data" title={<>كل تفاصيل القطعة <span className="text-gold">في مكان واحد</span></>} desc="الأطوال والاتجاهات وعرض الشوارع، واشتراطات البناء، والمرافق القريبة. جاهزة للتقرير دون نسخ ولصق." />
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {[["رقم القطعة", "1482"], ["المخطط", "3051/أ"], ["نسبة البناء", "60%"], ["الارتدادات", "2م / 3م"], ["الاستخدام", "سكني"], ["المساحة", "625 م²"]].map(([k, v]) => (
              <div key={k} className="bg-surface p-4"><dt className="text-xs text-text-2">{k}</dt><dd className="mt-1 font-bold text-navy-900">{v}</dd></div>
            ))}
          </dl>
          <div className="mt-3"><DemoTag /></div>
        </Reveal>
        <Reveal className="relative">
          <div className="rounded-[2rem] border border-line bg-surface p-6 shadow-deep">
            <svg viewBox="0 0 400 320" className="w-full" role="img" aria-label="مخطط قطعة أرض">
              <defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="var(--line)" strokeWidth="1" /></pattern></defs>
              <rect width="400" height="320" fill="url(#grid)" />
              <rect x="0" y="260" width="400" height="40" fill="var(--mist)" />
              <text x="200" y="285" textAnchor="middle" fontSize="12" fill="var(--text-2)">شارع 20م</text>
              <rect x="350" y="0" width="30" height="260" fill="var(--mist)" />
              <text x="365" y="130" textAnchor="middle" fontSize="11" fill="var(--text-2)" transform="rotate(90 365 130)">شارع 15م</text>
              <polygon points="90,60 330,60 330,240 90,240" fill="var(--ivory)" stroke="var(--navy-700)" strokeWidth="2.5" />
              <polygon points="110,80 310,80 310,215 110,215" fill="none" stroke="var(--gold-500)" strokeWidth="1.5" strokeDasharray="6 4" />
              <text x="210" y="52" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--navy-900)">25 م</text>
              <text x="78" y="155" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--navy-900)" transform="rotate(-90 78 155)">25 م</text>
              <text x="210" y="155" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--gold-700)">قطعة 1482</text>
              <g transform="translate(40 40)"><circle r="16" fill="var(--surface)" stroke="var(--line)" /><path d="M0 -10 L5 4 L0 1 L-5 4Z" fill="var(--navy-700)" /><text y="-20" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--navy-900)">ش</text></g>
            </svg>
          </div>
          <div className="absolute -bottom-10 -start-4 w-64 overflow-hidden rounded-2xl border border-line bg-surface shadow-deep sm:-start-10">
            <img src={villa} alt="فلل سكنية حديثة" loading="lazy" width={1280} height={960} className="h-24 w-full object-cover" />
            <ul className="space-y-2 p-4 text-sm">
              {[[School, "مدرسة", "650م"], [Hospital, "مستشفى", "2.1كم"], [ShoppingBag, "مركز تسوق", "1.4كم"], [MapPin, "طريق رئيسي", "400م"]].map(([I, n, dist]) => {
                const Icon = I as typeof School;
                return <li key={n as string} className="flex items-center justify-between"><span className="flex items-center gap-2 text-navy-900"><Icon className="size-4 text-gold-700" />{n as string}</span><span dir="ltr" className="tabular text-text-2">{dist as string}</span></li>;
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 5.6 AI marketing */
export function Marketing() {
  const [aud, setAud] = useState<keyof typeof AUDIENCE_MSG>("gulf");
  const [q, setQ] = useState(0);
  const QA = [
    ["ما أفضل وقت لنشر الإعلان؟", "عادةً بعد صلاة العشاء ونهاية الأسبوع يكون تفاعل مجموعات العقار أعلى. جرّب الوقتين وقارن."],
    ["كيف أبرّر السعر للمشتري؟", "اعرض سعر المتر مقابل مرجع الحي، والمرافق القريبة، وسيناريو العائد الواقعي من التقرير."],
  ];
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal><SectionHead center eyebrow="AI Marketing" title={<>رسالة مختلفة <span className="text-gold">لكل جمهور</span></>} desc="من نفس بيانات العقار: نص واتساب، وتصاميم ستوري وبوست، ومستشار يجيب عن أسئلتك التسويقية." /></Reveal>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {(Object.keys(AUDIENCE_MSG) as (keyof typeof AUDIENCE_MSG)[]).map((k) => (
            <button key={k} onClick={() => setAud(k)} aria-pressed={aud === k} className={cn("rounded-full border px-5 py-2.5 text-sm font-semibold transition", aud === k ? "border-navy-700 bg-primary text-primary-foreground" : "border-line text-text-2 hover:border-gold-500")}>{AUDIENCE_MSG[k].label}</button>
          ))}
        </div>
        <Reveal className="mt-12 grid items-end gap-8 lg:grid-cols-[auto_1fr_1fr]">
          {/* phone */}
          <div className="mx-auto w-64 rounded-[2.5rem] border-8 border-navy-900 bg-mist p-3 shadow-deep">
            <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-navy-900/30" />
            <div className="min-h-80 space-y-3">
              <div className="overflow-hidden rounded-xl bg-surface shadow-soft">
                <img src={villa} alt="" loading="lazy" width={1280} height={960} className="h-28 w-full object-cover" />
                <p key={aud} className="animate-in fade-in p-3 text-[13px] leading-relaxed text-navy-900">{AUDIENCE_MSG[aud].text}</p>
              </div>
              <p className="text-center text-[11px] text-text-2">معاينة توضيحية</p>
            </div>
          </div>
          {/* story + post */}
          <div className="flex items-end justify-center gap-4">
            <div className="relative aspect-[9/16] w-36 overflow-hidden rounded-2xl shadow-deep">
              <img src={villa} alt="" loading="lazy" width={1280} height={960} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/85 to-transparent" />
              <div className="absolute inset-x-3 bottom-3 text-primary-foreground"><p className="text-[10px] text-gold-300">ستوري 9:16</p><p className="text-sm font-bold leading-snug">فيلا بمسبح خاص</p><div className="mt-2 rounded-md bg-gold py-1 text-center text-[11px] font-bold text-navy-900">اطلب المعاينة</div></div>
            </div>
            <div className="w-48 overflow-hidden rounded-2xl border border-line bg-surface shadow-deep">
              <div className="relative aspect-square"><img src={villa} alt="" loading="lazy" width={1280} height={960} className="h-full w-full object-cover" /><span className="absolute end-2 top-2 rounded-full bg-surface px-2 py-0.5 text-[10px] font-bold text-gold-700">بوست 1:1</span></div>
              <div className="p-3"><p className="text-sm font-bold text-navy-900">فيلا — حي الملقا</p><p dir="ltr" className="tabular text-end text-sm font-bold text-gold-700">3,400,000 SAR</p></div>
            </div>
          </div>
          {/* advisor */}
          <div className="rounded-3xl border border-line bg-ivory p-5 shadow-soft">
            <div className="mb-4 flex items-center justify-between"><p className="font-bold text-navy-900">المستشار الذكي</p><DemoTag>معاينة توضيحية</DemoTag></div>
            <div className="space-y-3 text-sm">
              <p className="ms-auto w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-primary px-4 py-2.5 text-primary-foreground">{QA[q]?.[0]}</p>
              <p key={q} className="animate-in fade-in max-w-[90%] rounded-2xl rounded-tr-sm bg-surface px-4 py-2.5 leading-relaxed text-navy-900 shadow-soft">{QA[q]?.[1]}</p>
            </div>
            <div className="mt-4 flex gap-2">
              {QA.map((x, i) => <button key={i} onClick={() => setQ(i)} className={cn("flex-1 rounded-lg border px-2 py-2 text-xs transition", q === i ? "border-gold-500 bg-surface font-semibold" : "border-line text-text-2")}>{x[0]}</button>)}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 5.7 CRM */
export function CRM() {
  const [stage, setStage] = useState(2);
  return (
    <section className="bg-mist py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.3fr] lg:px-8">
        <Reveal>
          <SectionHead eyebrow="CRM & Pipeline" title={<>اعرف أين تقف <span className="text-gold">كل صفقة</span></>} desc="اربط كل عقار باهتمامات العميل، وتابع المحادثة من أول تواصل حتى الإغلاق." />
        </Reveal>
        <Reveal className="space-y-6">
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-deep">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="grid size-14 place-items-center rounded-2xl bg-royal text-xl font-bold text-gold-300">ف</div>
                <div><p className="text-lg font-bold text-navy-900">فهد — مستثمر</p><p className="text-sm text-text-2">يهتم بشقق شمال الرياض · عائد فوق 8%</p></div>
              </div>
              <div className="text-end"><p className="text-xs text-text-2">قيمة الصفقة</p><p dir="ltr" className="tabular text-2xl font-bold text-gold-700">1,250,000 SAR</p></div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-5 text-sm">
              <span className="rounded-full bg-ivory px-3 py-1 text-navy-900">مرتبط بـ: شقة النرجس</span>
              <span className="text-text-2">آخر نشاط: فتح التقرير منذ ساعتين</span>
              <button className="ms-auto flex items-center gap-1.5 rounded-lg bg-positive/15 px-3 py-1.5 font-semibold text-positive-text"><MessageCircle className="size-4" />واتساب</button>
            </div>
            <div className="mt-2"><DemoTag /></div>
          </div>
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-soft" dir="ltr">
            <ol className="flex items-center">
              {PIPELINE.map((p, i) => (
                <li key={p} className="flex flex-1 items-center last:flex-none">
                  <button onClick={() => setStage(i)} aria-current={i === stage ? "step" : undefined} className="flex flex-col items-center gap-2">
                    <span className={cn("grid size-11 place-items-center rounded-full border-2 text-sm font-bold transition", i < stage ? "border-gold-500 bg-gold text-navy-900" : i === stage ? "border-navy-700 bg-primary text-primary-foreground shadow-deep" : "border-line bg-surface text-text-2")}>{i + 1}</span>
                    <span className={cn("text-xs font-semibold", i === stage ? "text-navy-900" : "text-text-2")}>{p}</span>
                  </button>
                  {i < PIPELINE.length - 1 && <span className={cn("mx-2 mb-6 h-0.5 flex-1", i < stage ? "bg-gold" : "bg-line")} />}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 5.9 Investor experience */
export function InvestorExperience() {
  const [ans, setAns] = useState(false);
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <Reveal>
          <SectionHead eyebrow="Investor Link" title={<>رابط تفاعلي، <span className="text-gold">لا يحتاج حسابًا</span></>} desc="المستثمر يفتح الرابط من جواله، يرى المؤشرات، ويسأل ويطلب المعاينة مباشرة." />
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-line bg-mist p-5">
              <p className="font-bold text-text-2">PDF ثابت</p>
              <ul className="mt-3 space-y-2 text-sm text-text-2"><li>— قراءة فقط</li><li>— لا أسئلة</li><li>— لا تعرف إن فُتح</li></ul>
            </div>
            <div className="rounded-2xl border-2 border-gold-500 bg-surface p-5 shadow-deep">
              <p className="font-bold text-navy-900">رابط تفاعلي</p>
              <ul className="mt-3 space-y-2 text-sm text-navy-900"><li>✓ مساعد يجيب</li><li>✓ اتصال وواتساب</li><li>✓ طلب معاينة</li></ul>
            </div>
          </div>
        </Reveal>
        <Reveal className="mx-auto">
          <div className="w-72 rounded-[2.75rem] border-[10px] border-navy-900 bg-surface shadow-deep">
            <div className="rounded-t-[2rem] bg-royal px-5 pb-6 pt-8 text-primary-foreground">
              <p className="text-xs text-gold-300">مكتب الأفق العقاري</p>
              <p className="mt-1 font-bold">شقة النرجس — 185م²</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[["ROI", "8.6%"], ["IRR", "10.2%"], ["المتر", "6,757"]].map(([k, v]) => <div key={k} className="rounded-lg bg-primary-foreground/10 py-2"><p className="text-[10px] text-primary-foreground/70">{k}</p><p dir="ltr" className="tabular text-sm font-bold">{v}</p></div>)}
              </div>
            </div>
            <div className="space-y-3 p-4 text-[13px]">
              <button onClick={() => setAns(true)} className="w-full rounded-2xl bg-mist px-3 py-2.5 text-start text-navy-900 transition hover:bg-ivory">لو دفعت 20% مقدم، كم ستكون الأقساط؟</button>
              {ans ? (
                <p className="animate-in fade-in rounded-2xl bg-ivory px-3 py-2.5 leading-relaxed text-navy-900">المقدم <b dir="ltr">250,000</b> ريال، والقسط الشهري التقريبي <b dir="ltr">16,667</b> ريال على 5 سنوات بدون فوائد. <span className="text-gold-700">(إجابة توضيحية)</span></p>
              ) : (
                <p className="px-1 text-xs text-text-2">اضغط على السؤال لرؤية الإجابة</p>
              )}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <span className="flex flex-col items-center gap-1 rounded-xl border border-line py-2 text-[11px]"><Phone className="size-4 text-navy-700" />اتصال</span>
                <span className="flex flex-col items-center gap-1 rounded-xl border border-line py-2 text-[11px]"><MessageCircle className="size-4 text-positive-text" />واتساب</span>
                <span className="flex flex-col items-center gap-1 rounded-xl bg-gold py-2 text-[11px] font-bold text-navy-900"><Send className="size-4" />معاينة</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 5.10 Enterprise */
export function Enterprise() {
  return (
    <section className="bg-ivory py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="grid items-center gap-10 rounded-[2rem] border border-line bg-surface p-8 shadow-soft lg:grid-cols-[1fr_2fr] lg:p-10">
          <div>
            <h2 className="text-2xl font-bold text-navy-900">لوحة تنفيذية للمكتب</h2>
            <p className="mt-3 text-text-2">محفظتك وتقاريرك بنظرة واحدة، بالريال أو الجنيه، وبشعار مكتبك.</p>
            <div className="mt-4"><DemoTag /></div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[["عقارات", 48], ["تقارير", 126]].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-mist p-5"><p className="text-sm text-text-2">{k}</p><p className="mt-1 text-4xl font-bold text-navy-900"><CountUp value={v as number} /></p></div>
            ))}
            <div className="rounded-2xl bg-mist p-5">
              <p className="text-sm text-text-2">توزيع المحفظة</p>
              <div className="mt-3 flex h-3 overflow-hidden rounded-full"><div className="w-1/2 bg-navy-700" /><div className="w-1/3 bg-gold-500" /><div className="flex-1 bg-navy-500/40" /></div>
              <p className="mt-2 text-xs text-text-2">سكني · تجاري · أراضٍ</p>
            </div>
            <div className="rounded-2xl bg-mist p-5"><p className="text-sm text-text-2">العملات</p><p dir="ltr" className="mt-1 text-end text-2xl font-bold text-gold-700">SAR · EGP</p></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
