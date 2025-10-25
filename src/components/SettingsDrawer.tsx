import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSettings } from "../context/SettingsContext";
import SegmentedTabs from "./SegmentedTabs";
import { useColorMode } from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SettingsDrawer({ isOpen, onClose }: Props) {
  const { displayMode, setDisplayMode, birthStr, setBirthStr, gender, setGender } = useSettings();
  const { colorMode, toggleColorMode } = useColorMode();

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
                sx={{
                  "::-webkit-calendar-picker-indicator": {
                    filter: "brightness(0) invert(1)", // 常に白く表示
                    opacity: 0.9,
                    cursor: "pointer",
                  },
                }}
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

            {/* 表示モード */}
            <FormControl>
              <FormLabel fontSize="sm" color="whiteAlpha.800">
                時間表示
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

            {/* ダークモード切替 */}
            <FormControl>
              <FormLabel fontSize="sm" color="whiteAlpha.800">
                画面表示
              </FormLabel>
              <SegmentedTabs
                ariaLabel="カラーモードの切り替え"
                value={colorMode}
                onChange={(v) => {
                  if (v !== colorMode) toggleColorMode();
                }}
                options={[
                  { value: "light", label: "ライト" },
                  { value: "dark", label: "ダーク" },
                ]}
              />
            </FormControl>
          </Stack>
        </DrawerBody>
        <DrawerFooter flexDirection="column" alignItems="center" pb={4}>
          <Text fontSize="xs" color="whiteAlpha.600">
            © 2025 Chronomori
          </Text>
          <Text fontSize="xs" color="whiteAlpha.500">
            v1.0.0
          </Text>
          <a
            href="https://github.com/kohey94/chronomori"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}
          >
            View on GitHub
          </a>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
