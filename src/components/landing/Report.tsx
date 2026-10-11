import { useEffect, useState, type CSSProperties } from "react";
import { ChevronRight, ChevronLeft, Eye, X, Download } from "lucide-react";
import tower from "@/assets/hero-tower.jpg";
import villa from "@/assets/villa.jpg";
import { Reveal, SectionHead, DemoTag, LOGO_URL } from "./primitives";
import { TEMPLATES, VILLA, type Template } from "./mock-data";
import { cn } from "@/lib/utils";

const fmt = (n: number) => n.toLocaleString("en-US");

export type ReportOpts = {
  tpl: Template;
  page?: number;
  office?: string;
  license?: string;
  brand?: string;
  showSchedule?: boolean;
  showSwot?: boolean;
};

/** صفحة تقرير A4 كاملة المحتوى — بيانات توضيحية */
export function ReportPage({ tpl, page = 0, office = "مكتب النخبة العقارية", license = "120004921", brand, showSchedule = true, showSwot = false }: ReportOpts) {
  const c1 = brand ?? tpl.c1;
  const c2 = tpl.c2;
  const style = { "--c1": c1, "--c2": c2, fontFamily: tpl.font } as CSSProperties;
  const clean = tpl.id === "clean";
  const numbered = tpl.id === "modern";
  const sec = (n: number, t: string) => (
    <h4 className="mb-2 flex items-center gap-2 text-[13px] font-bold text-navy-900">
      {numbered ? <span dir="ltr" className="tabular text-[13px] text-[var(--c2)]">0{n}</span> : <span className="h-3.5 w-1 rounded bg-[var(--c2)]" />}
      {t}
    </h4>
  );
  const kpis: [string, string][] = [["السعر", `${fmt(VILLA.price)}`], ["سعر المتر", `${fmt(VILLA.ppm)}`], ["المقدم 15%", fmt(VILLA.down)], ["ROI", `${VILLA.roi}%`]];
  return (
    <article style={style} className="flex aspect-[1/1.414] w-full flex-col overflow-hidden rounded-md bg-surface text-navy-900">
      {page === 0 ? (
        <>
          {/* cover */}
          <div className={cn("relative h-[34%] shrink-0", clean && "border-b-4 border-[var(--c1)]")}>
            {!clean && <img src={tpl.id === "brochure" || tpl.id === "land" ? villa : tower} alt="" loading="lazy" width={896} height={1152} className="absolute inset-0 h-full w-full object-cover object-[center_30%]" />}
            <div className="absolute inset-0" style={{ background: clean ? "var(--surface)" : `linear-gradient(to top, color-mix(in oklab, ${c1} 92%, transparent), color-mix(in oklab, ${c1} 25%, transparent))` }} />
            <div className={cn("absolute inset-x-0 bottom-0 p-[5%]", clean ? "text-navy-900" : "text-primary-foreground")}>
              <p dir="ltr" className="text-end text-[13px] font-semibold tracking-[0.2em]" style={{ color: clean ? c1 : "var(--gold-300)" }}>{tpl.name.toUpperCase()}</p>
              <h3 className="mt-1 text-[clamp(1rem,2.2vw,1.6rem)] font-bold leading-tight">{VILLA.name}</h3>
              <p className="text-[13px] opacity-80">{VILLA.loc}</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[3.5%] p-[5%]">
            <div>
              {sec(1, "الملخص التنفيذي")}
              <p className="text-[13px] leading-relaxed text-text-2">فيلا سكنية فاخرة في شمال الرياض. سعر المتر أقل من مرجع الحي بنسبة تقديرية، مع خطة سداد على {VILLA.months} شهرًا.</p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {kpis.map(([k, v]) => (
                <div key={k} className="rounded border border-line p-2" style={tpl.id === "lux" ? { borderColor: "color-mix(in oklab, var(--c2) 50%, transparent)" } : undefined}>
                  <p className="text-[13px] text-text-2">{k}</p>
                  <p dir="ltr" className="tabular text-end text-[clamp(0.8rem,1.4vw,1.05rem)] font-bold" style={{ color: k === "ROI" ? c2 : undefined }}>{v}</p>
                </div>
              ))}
            </div>
            {tpl.id === "land" ? (
              <div>
                {sec(2, "مخطط القطعة والحدود")}
                <svg viewBox="0 0 300 90" className="w-full"><rect x="60" y="8" width="180" height="70" fill="none" stroke={c1} strokeWidth="2" /><text x="150" y="48" textAnchor="middle" fontSize="11" fill={c1}>420 م²</text><text x="150" y="88" textAnchor="middle" fontSize="9" fill="var(--text-2)">شارع 20م</text><text x="52" y="46" textAnchor="end" fontSize="9" fill="var(--text-2)">21م</text></svg>
              </div>
            ) : tpl.id === "brochure" ? (
              <div className="grid grid-cols-3 gap-2">
                {["6 غرف", "5 حمامات", "مسبح"].map((x) => <div key={x} className="rounded py-2 text-center text-[13px] font-semibold text-primary-foreground" style={{ background: c2 }}>{x}</div>)}
              </div>
            ) : null}
            {showSchedule && (
              <div>
                {sec(tpl.id === "land" ? 3 : 2, "جدول الدفعات")}
                <table className="w-full text-[13px]">
                  <thead><tr className="text-text-2" style={{ background: clean ? "var(--mist)" : `color-mix(in oklab, ${c1} 8%, var(--surface))` }}><th className="p-1 text-start font-medium">الدفعة</th><th className="p-1 text-start font-medium">القيمة (ر.س)</th></tr></thead>
                  <tbody dir="rtl">
                    {[["المقدم", VILLA.down], ["القسط 1", VILLA.monthly], ["القسط 2", VILLA.monthly], [`… حتى القسط ${VILLA.months}`, VILLA.monthly]].map(([k, v]) => (
                      <tr key={k as string} className="border-b border-line"><td className="p-1">{k}</td><td dir="ltr" className="tabular p-1 text-end font-semibold">{fmt(v as number)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {showSwot && (
              <div className="grid grid-cols-2 gap-1.5 text-[13px]">
                {[["قوة", "موقع شمالي"], ["ضعف", "سعر مرتفع"], ["فرص", "طلب إيجاري"], ["مخاطر", "تقلب السوق"]].map(([k, v]) => <div key={k} className="rounded bg-mist p-1.5"><b style={{ color: c2 }}>{k}:</b> {v}</div>)}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col gap-4 p-[5%]">
          {sec(page + 2, page === 1 ? "التدفق النقدي والعائد" : "الموقع والمرافق")}
          {page === 1 ? (
            <>
              <svg viewBox="0 0 300 120" className="w-full">
                <line x1="0" y1="100" x2="300" y2="100" stroke="var(--line)" />
                <polyline points="0,100 50,92 100,80 150,64 200,46 250,30 300,14" fill="none" stroke={c2} strokeWidth="2.5" />
              </svg>
              <div className="grid grid-cols-3 gap-2">{[["ROI", "12.8%"], ["IRR", "11.4%"], ["NPV", "1.9M"]].map(([k, v]) => <div key={k} className="rounded border border-line p-2"><p dir="ltr" className="text-end text-[13px] text-text-2">{k}</p><p dir="ltr" className="tabular text-end text-lg font-bold">{v}</p></div>)}</div>
              <p className="text-[13px] text-text-2">مؤشرات تحليلية وليست ضمانًا للعائد.</p>
            </>
          ) : (
            <>
              <img src={villa} alt="" loading="lazy" width={1280} height={960} className="h-2/5 w-full rounded object-cover" />
              <ul className="space-y-1.5 text-[13px]">{[["مدرسة", "650م"], ["مستشفى", "2.1كم"], ["طريق الملك سلمان", "1.2كم"]].map(([k, v]) => <li key={k} className="flex justify-between border-b border-line pb-1"><span>{k}</span><span dir="ltr" className="tabular text-text-2">{v}</span></li>)}</ul>
            </>
          )}
        </div>
      )}
      {/* footer */}
      <footer className="mt-auto flex shrink-0 items-center justify-between border-t border-line px-[5%] py-2 text-[13px] text-text-2" style={{ borderTopColor: c1 }}>
        <span className="truncate">{office} · رخصة فال: <span dir="ltr">{license}</span></span>
        <span dir="ltr" className="tabular">{page + 1} / 3</span>
      </footer>
    </article>
  );
}

function Thumb({ t, active, onClick }: { t: Template; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} aria-pressed={active} className={cn("group w-full rounded-xl border p-2 text-start transition", active ? "border-gold-300 bg-primary-foreground/10" : "border-primary-foreground/15 hover:border-gold-300/50")}>
      <div className="flex gap-3">
        <div className="aspect-[1/1.414] w-12 shrink-0 overflow-hidden rounded-sm bg-surface">
          <div className="h-1/3" style={{ background: t.id === "clean" ? "var(--surface)" : t.c1, borderBottom: `3px solid ${t.c2}` }} />
          <div className="space-y-1 p-1">{[80, 60, 70].map((w) => <div key={w} className="h-0.5 bg-line" style={{ width: `${w}%` }} />)}</div>
        </div>
        <div className="min-w-0">
          <p dir="ltr" className="text-end text-[13px] font-semibold text-primary-foreground">{t.name}</p>
          <p className="text-[13px] text-primary-foreground/65">{t.fits}</p>
        </div>
      </div>
    </button>
  );
}

export function PreviewModal({ tpl, onClose }: { tpl: Template; onClose: () => void }) {
  const [page, setPage] = useState(0);
  useEffect(() => {
    const f = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", f);
    return () => window.removeEventListener("keydown", f);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={`معاينة ${tpl.name}`}>
      <button className="absolute inset-0 bg-navy-900/60" onClick={onClose} aria-label="إغلاق" />
      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col gap-3">
        <div className="flex items-center justify-between rounded-xl bg-surface px-4 py-2 shadow-deep">
          <span dir="ltr" className="font-semibold">{tpl.name} · PDF</span>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="p-2 disabled:opacity-40" aria-label="السابقة"><ChevronRight className="size-5" /></button>
            <span dir="ltr" className="tabular text-sm">{page + 1}/3</span>
            <button onClick={() => setPage((p) => Math.min(2, p + 1))} disabled={page === 2} className="p-2 disabled:opacity-40" aria-label="التالية"><ChevronLeft className="size-5" /></button>
            <button onClick={onClose} className="p-2" aria-label="إغلاق المعاينة"><X className="size-5" /></button>
          </div>
        </div>
        <div className="overflow-auto rounded-md shadow-deep"><ReportPage tpl={tpl} page={page} /></div>
      </div>
    </div>
  );
}

/* استوديو التقارير */
export function ReportStudio() {
  const [i, setI] = useState(0);
  const [page, setPage] = useState(0);
  const [modal, setModal] = useState(false);
  const t = TEMPLATES[i] ?? TEMPLATES[0];
  return (
    <section id="reports" className="relative scroll-mt-20 overflow-hidden bg-royal py-24 lg:py-28">
      <div className="pointer-events-none absolute -top-60 start-1/2 size-[1000px] -translate-x-1/2 rounded-full border border-gold-300/15" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead dark eyebrow="Report Studio" title={<>خمسة قوالب. <span className="text-gold">تقرير واحد يليق بكل صفقة.</span></>} desc="كل قالب يغيّر الألوان والخطوط وتخطيط الأقسام. الجداول قابلة للتعديل اليدوي والأقسام مرقّمة تلقائيًا." />
          <DemoTag dark />
        </Reveal>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[300px_1fr]">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {TEMPLATES.map((x, k) => <Thumb key={x.id} t={x} active={k === i} onClick={() => { setI(k); setPage(0); }} />)}
            <button onClick={() => setModal(true)} className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3.5 font-bold text-navy-900 shadow-deep transition hover:brightness-105 sm:col-span-2 lg:col-span-1">
              <Eye className="size-5" /> معاينة PDF كاملة
            </button>
          </div>

          <div>
            <div className="relative mx-auto w-full max-w-[min(100%,calc(78vh/1.414))]">
              <div className="absolute inset-0 translate-x-6 translate-y-5 rotate-[3deg] rounded-md bg-primary-foreground/15" aria-hidden />
              <div className="absolute inset-0 translate-x-3 translate-y-2.5 rotate-[1.5deg] rounded-md bg-primary-foreground/30" aria-hidden />
              <div key={t.id + page} className="animate-in fade-in relative shadow-deep duration-500">
                <ReportPage tpl={t} page={page} />
              </div>
            </div>
            <div className="mt-8 flex items-center justify-center gap-4 text-primary-foreground">
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="rounded-full border border-primary-foreground/30 p-2.5 disabled:opacity-40" aria-label="الصفحة السابقة"><ChevronRight className="size-5" /></button>
              <span className="text-sm">صفحة <span dir="ltr" className="tabular">{page + 1} / 3</span></span>
              <button onClick={() => setPage((p) => Math.min(2, p + 1))} disabled={page === 2} className="rounded-full border border-primary-foreground/30 p-2.5 disabled:opacity-40" aria-label="الصفحة التالية"><ChevronLeft className="size-5" /></button>
              <span className="ms-4 hidden items-center gap-1.5 text-sm text-gold-300 sm:flex"><Download className="size-4" /> تصدير PDF</span>
            </div>
          </div>
        </div>
      </div>
      {modal && <PreviewModal tpl={t} onClose={() => setModal(false)} />}
    </section>
  );
}

export { LOGO_URL };
