import { useState } from "react";
import { Check, Plus } from "lucide-react";
import tower from "@/assets/hero-tower.jpg";
import { Reveal, SectionHead, CircuitLine, btn, Logo, DemoTag } from "./primitives";
import { PLANS } from "./mock-data";
import { cn } from "@/lib/utils";

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
