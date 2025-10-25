import { Box, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { useTick } from "../hooks/useTick";
import { useSettings } from "../context/SettingsContext";
import { useLifeTable } from "../hooks/useLifeTable";
import { exactAgeYears, yomeiFromTable, yearsToDays } from "../utils/yomei";

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
          残された時間
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
          残された時間
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
        残された時間
      </Text>
      <Text fontSize="4xl" fontWeight="semibold" color="whiteAlpha.900">
        約 {yomeiYears.toFixed(2)} 年（約 {yearsToDays(yomeiYears).toFixed(1)} 日）
      </Text>
    </Box>
  );
}
