import {
  Box,
  Heading,
  HStack,
  IconButton,
  useDisclosure,
  Image,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import SettingsDrawer from "./SettingsDrawer";
import { useToday } from "../hooks/useToday";
import { useMemo } from "react";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoSize = useBreakpointValue({ base: "24px", md: "32px" });

  const today = useToday();

  const formattedDate = useMemo(() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    const wd = days[today.getDay()];
    return `${y}/${m}/${d} (${wd})`;
  }, [today]);

  return (
    <Box as="header" py={6}>
      <HStack justify="space-between" align="start">
        <HStack spacing={3}>
          <Image
            src="/chronomori_icon_light.png"
            alt="Chronomori Logo"
            height={logoSize}
            width={logoSize}
            borderRadius="md"
          />
          <Box>
            <Heading size="lg" color="black">
              Chronomori
            </Heading>
          </Box>
        </HStack>

        <HStack spacing={4}>
          <Text fontSize="md" color="black">
            {formattedDate}
          </Text>
          <IconButton
            aria-label="Open settings"
            icon={<HamburgerIcon />}
            variant="ghost"
            colorScheme="blackAlpha"
            color="blackAlpha.900"
            onClick={onOpen}
          />
        </HStack>
      </HStack>
      <SettingsDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
