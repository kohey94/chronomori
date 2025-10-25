import { Text } from "@chakra-ui/react";

type Props = {
  remainingSec: number;
};

export default function DaySeconds({ remainingSec }: Props) {
  return (
    <Text fontSize="6xl" fontWeight="semibold" lineHeight="1" mt={1} color="text">
      {remainingSec}
    </Text>
  );
}
