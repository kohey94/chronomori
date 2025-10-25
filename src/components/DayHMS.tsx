import { Text } from "@chakra-ui/react";
import { formatHMS } from "../utils/time";

type Props = {
  remainingMs: number;
};

export default function DayHMS({ remainingMs }: Props) {
  return (
    <Text fontSize="6xl" fontWeight="semibold" lineHeight="1" mt={1} color="text">
      {formatHMS(remainingMs)}
    </Text>
  );
}
