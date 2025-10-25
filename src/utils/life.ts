/** 平均太陽年(365.2425日)で年数をミリ秒換算して加算 */
export function addYears(date: Date, years: number): Date {
  const ms = years * 365.2425 * 24 * 3600 * 1000;
  return new Date(date.getTime() + ms);
}

export function lifeRemainingMs(birth: Date, avgYears: number, now = new Date()): number {
  const expected = addYears(birth, avgYears);
  return Math.max(expected.getTime() - now.getTime(), 0);
}
