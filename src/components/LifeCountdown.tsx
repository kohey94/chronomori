import { Box, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { useTick } from "../hooks/useTick";
import { lifeRemainingMs } from "../utils/life";
import { formatHMS } from "../utils/time";
import { useSettings } from "../context/SettingsContext";

export default function LifeCountdown() {
  const now = useTick(1000);
  const { birthStr, avgYears, displayMode } = useSettings();

  const birth = useMemo(() => (birthStr ? new Date(birthStr) : null), [birthStr]);
  const remainingMs = useMemo(() => {
    if (!birth || isNaN(birth.getTime())) return 0;
    return lifeRemainingMs(birth, avgYears, now);
  }, [birth, avgYears, now]);

  const totalSec = Math.floor(remainingMs / 1000);
  const days = Math.floor(totalSec / 86400);
  const hms = formatHMS((totalSec % 86400) * 1000);

  const isUnset = !birth || isNaN(birth.getTime());
  const formatNumber = (n: number) => new Intl.NumberFormat().format(n);

  return (
    <Box p={6} borderWidth="1px" rounded="2xl" bg="blackAlpha.300">
      <Text fontSize="sm" color="gray.400">
        人生の残り（平均寿命ベース）
      </Text>

      {isUnset ? (
        <Text mt={3} color="whiteAlpha.800">
          生年月日が未設定です。右上のメニューから設定してください。
        </Text>
      ) : displayMode === "hms" ? (
        <Box mt={3}>
          <Text fontSize="4xl" fontWeight="semibold" color="whiteAlpha.900">
            {days} 日
          </Text>
          <Text fontSize="2xl" color="whiteAlpha.800">
            {hms}
          </Text>
        </Box>
      ) : (
        <Box mt={3}>
          <Text fontSize="4xl" fontWeight="semibold" color="whiteAlpha.900">
            {formatNumber(totalSec)}{" "}
            <Text as="span" fontSize="2xl" color="whiteAlpha.700">
              秒
            </Text>
          </Text>
        </Box>
      )}
    </Box>
  );
}
