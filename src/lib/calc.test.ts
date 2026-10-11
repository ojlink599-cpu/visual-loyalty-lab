import { describe, it, expect } from "vitest";
import { simpleCalc } from "./calc";

describe("simpleCalc", () => {
  it("default values: 6.5M, 15%, 6y, 11.5%", () => {
    const r = simpleCalc(6_500_000, 15, 6, 11.5);
    expect(r.down).toBe(975_000);
    expect(r.monthly).toBe(76_736);
    expect(r.annualIncome).toBe(747_500);
  });
  it("villa example: 8.5M, 15%, 72 months", () => {
    const r = simpleCalc(8_500_000, 15, 6, 12.8);
    expect(r.down).toBe(1_275_000);
    expect(r.monthly).toBe(100_347);
  });
});
