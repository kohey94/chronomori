import {
  Box,
  Heading,
  HStack,
  IconButton,
  useDisclosure,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import SettingsDrawer from "./SettingsDrawer";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoSize = useBreakpointValue({ base: "24px", md: "32px" });

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

        <IconButton
          aria-label="Open settings"
          icon={<HamburgerIcon />}
          variant="ghost"
          colorScheme="blackAlpha"
          color="blackAlpha.900"
          onClick={onOpen}
        />
      </HStack>

      <SettingsDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}
