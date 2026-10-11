import { useEffect, useState } from "react";
import { Menu, X, ArrowLeft, FileText, Share2, Sparkles, ClipboardPaste, BarChart3 } from "lucide-react";
import tower from "@/assets/hero-tower.jpg";
import { Logo, CountUp, btn, DemoTag } from "./primitives";
import { cn } from "@/lib/utils";
import { SCENARIOS } from "./mock-data";

const NAV = [
  { href: "#overview", label: "نظرة عامة" },
  { href: "#features", label: "المميزات" },
  { href: "#reports", label: "التقارير" },
  { href: "#pricing", label: "الأسعار" },
  { href: "#faq", label: "الأسئلة الشائعة" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 10);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={cn("sticky top-0 z-50 border-b transition", scrolled ? "border-line bg-surface/85 shadow-soft backdrop-blur-md" : "border-transparent bg-surface/70 backdrop-blur-sm")}>
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5 lg:px-8" aria-label="التنقل الرئيسي">
        <a href="#top" aria-label="عقاري AI — الرئيسية"><Logo className="h-14" /></a>
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <li key={n.href}><a href={n.href} className="text-[15px] font-medium text-text-2 transition hover:text-navy-900">{n.label}</a></li>
          ))}
        </ul>
        <div className="hidden items-center gap-3 lg:flex">
          <a href="#pricing" className="px-3 py-2 text-[15px] font-semibold text-navy-900 hover:text-gold-700">تسجيل الدخول</a>
          <a href="#pricing" className="rounded-xl bg-primary px-5 py-3 text-[15px] font-semibold text-primary-foreground ring-1 ring-gold-500 transition hover:bg-navy-500">ابدأ تجربتك المجانية</a>
        </div>
        <button className="rounded-lg p-2 text-navy-900 lg:hidden" onClick={() => setOpen(true)} aria-label="فتح القائمة" aria-expanded={open}>
          <Menu className="size-6" />
        </button>
      </nav>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-navy-900/40" onClick={() => setOpen(false)} aria-label="إغلاق" />
          <div className="absolute inset-y-0 start-0 flex w-80 max-w-[85vw] flex-col gap-2 bg-surface p-6 shadow-deep">
            <div className="mb-6 flex items-center justify-between">
              <Logo className="h-10" />
              <button onClick={() => setOpen(false)} aria-label="إغلاق القائمة" className="p-2"><X className="size-6" /></button>
            </div>
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-lg font-medium text-navy-900 hover:bg-mist">{n.label}</a>
            ))}
            <a href="#pricing" onClick={() => setOpen(false)} className={cn(btn.primary, "mt-6")}>ابدأ تجربتك المجانية</a>
          </div>
        </div>
      )}
    </header>
  );
}

const STEPS = [
  { key: "input", label: "إدخال", icon: ClipboardPaste },
  { key: "extract", label: "استخراج", icon: Sparkles },
  { key: "analyze", label: "تحليل", icon: BarChart3 },
  { key: "report", label: "تقرير", icon: FileText },
  { key: "share", label: "مشاركة", icon: Share2 },
];

