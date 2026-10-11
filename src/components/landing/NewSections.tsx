import { useState } from "react";
import { Check, Brain, Wrench, MessageSquareText, UserPlus, ClipboardPaste, Share2, ArrowLeft } from "lucide-react";
import { Reveal, SectionHead, DemoTag, CircuitLine, btn } from "./primitives";
import { ReportPage } from "./Report";
import { TEMPLATES } from "./mock-data";
import { simpleCalc } from "@/lib/calc";
import { cn } from "@/lib/utils";

const fmt = (n: number) => n.toLocaleString("en-US");

/* 2.2 محرر التقارير بالأوامر العربية */
const THOUGHTS = ["استخراج السعر: 8.5M ر.س", "حساب المقدم 15% = 1.275M", "اختيار القالب الفاخر", "توليد جدول 72 قسطًا"];
const TOOLS = ["تغيير القالب", "تحديث الألوان", "جدول السداد", "تحليل نقاط القوة", "إخفاء الأقسام غير الضرورية"];

export function AIEditor() {
  const [step, setStep] = useState(0);
  const tpl = step >= 2 ? TEMPLATES[0] : TEMPLATES[4];
  return (
    <section className="bg-ivory py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SectionHead eyebrow="Arabic Command Editor" title={<>عدّل التقرير <span className="text-gold">بجملة عربية</span></>} desc="المحرر يفهم سياق العقار، يعرض خطوات تفكيره قبل التنفيذ، ثم ينفذ أدوات محددة على التقرير." />
          <ul className="grid gap-2 text-[15px] text-navy-900 sm:grid-cols-2">
            {["يعرض خطوات التفكير قبل التنفيذ", "يغيّر القوالب والألوان والخطوط والأقسام", "يحسب جدول السداد وتحليل SWOT", "تحكم دقيق بكل عنصر"].map((x) => <li key={x} className="flex gap-2"><Check className="mt-0.5 size-5 shrink-0 text-gold-700" />{x}</li>)}
          </ul>
        </Reveal>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-4">
            <div className="flex gap-2" role="tablist" aria-label="خطوات المحرر">
              {[["الطلب", MessageSquareText], ["التفكير", Brain], ["التنفيذ", Wrench]].map(([l, I], k) => {
                const Icon = I as typeof Brain;
                return <button key={l as string} role="tab" aria-selected={step === k} onClick={() => setStep(k)} className={cn("flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-semibold transition", step === k ? "border-navy-700 bg-primary text-primary-foreground shadow-soft" : k < step ? "border-gold-500/60 bg-surface text-gold-700" : "border-line bg-surface text-text-2")}><Icon className="size-4" />{k + 1}. {l as string}</button>;
              })}
            </div>
            <div className="rounded-3xl border border-line bg-surface p-6 shadow-deep">
              <p className="mb-2 text-sm font-semibold text-text-2">الطلب</p>
              <p className="rounded-2xl rounded-tr-sm bg-mist p-4 text-[16px] leading-relaxed text-navy-900">العقار موجه لمستثمر مهتم بالعائد السنوي، حوّل للقالب الفاخر وأضف جدول سداد ومصفوفة نقاط القوة.</p>
              {step >= 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-2 mt-4 rounded-2xl border border-positive/40 bg-positive/10 p-4">
                  <p className="mb-2 flex items-center gap-2 text-sm font-bold text-positive-text"><Brain className="size-4" />خطوات التفكير</p>
                  <ol className="space-y-1.5 text-[15px] text-navy-900">{THOUGHTS.map((x, k) => <li key={x} className="flex gap-2"><span dir="ltr" className="tabular text-positive-text">{k + 1}.</span>{x}</li>)}</ol>
                </div>
              )}
              {step >= 2 && (
                <div className="animate-in fade-in mt-4 flex flex-wrap gap-2">
                  {TOOLS.map((x) => <span key={x} className="flex items-center gap-1.5 rounded-full border border-gold-500/50 bg-ivory px-3 py-1.5 text-[13px] font-semibold text-gold-700"><Check className="size-3.5" />{x}</span>)}
                </div>
              )}
              <div className="mt-5 flex items-center justify-between">
                <DemoTag>معاينة توضيحية</DemoTag>
                {step < 2 ? <button onClick={() => setStep(step + 1)} className="flex items-center gap-1 text-sm font-bold text-navy-700 hover:text-gold-700">الخطوة التالية <ArrowLeft className="size-4" /></button> : <button onClick={() => setStep(0)} className="text-sm font-semibold text-text-2">إعادة</button>}
              </div>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md">
            <div key={step} className="animate-in fade-in shadow-deep duration-500">
              <ReportPage tpl={tpl} showSchedule={step >= 2} showSwot={step >= 2} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 2.5 هوية مكتبك */
const BRAND_COLORS = [
  { name: "كحلي", v: "var(--navy-700)" },
  { name: "زمردي", v: "var(--tpl-emerald)" },
  { name: "ترابي", v: "var(--tpl-earth)" },
  { name: "أزرق", v: "var(--tpl-blue)" },
];
const OFFICES = [
  { name: "مكتب النخبة العقارية", short: "ن" },
  { name: "دار الأفق للعقار", short: "أ" },
];
export function WhiteLabel() {
  const [c, setC] = useState(0);
  const [o, setO] = useState(0);
  const color = BRAND_COLORS[c]?.v ?? "var(--navy-700)";
  const office = OFFICES[o] ?? OFFICES[0]!;
  return (
    <section className="bg-surface py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        <Reveal>
          <SectionHead eyebrow="White-label" title={<>تقارير <span className="text-gold">باسم مكتبك</span></>} desc="ضع شعارك وألوان هويتك ورقم رخصتك العقارية، لتخرج التقارير باسم مكتبك." />
          <div className="mt-8 space-y-6">
            <div>
              <p className="mb-3 text-sm font-semibold text-text-2">الشعار التجريبي</p>
              <div className="flex gap-3">
                {OFFICES.map((x, k) => <button key={x.name} onClick={() => setO(k)} aria-pressed={o === k} className={cn("flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition", o === k ? "border-gold-500 bg-ivory shadow-soft" : "border-line")}><span className="grid size-8 place-items-center rounded-lg text-primary-foreground" style={{ background: color }}>{x.short}</span>{x.name}</button>)}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-text-2">لون الهوية</p>
              <div className="flex gap-3">
                {BRAND_COLORS.map((x, k) => <button key={x.name} onClick={() => setC(k)} aria-label={x.name} aria-pressed={c === k} className={cn("size-11 rounded-full ring-offset-2 transition", c === k ? "ring-2 ring-gold-500" : "ring-1 ring-line")} style={{ background: x.v }} />)}
              </div>
            </div>
            <DemoTag />
          </div>
        </Reveal>
        <Reveal className="grid grid-cols-2 gap-5">
          <div className="translate-y-8 shadow-deep"><ReportPage tpl={TEMPLATES[0]} brand={color} office={office.name} /></div>
          <div className="shadow-deep"><ReportPage tpl={TEMPLATES[1]} brand={color} office={office.name} page={1} /></div>
        </Reveal>
      </div>
    </section>
  );
}

/* 2.6 الحاسبة */
function Field({ label, value, min, max, step, onChange, display }: { label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; display: string }) {
  const id = label.replace(/\s/g, "-");
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between"><label htmlFor={id} className="text-sm font-semibold text-navy-900">{label}</label><span dir="ltr" className="tabular font-bold text-gold-700">{display}</span></div>
      <input id={id} type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-[var(--navy-700)]" />
    </div>
  );
}
export function Calculator() {
  const [price, setPrice] = useState(6_500_000);
  const [down, setDown] = useState(15);
  const [years, setYears] = useState(6);
  const [yld, setYld] = useState(11.5);
  const r = simpleCalc(price, down, years, yld);
  return (
    <section className="bg-mist py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <Reveal><SectionHead center eyebrow="Calculator" title={<>احسب الصفقة <span className="text-gold">في ثوانٍ</span></>} /></Reveal>
        <Reveal className="mt-12 overflow-hidden rounded-[2rem] border border-line bg-surface shadow-deep">
          <div className="grid md:grid-cols-[1.1fr_1fr]">
            <div className="space-y-7 p-7 md:p-10">
              <Field label="سعر العقار (ر.س)" value={price} min={500_000} max={30_000_000} step={100_000} onChange={setPrice} display={fmt(price)} />
              <Field label="نسبة المقدم" value={down} min={0} max={50} step={1} onChange={setDown} display={`${down}%`} />
              <Field label="مدة التقسيط (سنوات)" value={years} min={1} max={15} step={1} onChange={setYears} display={`${years}`} />
              <Field label="العائد المتوقع" value={yld} min={2} max={20} step={0.5} onChange={setYld} display={`${yld}%`} />
            </div>
            <div className="flex flex-col justify-between gap-6 bg-royal p-7 text-primary-foreground md:p-10">
              <dl className="space-y-6">
                {[["الدفعة الأولى", r.down], ["القسط الشهري", r.monthly], ["الدخل السنوي التقديري", r.annualIncome]].map(([k, v]) => (
                  <div key={k as string} className="border-b border-primary-foreground/15 pb-4">
                    <dt className="text-sm text-primary-foreground/70">{k}</dt>
                    <dd dir="ltr" className="tabular mt-1 text-end text-[clamp(1.6rem,3vw,2.3rem)] font-bold">{fmt(v as number)} <span className="text-base text-gold-300">SAR</span></dd>
                  </div>
                ))}
              </dl>
              <p className="rounded-xl bg-primary-foreground/10 p-3 text-[13px] leading-relaxed text-primary-foreground/85">تقدير مبسط بدون فوائد أو رسوم أو ضرائب، وليس عرضًا تمويليًا.</p>
              <a href="#pricing" className={cn(btn.gold, "w-full")}>ابدأ دراسة الجدوى</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 2.7 التغطية الإقليمية */
export function Regional() {
  return (
    <section className="bg-surface py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Saudi Arabia · Egypt" title={<>مصمم لخطط السداد والمصطلحات والأحياء <span className="text-gold">في السعودية ومصر</span></>} />
          <div className="flex gap-2">{["SAR", "EGP", "USD"].map((c) => <span key={c} dir="ltr" className="rounded-md border border-gold-500/60 bg-ivory px-3 py-1.5 text-sm font-bold tracking-wider text-gold-700">{c}</span>)}</div>
        </Reveal>
        <Reveal className="mt-12 grid overflow-hidden rounded-[2rem] border border-line shadow-soft md:grid-cols-2">
          {[
            { m: "السعودية", cur: "SAR", pts: ["رقم رخصة فال على التقرير", "أطوال الحدود وعروض الشوارع", "مخططات الرياض وجدة والخبر"], bg: "bg-ivory", d: "M20 120 L80 40 L160 30 L230 70 L260 140 L200 190 L90 180 Z" },
            { m: "مصر", cur: "EGP", pts: ["نظام السداد: مقدم + أقساط سنوية", "العاصمة الإدارية والتجمع وزايد", "حسابات بالجنيه المصري"], bg: "bg-mist", d: "M40 40 H240 V170 L200 190 H60 L40 170 Z" },
          ].map((x) => (
            <div key={x.m} className={cn("relative overflow-hidden p-8 md:p-10", x.bg)}>
              <svg viewBox="0 0 280 210" className="pointer-events-none absolute -bottom-6 -end-6 w-64 opacity-60" aria-hidden><path d={x.d} fill="none" stroke="var(--gold-500)" strokeWidth="1.5" strokeDasharray="4 4" /><circle cx="140" cy="100" r="5" fill="var(--navy-700)" /></svg>
              <div className="relative">
                <div className="flex items-center gap-3"><h3 className="text-2xl font-bold text-navy-900">{x.m}</h3><span dir="ltr" className="rounded bg-primary px-2 py-0.5 text-[13px] font-bold text-primary-foreground">{x.cur}</span></div>
                <ul className="mt-6 space-y-3">{x.pts.map((p) => <li key={p} className="flex gap-3 text-[16px] text-navy-900"><span className="mt-2 size-1.5 shrink-0 rotate-45 bg-gold" />{p}</li>)}</ul>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ماذا يحدث بعد التسجيل */
export function AfterSignup() {
  const steps = [["سجّل حسابك", "خلال دقيقة", UserPlus], ["الصق إعلانًا", "من واتساب أو أي مصدر", ClipboardPaste], ["شارك التقرير", "PDF أو رابط تفاعلي", Share2]] as const;
  return (
    <section className="bg-ivory py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <h2 className="text-center text-2xl font-bold text-navy-900 md:text-3xl">ماذا يحدث بعد التسجيل؟</h2>
        <div className="relative mt-12">
          <CircuitLine className="absolute inset-x-[10%] top-6 hidden h-6 md:block" d="M0 25 H710" nodes={[]} />
          <ol className="relative grid gap-8 md:grid-cols-3">
            {steps.map(([t, d, I], k) => (
              <li key={t} className="flex flex-col items-center text-center">
                <span className="grid size-14 place-items-center rounded-2xl bg-primary text-gold-300 shadow-deep ring-1 ring-gold-500"><I className="size-6" /></span>
                <p className="mt-4 text-lg font-bold text-navy-900"><span dir="ltr" className="tabular text-gold-700">0{k + 1}</span> · {t}</p>
                <p className="mt-1 text-text-2">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
