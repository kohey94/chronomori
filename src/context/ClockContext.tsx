import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  type ReactNode,
} from "react";

/** 秒境界に揃えた単一クロック */
type Clock = {
  now: Date; // 現在時刻（Date.now() 準拠）
  beat: number; // 1秒ごとに+1（タブ復帰や補正でも整合）
};

const ClockContext = createContext<Clock | null>(null);

export function ClockProvider({ children }: { children: ReactNode }) {
  const [now, setNow] = useState(() => new Date());
  const beatRef = useRef(0);
  const [, setTick] = useState(0); // 再レンダー用ダミー
  const timerRef = useRef<number | null>(null);

  // interval を安全に張り直す
  const startAlignedInterval = () => {
    // まず「次の秒境界」まで待つ
    const delay = 1000 - (Date.now() % 1000);
    window.setTimeout(() => {
      // 以後は1秒刻み（ズレ補正含む）
      // setInterval だけだとドリフトすることがあるので、都度 Date.now() を参照
      const id = window.setInterval(() => {
        // ページが非表示の間はブラウザがタイマーを絞るので、復帰時に一度だけ正規化
        const nowDate = new Date();
        setNow(nowDate);
        beatRef.current += 1;
        setTick((t) => (t + 1) & 0x3fff); // 軽い再描画トリガ

        // 軽いドリフト補正：現在のミリ秒に合わせて微調整
        const drift = Date.now() % 1000; // 0〜999
        if (drift > 20 && drift < 980) {
          // 次の tick で合わせ直す
          window.clearInterval(id);
          startAlignedInterval();
        }
      }, 1000);
      timerRef.current = id;
    }, delay);
  };

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        if (timerRef.current) window.clearInterval(timerRef.current);
        timerRef.current = null;
      } else {
        // 復帰時に即時 now 更新＋アラインして再開
        setNow(new Date());
        startAlignedInterval();
      }
    };

    startAlignedInterval();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const value = useMemo<Clock>(() => ({ now, beat: beatRef.current }), [now]);
  return <ClockContext.Provider value={value}>{children}</ClockContext.Provider>;
}

export function useClock() {
  const ctx = useContext(ClockContext);
  if (!ctx) throw new Error("useClock must be used inside ClockProvider");
  return ctx;
}
