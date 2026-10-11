// تقدير مبسط بدون فوائد أو رسوم أو ضرائب — ليس عرضًا تمويليًا.
export function simpleCalc(price: number, downPct: number, years: number, yieldPct: number) {
  const down = Math.round(price * (downPct / 100));
  const months = Math.max(1, Math.round(years * 12));
  const monthly = Math.round((price - down) / months);
  const annualIncome = Math.round(price * (yieldPct / 100));
  return { down, monthly, annualIncome, months };
}
