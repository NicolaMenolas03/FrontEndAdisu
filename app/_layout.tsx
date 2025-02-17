import LogoAdisuERegione from "@/components/LogoAdisuERegione";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <LogoAdisuERegione>
      <Stack
        screenOptions={{ headerShown: false }}
      >
      </Stack>
    </LogoAdisuERegione>
  );
}
