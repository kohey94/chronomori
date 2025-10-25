import { Tabs, TabList, Tab } from "@chakra-ui/react";

type Option = { value: string; label: string };

type Props = {
  value: string;
  onChange: (val: string) => void;
  options: Option[];
  ariaLabel?: string;
};

export default function SegmentedTabs({ value, onChange, options, ariaLabel }: Props) {
  const index = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );

  return (
    <Tabs
      index={index}
      onChange={(i) => onChange(options[i].value)}
      variant="soft-rounded"
      colorScheme="whiteAlpha"
      size="sm"
      isFitted={false}
      aria-label={ariaLabel}
    >
      <TabList bg="whiteAlpha.200" p="2px" rounded="full" w="fit-content">
        {options.map((opt) => (
          <Tab key={opt.value} _selected={{ bg: "whiteAlpha.700", color: "black" }}>
            {opt.label}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
}
