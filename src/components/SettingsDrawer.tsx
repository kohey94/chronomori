import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react";
import { useSettings } from "../context/SettingsContext";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingsDrawer({ isOpen, onClose }: Props) {
  const { displayMode, setDisplayMode, birthStr, setBirthStr, avgYears, setAvgYears } =
    useSettings();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent bg="gray.800" color="whiteAlpha.900">
        <DrawerCloseButton />
        <DrawerHeader>Settings</DrawerHeader>
        <DrawerBody>
          <Stack spacing={5}>
            <Text color="whiteAlpha.700" fontSize="sm">
              Chronomori is a clock that contemplates death.
            </Text>

            {/* 表示モード */}
            <FormControl>
              <FormLabel fontSize="sm" color="whiteAlpha.800">
                表示モード
              </FormLabel>
              <Tabs
                index={displayMode === "hms" ? 0 : 1}
                onChange={(i) => setDisplayMode(i === 0 ? "hms" : "sec")}
                variant="soft-rounded"
                colorScheme="whiteAlpha"
                size="sm"
              >
                <TabList bg="whiteAlpha.200" p="2px" rounded="full" w="fit-content">
                  <Tab _selected={{ bg: "whiteAlpha.700", color: "black" }}>hms</Tab>
                  <Tab _selected={{ bg: "whiteAlpha.700", color: "black" }}>sec</Tab>
                </TabList>
              </Tabs>
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" color="whiteAlpha.800">
                生年月日
              </FormLabel>
              <Input
                type="date"
                value={birthStr}
                onChange={(e) => setBirthStr(e.target.value)}
                bg="blackAlpha.400"
                borderColor="whiteAlpha.300"
              />
            </FormControl>

            <FormControl>
              <FormLabel fontSize="sm" color="whiteAlpha.800">
                平均寿命（年）
              </FormLabel>
              <NumberInput
                value={avgYears}
                min={1}
                max={130}
                onChange={(_, n) => setAvgYears(Number.isFinite(n) ? n : avgYears)}
              >
                <NumberInputField bg="blackAlpha.400" borderColor="whiteAlpha.300" />
              </NumberInput>
            </FormControl>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
