import { Box, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { useTick } from "../hooks/useTick";
import { formatHMS } from "../utils/time";
import { useSettings } from "../context/SettingsContext";
import { useLifeTable } from "../hooks/useLifeTable";
import { exactAgeYears, yomeiFromTable, yearsToMs, yearsToDays } from "../utils/yomei";

export default function LifeCountdown() {
  const now = useTick(1000);
  const { birthStr, gender } = useSettings();
  const { male, female, ready } = useLifeTable();

  const yomeiYears = useMemo(() => {
    if (!ready || !birthStr) return null;
    const birth = new Date(birthStr);
    if (isNaN(birth.getTime())) return null;

    const ageReal = exactAgeYears(birth, now);

    if (gender === "male" && male) return yomeiFromTable(ageReal, male);
    if (gender === "female" && female) return yomeiFromTable(ageReal, female);

    // データが片方しかない場合のフォールバック
    if (male) return yomeiFromTable(ageReal, male);
    if (female) return yomeiFromTable(ageReal, female);
    return null;
  }, [ready, birthStr, gender, male, female, now]);

  const remainingMs = useMemo(() => {
    if (yomeiYears == null) return 0;
    // “いま”から余命年数だけ進めた時刻を死期と見なし、差を取る
    const death = new Date(now.getTime() + yearsToMs(yomeiYears));
    return Math.max(death.getTime() - now.getTime(), 0);
  }, [yomeiYears, now]);

  const totalSec = Math.floor(remainingMs / 1000);
  const days = Math.floor(totalSec / 86400);
  const hms = formatHMS((totalSec % 86400) * 1000);

  if (!ready) {
    return (
      <Box p={6} borderWidth="1px" rounded="2xl" bg="blackAlpha.300">
        <Text color="whiteAlpha.800">生命表を読み込み中…</Text>
      </Box>
    );
  }

  if (!birthStr) {
    return (
      <Box p={6} borderWidth="1px" rounded="2xl" bg="blackAlpha.300">
        <Text fontSize="sm" color="gray.400">
          人生の残り（生命表ベース）
        </Text>
        <Text mt={3} color="whiteAlpha.800">
          生年月日が未設定です。メニューから設定してください。
        </Text>
      </Box>
    );
  }

  if (yomeiYears == null) {
    return (
      <Box p={6} borderWidth="1px" rounded="2xl" bg="blackAlpha.300">
        <Text fontSize="sm" color="gray.400">
          残りの人生
        </Text>
        <Text mt={3} color="whiteAlpha.800">
          余命データが見つかりませんでした。
        </Text>
      </Box>
    );
  }

  return (
    <Box p={6} borderWidth="1px" rounded="2xl" bg="blackAlpha.300">
      <Text fontSize="sm" color="gray.400">
        残りの人生
      </Text>
      <Text fontSize="4xl" fontWeight="semibold" color="whiteAlpha.900">
        約 {yomeiYears.toFixed(2)} 年（約 {yearsToDays(yomeiYears).toFixed(1)} 日）
      </Text>
    </Box>
  );
}
