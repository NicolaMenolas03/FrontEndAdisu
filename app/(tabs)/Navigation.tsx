import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Contenitore principale della navigazione.
import { createStackNavigator } from '@react-navigation/stack'; // Stack Navigator.
import HomeScreen from './landingPage'; // Import HomeScreen component
import BorsaDiStudio from './BorsaDiStudioPage'; // Import BorsaDiStudio component
import DatiBorsaDiStudio from './DatiBorsaDiStudio'; // Import DatiBorsaDiStudio component
import SimulazioneBorsaDiStudio from './SimulazioneBorsaDiStudio'; // Import SimulazioneBorsaDiStudio component


type RootStackParamList = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  BorsaDiStudio: undefined;
  DatiBorsaDiStudio: undefined;
  SimulazioneBorsaDiStudio: undefined;
};

const Stack = createStackNavigator<RootStackParamList>(); // Definizione dello stack con tipi.

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="BorsaDiStudio" component={BorsaDiStudio} />
        <Stack.Screen name="DatiBorsaDiStudio" component={DatiBorsaDiStudio} />
        <Stack.Screen name="SimulazioneBorsaDiStudio" component={SimulazioneBorsaDiStudio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
