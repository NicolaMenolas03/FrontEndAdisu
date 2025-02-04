import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Navbar from '@/components/Navbar';
import Tornaindietro from '@/components/TornaIndietro';
import { useRouter } from 'expo-router';


export default function BorsaDiStudioPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Tornaindietro />
      <Text style={styles.title}>Borsa di Studio</Text>

      {/* Pulsanti centrali */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/BorsaDiStudio/DatiBorsaDiStudio")}>
          <Text style={styles.buttonText}>Dati Borsa di Studio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiAnagrafici")}>
          <Text style={styles.buttonText}>Richiesta Borsa di Studio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/BorsaDiStudio/SimulazioneBorsaDiStudio")}>
          <Text style={styles.buttonText}>Simulazione Borsa di Studio</Text>
        </TouchableOpacity>
      </View>

      {/* Barra di navigazione */}
      <Navbar namePage="BorsaDiStudioPage" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    padding: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'Black',
    textAlign: 'center',
    marginBottom: 0, // 20
  },
  buttonContainer: {
    padding: 20,
    gap: 15,
  },
  button: {
    backgroundColor: '#005dff',
    paddingVertical: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});