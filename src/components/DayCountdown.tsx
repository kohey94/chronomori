import { Box, Text, HStack, VStack } from "@chakra-ui/react";
import { useMemo, useRef } from "react";
import { SECONDS_PER_DAY, diffMs, endOfToday } from "../utils/time";
import DayHMS from "./DayHMS";
import DaySeconds from "./DaySeconds";
import { useSettings } from "../context/SettingsContext";
import DripStage from "./DripStage";
import { useClock } from "../context/ClockContext";

export default function DayCountdown() {
  const { now } = useClock();
  const { displayMode } = useSettings();
  const cardRef = useRef<HTMLDivElement | null>(null);

  const remainingMs = useMemo(() => diffMs(endOfToday(), now), [now]);
  const remainingSec = Math.floor(remainingMs / 1000);

  // 残量（0〜100%）
  const percent = Math.max(0, Math.min(100, (remainingSec / SECONDS_PER_DAY) * 100));

  return (
    <>
      <Box
        ref={cardRef}
        position="relative"
        overflow="hidden"
        p={6}
        borderWidth="2px"
        borderColor="border"
        rounded="2xl"
        bg="card"
        height="200px"
      >
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          height={`${percent}%`}
          bg="gaugeFill"
          transition="height 0.6s linear"
          aria-hidden
        />

        <HStack justify="space-between" w="100%" px={6}>
          <Text fontSize="m" color="text">
            本日の残りの時間
          </Text>
          <Text fontSize="m" color="text" fontWeight="medium">
            {percent.toFixed(1)}%
          </Text>
        </HStack>
        <VStack
          position="relative"
          zIndex={1}
          justify="center"
          align="center"
          height="100%"
          spacing={2}
        >
          {displayMode === "hms" ? (
            <DayHMS remainingMs={remainingMs} />
          ) : (
            <DaySeconds remainingSec={remainingSec} />
          )}
        </VStack>
      </Box>

      <DripStage anchorRef={cardRef} />
    </>
  );
}
