import dayjs from "dayjs";

export type LifeRow = { age: number; yomei: number };
export type LifeTable = LifeRow[];
export type Gender = "male" | "female" | "other";

/** 誕生日から“いま”の年齢（小数年）を算出 */
export function exactAgeYears(birth: Date, now = new Date()): number {
  const b = dayjs(birth);
  const n = dayjs(now);
  const whole = n.diff(b, "year");
  const last = b.add(whole, "year");
  const next = last.add(1, "year");
  const frac = (n.valueOf() - last.valueOf()) / Math.max(1, next.valueOf() - last.valueOf());
  return whole + Math.min(1, Math.max(0, frac));
}

/** 生命表（age,yomei）の整数年の間を線形補間して余命(年)を返す */
export function yomeiFromTable(ageReal: number, table: LifeTable): number | null {
  if (!table?.length) return null;
  const minAge = table[0].age;
  const maxAge = table[table.length - 1].age;

  // 範囲外を丸める
  if (ageReal <= minAge) return table[0].yomei;
  if (ageReal >= maxAge) return table[table.length - 1].yomei;

  const a0 = Math.floor(ageReal);
  const a1 = a0 + 1;
  const r0 = table.find((r) => r.age === a0);
  const r1 = table.find((r) => r.age === a1);
  if (!r0 && !r1) return null;
  if (r0 && !r1) return r0.yomei;
  if (!r0 && r1) return r1.yomei;

  const t = ageReal - a0;
  return r0!.yomei * (1 - t) + r1!.yomei * t;
}

/** “年”をミリ秒に（平均太陽年） */
export const yearsToMs = (years: number) => years * 365.2425 * 24 * 3600 * 1000;

/** 年 → 日数 */
export const yearsToDays = (years: number) => years * 365.2425;
