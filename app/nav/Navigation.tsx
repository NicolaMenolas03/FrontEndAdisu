import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Contenitore principale della navigazione.
import { createStackNavigator } from '@react-navigation/stack'; // Stack Navigator.
import HomeScreen from '../(tabs)/landingPage'; // Import HomeScreen component
import BorsaDiStudio from '../(tabs)/BorsaDiStudioPage'; // Import BorsaDiStudio component
import DatiBorsaDiStudio from '../(tabs)/DatiBorsaDiStudio'; // Import DatiBorsaDiStudio component
import SimulazioneBorsaDiStudio from '../(tabs)/SimulazioneBorsaDiStudio'; // Import SimulazioneBorsaDiStudio component
import LoginScreen from '../(user)/login'; // Import SimulazioneBorsaDiStudio component
import Registration from '../(user)/Registration'; // Import SimulazioneBorsaDiStudio component
import HomePage from '../(user)/HomePage'; // Import HomePage component

type RootStackParamList = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  BorsaDiStudio: undefined;
  DatiBorsaDiStudio: undefined;
  SimulazioneBorsaDiStudio: undefined;
  Registration: undefined;
  HomePage: undefined;
};

const Stack = createStackNavigator<RootStackParamList>(); // Definizione dello stack con tipi.

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="BorsaDiStudio" component={BorsaDiStudio} />
        <Stack.Screen name="DatiBorsaDiStudio" component={DatiBorsaDiStudio} />
        <Stack.Screen name="SimulazioneBorsaDiStudio" component={SimulazioneBorsaDiStudio} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Registration" component={Registration} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
