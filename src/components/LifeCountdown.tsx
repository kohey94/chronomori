import { Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { useClock } from "../context/ClockContext";
import { useSettings } from "../context/SettingsContext";
import { useLifeTable } from "../hooks/useLifeTable";
import { exactAgeYears, yomeiFromTable, yearsToDays } from "../utils/yomei";

export default function LifeCountdown() {
  const { now } = useClock();
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
      <Text fontSize="lg" color="black" textAlign="center">
        生命表を読み込み中…
      </Text>
    );
  }

  if (!birthStr) {
    return (
      <Text fontSize="lg" color="black" textAlign="center">
        生年月日が未設定です。メニューから設定してください。
      </Text>
    );
  }

  if (yomeiYears == null) {
    return (
      <Text fontSize="lg" color="black" textAlign="center">
        余命データが見つかりませんでした。
      </Text>
    );
  }

  return (
    <Text fontSize="lg" color="black" textAlign="center">
      あなたに残された時間: 約 {yomeiYears.toFixed(1)} 年（{yearsToDays(yomeiYears).toFixed(1)} 日）
    </Text>
  );
}
