import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Contenitore principale della navigazione.
import { createStackNavigator } from '@react-navigation/stack'; // Stack Navigator.
import landingPage from '../(tabs)/landingPage'; // Import landingPage component
import BorsaDiStudio from '../(tabs)/BorsaDiStudioPage'; // Import BorsaDiStudio component
import DatiBorsaDiStudio from '../(tabs)/DatiBorsaDiStudio'; // Import DatiBorsaDiStudio component
import SimulazioneBorsaDiStudio from '../(tabs)/SimulazioneBorsaDiStudio'; // Import SimulazioneBorsaDiStudio component
import LoginScreen from '../(user)/login'; // Import SimulazioneBorsaDiStudio component
import Registration from '../(user)/Registration'; // Import SimulazioneBorsaDiStudio component
import HomePage from '../(user)/HomePage'; // Import HomePage component
import Mensa from '../(tabs)/Mensa'; // Import HomePage component


type RootStackParamList = {
  landingPage: undefined;
  LoginScreen: undefined;
  BorsaDiStudio: undefined;
  DatiBorsaDiStudio: undefined;
  SimulazioneBorsaDiStudio: undefined;
  Registration: undefined;
  HomePage: undefined;
  Mensa: undefined;
};

const Stack = createStackNavigator<RootStackParamList>(); // Definizione dello stack con tipi.

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="landingPage">
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="Mensa" component={Mensa} />
        <Stack.Screen name="landingPage" component={landingPage} />
        <Stack.Screen name="BorsaDiStudio" component={BorsaDiStudio} />
        <Stack.Screen name="DatiBorsaDiStudio" component={DatiBorsaDiStudio} />
        <Stack.Screen name="SimulazioneBorsaDiStudio" component={SimulazioneBorsaDiStudio} />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
