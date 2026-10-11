import { useState } from "react";
import { ChevronRight, ChevronLeft, Download, Check, Plus, Wand2 } from "lucide-react";
import tower from "@/assets/hero-tower.jpg";
import { Reveal, SectionHead, CircuitLine, btn, Logo, DemoTag } from "./primitives";
import { TEMPLATES, PLANS } from "./mock-data";
import { cn } from "@/lib/utils";

const SECTIONS = ["الملخص", "التحليل المالي", "الموقع", "الصور"] as const;

/* 5.8 Report studio (royal section #2) */
export function ReportStudio() {
  const [tpl, setTpl] = useState(0);
  const [page, setPage] = useState(0);
  const [on, setOn] = useState<Record<string, boolean>>({ الملخص: true, "التحليل المالي": true, الموقع: true, الصور: true });
  const [exporting, setExporting] = useState(false);
  const [cmd, setCmd] = useState("");
  const [cmdDone, setCmdDone] = useState(false);
  const t = TEMPLATES[tpl] ?? TEMPLATES[0];
  const pages = SECTIONS.filter((s) => on[s]);
  const cur = pages[Math.min(page, pages.length - 1)];
  return (
    <section id="reports" className="relative scroll-mt-20 overflow-hidden bg-royal py-24 lg:py-32">
      <div className="pointer-events-none absolute -top-40 start-1/2 size-[900px] -translate-x-1/2 rounded-full border border-gold-300/15" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal><SectionHead dark eyebrow="Report Studio" title={<>تقرير يليق <span className="text-gold">بقرار الاستثمار</span></>} desc="خمسة أنماط جاهزة، أقسام تظهرها أو تخفيها، وأمر عربي بسيط لتعديل التقرير. ثم صدّره PDF أو شاركه كرابط." /></Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[320px_1fr]">
          <Reveal className="space-y-6 text-primary-foreground">
            <div>
              <p className="mb-3 text-sm font-semibold text-gold-300">النمط</p>
              <div className="space-y-2">
                {TEMPLATES.map((x, i) => (
                  <button key={x.id} onClick={() => setTpl(i)} aria-pressed={tpl === i} dir="ltr" className={cn("flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition", tpl === i ? "border-gold-300 bg-primary-foreground/10" : "border-primary-foreground/15 hover:border-gold-300/50")}>
                    {x.name}<span className={cn("size-4 rounded-full ring-1 ring-primary-foreground/30", x.head)} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-gold-300">الأقسام</p>
              <div className="flex flex-wrap gap-2">
                {SECTIONS.map((s) => (
                  <button key={s} onClick={() => { setOn({ ...on, [s]: !on[s] }); setPage(0); }} aria-pressed={on[s]} className={cn("flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition", on[s] ? "border-gold-300 bg-gold-300/15 text-primary-foreground" : "border-primary-foreground/20 text-primary-foreground/60")}>
                    {on[s] ? <Check className="size-3.5" /> : <Plus className="size-3.5" />}{s}
                  </button>
                ))}
              </div>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); if (cmd.trim()) setCmdDone(true); }}>
              <label htmlFor="cmd" className="mb-3 block text-sm font-semibold text-gold-300">أمر عربي</label>
              <div className="flex gap-2">
                <input id="cmd" value={cmd} onChange={(e) => { setCmd(e.target.value); setCmdDone(false); }} placeholder="اجعل الملخص أقصر وأبرز العائد" className="min-w-0 flex-1 rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:border-gold-300 focus:outline-none" />
                <button className="rounded-xl bg-gold px-3 text-navy-900" aria-label="تطبيق"><Wand2 className="size-4" /></button>
              </div>
              {cmdDone && <p className="mt-2 text-xs text-gold-300">تم تطبيق الأمر على المعاينة (محاكاة توضيحية)</p>}
            </form>
            <button onClick={() => { setExporting(true); setTimeout(() => setExporting(false), 1400); }} className={cn(btn.gold, "w-full")}>
              <Download className="size-5" />{exporting ? "جارٍ تجهيز PDF…" : "معاينة تصدير PDF"}
            </button>
          </Reveal>

          <Reveal className="relative">
            <div className="absolute inset-x-10 top-6 h-full rotate-2 rounded-lg bg-primary-foreground/10" aria-hidden />
            <article className="relative mx-auto aspect-[1/1.414] max-w-xl overflow-hidden rounded-lg bg-surface shadow-deep">
              <header className={cn("relative h-[24%] p-7", t.head)}>
                <p dir="ltr" className={cn("text-end text-[11px] font-semibold tracking-[0.25em]", t.id === "clean" || t.id === "brochure" ? "text-navy-700" : "text-gold-300")}>{t.name.toUpperCase()}</p>
                <h3 className={cn("mt-2 text-2xl font-bold", t.id === "clean" || t.id === "brochure" ? "text-navy-900" : "text-primary-foreground")}>تقرير استثماري — شقة النرجس</h3>
                <p className={cn("mt-1 text-sm", t.id === "clean" || t.id === "brochure" ? "text-text-2" : "text-primary-foreground/70")}>{cmdDone ? "ملخص مختصر · العائد الواقعي 8.6%" : "مكتب الأفق العقاري · الرياض"}</p>
              </header>
              <div className="h-[76%] p-7">
                {!cur ? (
                  <div className="grid h-full place-items-center text-center text-text-2">فعّل قسمًا واحدًا على الأقل لعرض المعاينة</div>
                ) : (
                  <div key={cur + tpl} className="animate-in fade-in h-full">
                    <div className="mb-4 flex items-center gap-3"><span className={cn("h-6 w-1.5 rounded", t.accent)} /><h4 className="text-lg font-bold text-navy-900">{cur}</h4></div>
                    {cur === "الصور" ? (
                      <img src={tower} alt="" loading="lazy" width={896} height={1152} className="h-3/4 w-full rounded-md object-cover object-top" />
                    ) : cur === "التحليل المالي" ? (
                      <div className="flex h-1/2 items-end gap-2">{[40, 52, 60, 70, 78, 88, 100].map((h, i) => <div key={i} className={cn("flex-1 rounded-t", t.accent)} style={{ height: `${h}%` }} />)}</div>
                    ) : (
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-3">{[["ROI", "8.6%"], ["IRR", "10.2%"], ["المتر", "6,757"]].map(([k, v]) => <div key={k} className="rounded-md border border-line p-3"><p className="text-xs text-text-2">{k}</p><p dir="ltr" className="tabular text-end text-lg font-bold text-navy-900">{v}</p></div>)}</div>
                        {[95, 88, 92, 70, 84, 60].map((w, i) => <div key={i} className="h-2 rounded bg-mist" style={{ width: `${w}%` }} />)}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {exporting && <div className="absolute inset-0 grid place-items-center bg-surface/80 text-sm font-semibold text-navy-900">جارٍ تجهيز ملف PDF…</div>}
            </article>
            <div className="mt-6 flex items-center justify-center gap-4 text-primary-foreground">
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="rounded-full border border-primary-foreground/25 p-2 disabled:opacity-40" aria-label="الصفحة السابقة"><ChevronRight className="size-5" /></button>
              <span dir="ltr" className="tabular text-sm">{pages.length ? Math.min(page, pages.length - 1) + 1 : 0} / {pages.length}</span>
              <button onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))} disabled={page >= pages.length - 1} className="rounded-full border border-primary-foreground/25 p-2 disabled:opacity-40" aria-label="الصفحة التالية"><ChevronLeft className="size-5" /></button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* 5.11 Pricing */
export function Pricing() {
  const [tab, setTab] = useState(1);
  return (
    <section id="pricing" className="scroll-mt-20 bg-mist py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal><SectionHead center eyebrow="Pricing" title={<>ابدأ مجانًا، <span className="text-gold">وتوسّع حين تحتاج</span></>} desc="جرّب المنصة قبل أي دفع. الأسعار النهائية تُعلن قريبًا." /></Reveal>
        <div className="mt-10 flex justify-center md:hidden" role="tablist">
          {PLANS.map((p, i) => <button key={p.name} role="tab" aria-selected={tab === i} onClick={() => setTab(i)} className={cn("px-4 py-2 text-sm font-semibold", tab === i ? "border-b-2 border-gold-500 text-navy-900" : "text-text-2")}>{p.title}</button>)}
        </div>
        <div className="mt-8 grid items-center gap-6 md:mt-14 md:grid-cols-3">
          {PLANS.map((p, i) => (
            <div key={p.name} className={cn("rounded-3xl border bg-surface p-8 transition", i === 1 ? "border-gold-500 shadow-deep md:py-11" : "border-line shadow-soft", tab === i ? "block" : "hidden md:block")}>
              <p dir="ltr" className="text-end text-sm font-semibold tracking-widest text-gold-700">{p.name.toUpperCase()}</p>
              <h3 className="mt-2 text-2xl font-bold text-navy-900">{p.title}</h3>
              <p className="mt-5 text-3xl font-bold text-navy-900">{i === 0 ? "مجانًا" : p.price ?? <span className="text-xl text-text-2">السعر يُعلن قريبًا</span>}</p>
              <ul className="mt-7 space-y-3">
                {p.features.map((f) => <li key={f} className="flex gap-3 text-[15px] text-navy-900"><Check className="mt-0.5 size-5 shrink-0 text-gold-700" />{f}</li>)}
              </ul>
              <a href="#top" className={cn(i === 1 ? btn.primary : btn.outline, "mt-8 w-full")}>{p.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 5.12 FAQ */
const FAQ = [
  ["هل يمكنني التجربة قبل الدفع؟", "نعم، الباقة المجانية تتيح لك استخراج البيانات والتحليل الأساسي وإنشاء تقرير PDF دون بطاقة دفع."],
  ["هل يحتاج المستثمر حسابًا لفتح التقرير؟", "لا. الرابط التفاعلي يُفتح مباشرة من أي جوال أو متصفح دون تسجيل."],
  ["هل أستطيع وضع شعار مكتبي في التقارير؟", "نعم، في باقة المحترفين وما فوق تظهر هوية مكتبك وشعارك على التقرير والرابط العام."],
  ["هل التحليل يسبق التسويق؟", "نعم. تبدأ ببيانات العقار وتحليله المالي، ثم تُبنى رسائل التسويق والتصاميم من نفس البيانات."],
  ["هل تدعمون الريال السعودي والجنيه المصري؟", "نعم، كل الحسابات والتقارير تدعم SAR وEGP."],
  ["هل يمكن تصدير التقرير PDF؟", "نعم، يمكنك تصدير أي تقرير بصيغة PDF بالنمط الذي تختاره."],
];
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-20 bg-surface py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1.5fr] lg:px-8">
        <Reveal>
          <SectionHead eyebrow="FAQ" title="أسئلة شائعة" />
          <ul className="mt-8 space-y-3 text-[15px] text-navy-900">
            {["يستخرج بيانات العقار من نص الإعلان", "يحسب ROI وIRR وNPV بثلاثة سيناريوهات", "يصدر تقريرًا PDF وروابط تفاعلية"].map((x) => <li key={x} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rotate-45 bg-gold" />{x}</li>)}
          </ul>
        </Reveal>
        <div className="divide-y divide-line border-y border-line">
          {FAQ.map(([q, a], i) => (
            <div key={q}>
              <h3>
                <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} aria-controls={`faq-${i}`} className="flex w-full items-center justify-between gap-4 py-5 text-start text-lg font-semibold text-navy-900 hover:text-gold-700">
                  {q}<Plus className={cn("size-5 shrink-0 text-gold-700 transition", open === i && "rotate-45")} />
                </button>
              </h3>
              <div id={`faq-${i}`} hidden={open !== i} className="pb-5 leading-relaxed text-text-2">{a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 5.13 Final CTA */
export function FinalCta() {
  return (
    <section className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="relative grid items-center gap-10 overflow-hidden rounded-[2.5rem] border border-gold-500/40 bg-surface p-8 shadow-deep lg:grid-cols-[1.3fr_1fr] lg:p-14">
          <div>
            <h2 className="display-lg text-navy-900">حلّل الصفقة. افهم العائد.<br /><span className="text-gold">قدّم تقريرًا يليق بقرار الاستثمار.</span></h2>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#pricing" className={btn.primary}>ابدأ تجربتك المجانية</a>
              <a href="#reports" className={btn.outline}>شاهد استوديو التقارير</a>
            </div>
            <CircuitLine className="mt-10 h-10 w-full max-w-md" />
          </div>
          <div className="relative mx-auto w-full max-w-xs">
            <div className="arch aspect-[4/5] overflow-hidden ring-8 ring-ivory"><img src={tower} alt="" loading="lazy" width={896} height={1152} className="h-[112%] w-full object-cover object-top" /></div>
            <div className="absolute -bottom-6 -start-8 w-40 rotate-[-3deg] rounded-md bg-surface p-3 shadow-deep">
              <div className="h-8 rounded-sm bg-royal" /><div className="mt-2 flex h-8 items-end gap-1">{[40, 55, 65, 80, 100].map((h) => <div key={h} className="flex-1 rounded-t-sm bg-gold" style={{ height: `${h}%` }} />)}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-mist">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between lg:px-8">
        <div className="max-w-sm">
          <Logo className="h-12" />
          <p className="mt-4 text-sm leading-relaxed text-text-2">منصة لتحليل الصفقات العقارية وإنشاء تقارير استثمارية احترافية للمسوقين والمكاتب.</p>
        </div>
        <nav aria-label="روابط التذييل" className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-navy-900">
          <a href="#overview">نظرة عامة</a><a href="#features">المميزات</a><a href="#reports">التقارير</a><a href="#pricing">الأسعار</a><a href="#faq">الأسئلة الشائعة</a>
        </nav>
      </div>
      <div className="border-t border-line py-5 text-center text-xs text-text-2">© {new Date().getFullYear()} عقاري AI · <DemoTag>كل الأرقام في هذه الصفحة توضيحية</DemoTag></div>
    </footer>
  );
}
