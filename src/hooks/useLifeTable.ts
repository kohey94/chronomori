import { useEffect, useState } from "react";

export type LifeRow = { age: number; yomei: number };
export type LifeTable = LifeRow[];

type LifeTables = {
  version: string;
  male: LifeTable;
  female: LifeTable;
};

// ファイル更新時にここを上げると、localStorageの古いキャッシュを無視できます
const VERSION = "v1";
const KEY = "cm.lifetables";

function parseCsvToTable(csv: string): LifeTable {
  // 期待ヘッダ: age,yomei（先頭行は捨てる）
  return csv
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => {
      const [ageStr, yomeiStr] = line.split(",");
      return { age: Number(ageStr), yomei: Number(yomeiStr) };
    })
    .filter((r) => Number.isFinite(r.age) && Number.isFinite(r.yomei));
}

async function fetchCsv(path: string): Promise<LifeTable> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`fetch failed: ${path} ${res.status}`);
  const txt = await res.text();
  return parseCsvToTable(txt);
}

function saveTables(lifetables: LifeTables) {
  localStorage.setItem(KEY, JSON.stringify(lifetables));
}

function loadTables(): LifeTables | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const obj = JSON.parse(raw) as LifeTables;
    if (obj.version !== VERSION) return null;
    return obj;
  } catch {
    return null;
  }
}

export function useLifeTable() {
  const [male, setMale] = useState<LifeTable | null>(null);
  const [female, setFemale] = useState<LifeTable | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        // 1) まず localStorage を見る
        let tables = loadTables();

        // 2) 無ければ public から fetch
        if (!tables) {
          const [m, f] = await Promise.all([
            fetchCsv("/reiwa6_lifetable_male.csv"),
            fetchCsv("/reiwa6_lifetable_female.csv"),
          ]);
          tables = {
            version: VERSION,
            male: m,
            female: f,
          };
          saveTables(tables);
        }

        setMale(tables.male);
        setFemale(tables.female);
        setReady(true);
      } catch (e: any) {
        setError(e?.message ?? "unknown error");
      }
    })();
  }, []);

  return { male, female, ready, error };
}