export function Hero() {
  const [step, setStep] = useState(2);
  const s = SCENARIOS.realistic;
  return (
    <section id="top" className="relative overflow-hidden bg-surface">
      <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-12 px-5 py-12 lg:grid-cols-[1.15fr_1fr] lg:px-8 lg:py-16">
        {/* Text */}
        <div>
          <p dir="ltr" className="eyebrow mb-6 text-end uppercase text-gold-700">Real Estate Intelligence</p>
          <h1 className="display-xl text-navy-900">
            من بيانات العقار
            <br />
            إلى <span className="text-gold">قرار استثماري</span> أوضح
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-2 md:text-xl">
            الصق إعلان العقار، واحصل على تحليل مالي كامل وتقرير استثماري بهوية مكتبك، جاهز للمشاركة مع المستثمر في دقائق.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a href="#pricing" className={btn.primary}>ابدأ تجربتك المجانية <ArrowLeft className="size-5" /></a>
            <a href="#features" className={btn.outline}>استكشف المنصة</a>
          </div>
          <p className="mt-6 text-sm font-medium text-text-2">
            تقارير PDF <span className="mx-2 text-gold-500">·</span> رابط مستثمر بدون حساب <span className="mx-2 text-gold-500">·</span> ريال سعودي وجنيه مصري
          </p>

          {/* Stepper */}
          <div className="mt-10" role="tablist" aria-label="رحلة المنصة">
            <div className="flex flex-wrap gap-2">
              {STEPS.map((st, i) => {
                const Icon = st.icon;
                const active = i === step;
                return (
                  <button
                    key={st.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setStep(i)}
                    className={cn(
                      "flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition",
                      active ? "border-navy-700 bg-primary text-primary-foreground shadow-soft" : i < step ? "border-gold-500/60 bg-ivory text-gold-700" : "border-line bg-surface text-text-2 hover:border-gold-500",
                    )}
                  >
                    <Icon className="size-4" /> {st.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-[600px] pb-10 lg:pb-0">
          <div className="relative arch bg-royal p-4 shadow-deep ring-inner sm:p-5">
            <div className="arch relative aspect-[4/5] overflow-hidden">
              <img src={tower} alt="برج سكني فاخر في الرياض" width={896} height={1152} className="h-[112%] w-full object-cover object-top" fetchPriority="high" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-700/70 via-transparent to-transparent" />
            </div>
            {/* circuit across */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden fill="none">
              <path d="M12 30 V58 L28 70 H70 L86 84 V110" stroke="var(--gold-300)" strokeWidth="0.35" strokeDasharray="1.2 1" />
              {[[12, 30], [28, 70], [70, 70], [86, 110]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="1.2" fill="var(--navy-700)" stroke="var(--gold-300)" strokeWidth="0.4" />
              ))}
            </svg>
          </div>

          {/* Smart paste chip */}
          <PreviewCard active={step <= 1} className="absolute -start-4 top-10 w-60 sm:-start-10">
            <p className="mb-2 flex items-center gap-1.5 text-xs font-bold text-gold-700"><ClipboardPaste className="size-3.5" /> Smart Paste</p>
            <p className="rounded-lg rounded-tr-none bg-mist p-2.5 text-xs leading-relaxed text-text-2">للبيع شقة في النرجس 185م² بسعر 1,250,000 ريال، 3 غرف…</p>
            <div className="mt-2 grid grid-cols-3 gap-1.5 text-center text-[11px]">
              {[["النوع", "شقة"], ["المساحة", "185م²"], ["الغرف", "3"]].map(([k, v]) => (
                <div key={k} className="rounded-md border border-line py-1"><div className="text-text-2">{k}</div><div className="font-bold text-navy-900">{v}</div></div>
              ))}
            </div>
          </PreviewCard>

          {/* KPI card */}
          <PreviewCard active={step === 2} className="absolute -end-3 top-[38%] w-56 sm:-end-8">
            <div className="mb-2 flex items-center justify-between"><p className="text-xs font-bold text-navy-900">مؤشرات الصفقة</p><DemoTag>توضيحي</DemoTag></div>
            {[
              ["ROI", s.roi, 1, "%"],
              ["IRR", s.irr, 1, "%"],
            ].map(([k, v, d, suf]) => (
              <div key={k as string} className="flex items-baseline justify-between border-b border-line py-1.5 last:border-0">
                <span dir="ltr" className="text-xs font-semibold text-text-2">{k}</span>
                <span className="text-2xl font-bold text-navy-900"><CountUp value={v as number} decimals={d as number} suffix={suf as string} /></span>
              </div>
            ))}
            <div className="flex items-baseline justify-between pt-1.5">
              <span dir="ltr" className="text-xs font-semibold text-text-2">NPV</span>
              <span className="text-lg font-bold text-gold-700"><CountUp value={s.npv} /> <span className="text-xs">SAR</span></span>
            </div>
          </PreviewCard>

          {/* A4 report */}
          <div className={cn("absolute -bottom-2 start-6 w-48 rotate-[-3deg] rounded-md bg-surface p-3 shadow-deep transition duration-500 sm:start-14 sm:w-56", step >= 3 ? "scale-105 ring-2 ring-gold-500" : "")}>
            <div className="h-14 rounded-sm bg-royal p-2">
              <div className="h-1.5 w-16 rounded bg-gold" />
              <div className="mt-2 h-1 w-24 rounded bg-primary-foreground/50" />
            </div>
            <p className="mt-2 text-[11px] font-bold text-navy-900">تقرير استثماري — شقة النرجس</p>
            <div className="mt-2 flex h-10 items-end gap-1">
              {s.flows.map((f, i) => <div key={i} className="flex-1 rounded-t-sm bg-gold" style={{ height: `${(f / 112) * 100}%` }} />)}
            </div>
            <div className="mt-2 space-y-1">{[90, 70, 80].map((w) => <div key={w} className="h-1 rounded bg-line" style={{ width: `${w}%` }} />)}</div>
            {step === 4 && (
              <div className="absolute -top-4 end-2 flex items-center gap-1 rounded-full bg-positive px-2.5 py-1 text-[11px] font-bold text-primary-foreground shadow-soft">
                <Share2 className="size-3" /> تمت المشاركة
              </div>
            )}
          </div>
        </div>
      </div>

      {/* audience strip */}
      <div className="border-y border-line bg-mist">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-5 text-[15px] font-semibold text-navy-700">
          <span className="text-sm font-medium text-text-2">صُمّم من أجل</span>
          {["مسوقون عقاريون", "وسطاء", "مطورون", "مكاتب استثمارية"].map((a) => (
            <span key={a} className="flex items-center gap-2"><span className="size-1.5 rotate-45 bg-gold" />{a}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function PreviewCard({ children, className, active }: { children: React.ReactNode; className?: string; active: boolean }) {
  return (
    <div className={cn("rounded-2xl border border-line bg-surface p-4 shadow-deep transition duration-500", active ? "scale-105 ring-2 ring-gold-500" : "", className)}>
      {children}
    </div>
  );
}
