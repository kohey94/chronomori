import { Text } from "@chakra-ui/react";

type Props = {
  remainingSec: number;
  alpha: number;
};

export default function DaySeconds({ remainingSec, alpha }: Props) {
  const formatted = new Intl.NumberFormat().format(remainingSec);
  return (
    <Text
      fontSize="6xl"
      fontWeight="semibold"
      lineHeight="1"
      mt={1}
      color={`rgba(255,255,255,${alpha})`}
    >
      {formatted}
    </Text>
  );
}
