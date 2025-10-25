import { Text } from "@chakra-ui/react";
import { formatHMS } from "../utils/time";

type Props = {
  remainingMs: number;
  alpha: number;
};

export default function DayHMS({ remainingMs, alpha }: Props) {
  return (
    <Text
      fontSize="6xl"
      fontWeight="semibold"
      lineHeight="1"
      mt={1}
      color={`rgba(255,255,255,${alpha})`}
    >
      {formatHMS(remainingMs)}
    </Text>
  );
}
