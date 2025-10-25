// src/context/SettingsContext.tsx
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { DisplayMode } from "../types";

type Settings = {
  displayMode: DisplayMode;
  setDisplayMode: (m: DisplayMode) => void;
  birthStr: string; // YYYY-MM-DD
  setBirthStr: (s: string) => void;
  avgYears: number;
  setAvgYears: (n: number) => void;
};

const SettingsContext = createContext<Settings | null>(null);

// 既存の値を読み込み（なければデフォルト）
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

  // 永続化
  useEffect(
    () => localStorage.setItem("cm.displayMode", JSON.stringify(displayMode)),
    [displayMode],
  );
  useEffect(() => localStorage.setItem("cm.birthdate", JSON.stringify(birthStr)), [birthStr]);
  useEffect(() => localStorage.setItem("cm.avgYears", JSON.stringify(avgYears)), [avgYears]);

  const value = useMemo(
    () => ({ displayMode, setDisplayMode, birthStr, setBirthStr, avgYears, setAvgYears }),
    [displayMode, birthStr, avgYears],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
