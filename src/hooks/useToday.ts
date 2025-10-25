import { useEffect, useState } from "react";

export function useToday() {
  const [today, setToday] = useState(() => new Date());
  useEffect(() => {
    const now = new Date();
    const next = new Date(now);
    next.setHours(24, 0, 0, 0); // 次の 00:00:00
    const delay = next.getTime() - now.getTime();
    const id = setTimeout(() => setToday(new Date()), delay);
    return () => clearTimeout(id);
  }, [today]);
  return today;
}
