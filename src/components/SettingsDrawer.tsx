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
} from "@chakra-ui/react";
import { useSettings } from "../context/SettingsContext";
import SegmentedTabs from "./SegmentedTabs";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingsDrawer({ isOpen, onClose }: Props) {
  const {
    displayMode,
    setDisplayMode,
    birthStr,
    setBirthStr,
    avgYears,
    setAvgYears,
    gender,
    setGender,
  } = useSettings();

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
      <DrawerOverlay />
      <DrawerContent bg="gray.800" color="whiteAlpha.900">
        <DrawerCloseButton />
        <DrawerHeader>Settings</DrawerHeader>
        <DrawerBody>
          <Stack spacing={5}>
            {/* 生年月日 */}
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

            {/* 性別 */}
            <FormControl>
              <FormLabel fontSize="sm" color="whiteAlpha.800">
                性別
              </FormLabel>
              <SegmentedTabs
                ariaLabel="性別の選択"
                value={gender}
                onChange={(v) => setGender(v as "male" | "female")}
                options={[
                  { value: "male", label: "男" },
                  { value: "female", label: "女" },
                ]}
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

            {/* 表示モード */}
            <FormControl>
              <FormLabel fontSize="sm" color="whiteAlpha.800">
                表示モード
              </FormLabel>
              <SegmentedTabs
                ariaLabel="表示モードの切り替え"
                value={displayMode}
                onChange={(v) => setDisplayMode(v as "hms" | "sec")}
                options={[
                  { value: "hms", label: "hms" },
                  { value: "sec", label: "sec" },
                ]}
              />
            </FormControl>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
