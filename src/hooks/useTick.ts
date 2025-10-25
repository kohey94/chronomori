import { useEffect, useState } from "react";

/** 指定間隔ごとに現在時刻を返す。既定は1秒。 */
export function useTick(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}
