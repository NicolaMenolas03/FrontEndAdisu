import React from 'react';
import { Stack } from "expo-router";


export default function App() {
  return (
    <Stack>
        <Stack.Screen name="HomePage" />
        <Stack.Screen name="Onboarding" />
        <Stack.Screen name="Login" />
        <Stack.Screen name="Registration"  />
        <Stack.Screen name="Mensa"  />
        <Stack.Screen name="landingPage"/>
        <Stack.Screen name="BorsaDiStudio"  />
        <Stack.Screen name="DatiBorsaDiStudio" />
        <Stack.Screen name="SimulazioneBorsaDiStudio"/>
        <Stack.Screen name="RichiestaBorsaDiStudio"/>
        <Stack.Screen name="DatiAnagrafici"/>
        <Stack.Screen name="DatiResidenza"/>
        <Stack.Screen name="DatiScolastici"/>
      </Stack>
  );
}
