import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { DisplayMode, Gender, Settings } from "../types";

const SettingsContext = createContext<Settings | null>(null);

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [displayMode, setDisplayMode] = useState<DisplayMode>(() =>
    readLS<DisplayMode>("cm.displayMode", "sec"),
  );
  const [birthStr, setBirthStr] = useState<string>(() => readLS<string>("cm.birthdate", ""));
  const [avgYears, setAvgYears] = useState<number>(() => readLS<number>("cm.avgYears", 84));
  const [gender, setGender] = useState<Gender>(() => readLS("cm.gender", "male"));

  // 永続化
  useEffect(
    () => localStorage.setItem("cm.displayMode", JSON.stringify(displayMode)),
    [displayMode],
  );
  useEffect(() => localStorage.setItem("cm.birthdate", JSON.stringify(birthStr)), [birthStr]);
  useEffect(() => localStorage.setItem("cm.avgYears", JSON.stringify(avgYears)), [avgYears]);
  useEffect(() => localStorage.setItem("cm.gender", JSON.stringify(gender)), [gender]);

  const value = useMemo(
    () => ({
      displayMode,
      setDisplayMode,
      birthStr,
      setBirthStr,
      avgYears,
      setAvgYears,
      gender,
      setGender,
    }),
    [displayMode, birthStr, avgYears, gender],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
