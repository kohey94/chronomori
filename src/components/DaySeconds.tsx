import { Text } from "@chakra-ui/react";

type Props = {
  remainingSec: number;
  alpha: number;
};

export default function DaySeconds({ remainingSec, alpha }: Props) {
  return (
    <Text
      fontSize="6xl"
      fontWeight="semibold"
      lineHeight="1"
      mt={1}
      color={`rgba(255,255,255,${alpha})`}
    >
      {remainingSec} 秒
    </Text>
  );
}
