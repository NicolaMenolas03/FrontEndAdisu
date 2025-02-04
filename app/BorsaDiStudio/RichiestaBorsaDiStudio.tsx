import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Navbar from '@/components/Navbar';
import { useRouter } from 'expo-router';
import TornaIndietro from '@/components/TornaIndietro';

export default function BorseDiStudioChoicePage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TornaIndietro />
      <Text style={styles.sectionTitle}>Scegli il Tipo di Borsa di Studio</Text>

      {/* Scelte */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => router.push('/BorsaDiStudio/RichiestaBorsaDiStudio/DatiAnagrafici')}
        >
          <Text style={styles.boxText}>Borsa di Studio per ISEE Basso</Text>
        </TouchableOpacity>

        <View style={[styles.box, styles.disabledBox]}>
          <Text style={styles.boxText}>Borsa di Studio per Merito</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'Black',
    marginBottom: 20,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
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
  disabledBox: {
    backgroundColor: '#b0b0b0', // Colore disabilitato
  },
});
