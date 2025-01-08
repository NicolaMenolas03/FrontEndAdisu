import LogoAdisuERegione from "@/context/logoAdisuERegione";
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
