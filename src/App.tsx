import { Container, Stack } from "@chakra-ui/react";
import Header from "./components/Header";
import DayCountdown from "./components/DayCountdown";
import LifeCountdown from "./components/LifeCountdown";
import LifeTableDebug from "./components/LifeTableDebug";

export default function App() {
  return (
    <Container maxW="container.md" py={4}>
      <Header />
      <Stack spacing={6} mt={2}>
        <DayCountdown />
        <LifeCountdown />
        <LifeTableDebug />
      </Stack>
    </Container>
  );
}
