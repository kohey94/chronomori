import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useClock } from "../context/ClockContext";

type Props = { anchorRef: React.RefObject<HTMLElement | null> };

type Drop = {
  id: number;
  x: number; // 画面左からのpx
  yStart: number; // 開始Y（カード下端）
  yEnd: number; // 終了Y（画面最下）
  size: number; // 直径
  life: number; // 秒（アニメ時間）
};

export default function DripStage({ anchorRef }: Props) {
  const prefersReduced = useReducedMotion();
  const beat = useClock();
  const [drops, setDrops] = useState<Drop[]>([]);
  const idRef = useRef(0);

  // アンカー位置を都度取得（スクロール対応）
  const anchor = useMemo(() => {
    const el = anchorRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return {
      bottom: rect.bottom,
      left: rect.left,
      width: rect.width,
    };
  }, [anchorRef, beat]);

  // 1秒ごとに1滴生成
  useEffect(() => {
    if (prefersReduced || !anchor) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const startX = anchor.left + anchor.width / 2;

    const size = 14;
    const life = 1.0;

    const drop: Drop = {
      id: ++idRef.current,
      x: Math.max(8, Math.min(vw - 8, startX)),
      yStart: anchor.bottom, // カード下端から
      yEnd: vh + size + 2, // 画面外まで
      size,
      life,
    };

    setDrops((ds) => {
      const next = [...ds, drop];
      // 同時に増えすぎないよう上限を設定（例：12）
      if (next.length > 12) next.shift();
      return next;
    });
  }, [beat, prefersReduced, anchor]);

  if (prefersReduced) return null;

  // 画面固定の最前面レイヤー（クリック透過）
  return createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 10, // 必要に応じ調整
      }}
    >
      <AnimatePresence initial={false}>
        {drops.map((d) => (
          <motion.div
            key={d.id}
            initial={{ x: d.x, y: d.yStart, opacity: 0.9, scale: 1 }}
            animate={{ y: d.yEnd, opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: d.life, ease: "easeIn" }}
            onAnimationComplete={() => setDrops((ds) => ds.filter((x) => x.id !== d.id))}
            style={{
              position: "absolute",
              width: d.size,
              height: d.size,
              borderRadius: "50%",
              background: "#E53E3E", // 滴の色：必要なら調整
              willChange: "transform, opacity",
              filter: "blur(0.2px)", // ごく軽い滲み（任意）
            }}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
