import { Box, Text, HStack } from "@chakra-ui/react";
import { useMemo } from "react";
import { useTick } from "../hooks/useTick";
import { SECONDS_PER_DAY, diffMs, endOfToday } from "../utils/time";
import DayHMS from "./DayHMS";
import DaySeconds from "./DaySeconds";
import { useSettings } from "../context/SettingsContext";

export default function DayCountdown() {
  const now = useTick(1000);
  const { displayMode } = useSettings();

  const remainingMs = useMemo(() => diffMs(endOfToday(), now), [now]);
  const remainingSec = Math.floor(remainingMs / 1000);

  // 残り比率（フェード/プログレスに使用）
  const ratio = remainingSec / SECONDS_PER_DAY; // 0.0〜1.0
  const alpha = Math.max(0.18, ratio); // 可読性のため下限を残す

  return (
    <Box p={6} borderWidth="1px" rounded="2xl" bg="blackAlpha.300">
      <HStack justify="space-between" align="center" mb={1}>
        <Text fontSize="sm" color="gray.400">
          本日の残された時間
        </Text>
      </HStack>

      {displayMode === "hms" ? (
        <DayHMS remainingMs={remainingMs} alpha={alpha} />
      ) : (
        <DaySeconds remainingSec={remainingSec} alpha={alpha} />
      )}
    </Box>
  );
}
