import React from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Navbar from '@/components/Navbar';

type RootStackParamList = {
  LandingPage: undefined;
  DatiBorsaDiStudio: undefined;
  SimulazioneBorsaDiStudio: undefined;
};

export default function BorsaDiStudioPage() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
   

    const navigateToSimulazioneBorsaDiStudio = () => {
      navigation.navigate('SimulazioneBorsaDiStudio');
    }
    const navigateToDatiBorsaDiStudio = () => {
      navigation.navigate('DatiBorsaDiStudio');
      console.log(navigation);
    };
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Dati Borsa di Studio</Text>
      {/* Icona profilo in alto a destra */}
      <TouchableOpacity style={styles.profileButton} onPress={navigateToDatiBorsaDiStudio}>
        <Image
          source={{ uri: 'https://via.placeholder.com/40' }} // Sostituisci con il link della tua immagine profilo
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {/* Pulsanti centrali */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.box}  onPress={navigateToDatiBorsaDiStudio}>
          <Text style={styles.boxText}>Dati Borsa di studio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={navigateToSimulazioneBorsaDiStudio}>
          <Text style={styles.boxText}>Richiesta Borsa di studio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={navigateToSimulazioneBorsaDiStudio}>
          <Text style={styles.boxText}>Simulazione Borsa di studio</Text>
        </TouchableOpacity>
      </View>



       {/* Barra di navigazione */}
      <Navbar></Navbar>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0660ff',
    marginBottom: 20,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileButton: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0660ff',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  box: {
    width: '140%',
    height: 120,
    backgroundColor: '#0660ff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  boxText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});