import { Alert, AlertIcon, Box, Code, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { useLifeTable } from "../hooks/useLifeTable";

export default function LifeTableDebug() {
  const { male, female, ready, error } = useLifeTable();

  if (error) {
    return (
      <Alert status="error" rounded="md">
        <AlertIcon />
        生命表の読み込みに失敗しました: {error}
      </Alert>
    );
  }

  if (!ready) {
    return (
      <Stack direction="row" align="center">
        <Spinner size="sm" />
        <Text color="whiteAlpha.800">生命表を読み込み中…</Text>
      </Stack>
    );
  }

  return (
    <Box mt={4} p={4} borderWidth="1px" rounded="md" bg="blackAlpha.300">
      <Heading size="sm" mb={2} color="whiteAlpha.900">
        LifeTable Debug
      </Heading>
      <Text color="whiteAlpha.800">male rows: {male?.length ?? 0}</Text>
      <Text color="whiteAlpha.800">female rows: {female?.length ?? 0}</Text>

      {/* 先頭3件だけ軽く確認 */}
      <Box mt={3}>
        <Text fontSize="sm" color="whiteAlpha.700">
          male head:
        </Text>
        <Code display="block" whiteSpace="pre" p={2} rounded="md">
          {JSON.stringify(male?.slice(0, 3), null, 2)}
        </Code>
      </Box>
      <Box mt={3}>
        <Text fontSize="sm" color="whiteAlpha.700">
          female head:
        </Text>
        <Code display="block" whiteSpace="pre" p={2} rounded="md">
          {JSON.stringify(female?.slice(0, 3), null, 2)}
        </Code>
      </Box>
    </Box>
  );
}
