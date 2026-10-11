import { useEffect, useRef, useState, type ReactNode } from "react";
import logo from "@/assets/aqar-logo.png.asset.json";
import { cn } from "@/lib/utils";

export const LOGO_URL = logo.url;

export function Logo({ className }: { className?: string }) {
  return <img src={logo.url} alt="عقاري AI — Real Estate Intelligence" className={cn("h-11 w-auto", className)} width={1984} height={797} />;
}

export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e?.isIntersecting) { setInView(true); io.disconnect(); } },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
}

export function Reveal({ children, className, as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "section" }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag ref={ref as never} className={cn("reveal", inView && "in", className)}>
      {children}
    </Tag>
  );
}

export function CountUp({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [n, setN] = useState(value);
  const prev = useRef(0);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(value); return; }
    const from = prev.current;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 900);
      const e = 1 - Math.pow(1 - p, 3);
      setN(from + (value - from) * e);
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, inView]);
  return (
    <span ref={ref} dir="ltr" className="tabular">
      {n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export function DemoTag({ children = "بيانات توضيحية", dark }: { children?: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        dark ? "border-gold-300/40 text-gold-300" : "border-gold-500/50 bg-ivory text-gold-700",
      )}
    >
      <span className={cn("size-1.5 rounded-full", dark ? "bg-gold-300" : "bg-gold-700")} />
      {children}
    </span>
  );
}

export function SectionHead({ eyebrow, title, desc, dark, center }: { eyebrow: string; title: ReactNode; desc?: string; dark?: boolean; center?: boolean }) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <p dir="ltr" className={cn("eyebrow mb-4 uppercase", dark ? "text-gold-300" : "text-gold-700", center ? "" : "text-end")}>{eyebrow}</p>
      <h2 className={cn("display-lg", dark ? "text-primary-foreground" : "text-navy-900")}>{title}</h2>
      {desc && <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-primary-foreground/75" : "text-text-2")}>{desc}</p>}
    </div>
  );
}

/** خط الدوائر الذهبي — توقيع الصفحة */
export function CircuitLine({ className, d = "M0 40 H180 L210 10 H420 L450 40 H700", nodes = [180, 420, 700] }: { className?: string; d?: string; nodes?: number[] }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={cn(inView && "in", className)} aria-hidden>
      <svg viewBox="0 0 710 50" className="h-full w-full" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="cg" x1="0" x2="1">
            <stop offset="0" stopColor="var(--gold-300)" />
            <stop offset="0.5" stopColor="var(--gold-500)" />
            <stop offset="1" stopColor="var(--gold-700)" />
          </linearGradient>
        </defs>
        <path d={d} stroke="url(#cg)" strokeWidth="1.5" className="circuit-draw" vectorEffect="non-scaling-stroke" />
        {nodes.map((x, i) => (
          <circle key={i} cx={x} cy={x === 420 ? 10 : 40} r="5" fill="var(--surface)" stroke="var(--gold-500)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
    </div>
  );
}

export const btn = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-deep ring-1 ring-gold-500/60 transition hover:-translate-y-0.5 hover:bg-navy-500 focus-visible:outline-gold-500",
  outline:
    "inline-flex items-center justify-center gap-2 rounded-xl border border-gold-500 bg-surface px-7 py-4 text-base font-semibold text-navy-900 transition hover:-translate-y-0.5 hover:bg-ivory",
  gold:
    "inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-7 py-4 text-base font-bold text-navy-900 shadow-deep transition hover:-translate-y-0.5 hover:brightness-105",
  ghostDark:
    "inline-flex items-center justify-center gap-2 rounded-xl border border-gold-300/50 px-7 py-4 text-base font-semibold text-primary-foreground transition hover:bg-primary-foreground/10",
};
