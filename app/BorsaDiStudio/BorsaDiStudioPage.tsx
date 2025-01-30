import React from 'react';
import { StyleSheet,Text, View, TouchableOpacity, Image } from 'react-native';
import Navbar from '@/components/Navbar';
import { router } from 'expo-router';


export default function BorsaDiStudioPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Dati Borsa di Studio</Text>

      {/* Pulsanti centrali */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.box}  onPress={()=>router.push("/BorsaDiStudio/DatiBorsaDiStudio")}>
          <Text style={styles.boxText}>Dati Borsa di studio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={()=>router.push("/BorsaDiStudio/RichiestaBorsaDiStudio")}>
          <Text style={styles.boxText}>Richiesta Borsa di studio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.box} onPress={()=>router.push("/BorsaDiStudio/SimulazioneBorsaDiStudio")}>
          <Text style={styles.boxText}>Simulazione Borsa di studio</Text>
        </TouchableOpacity>
      </View>



       {/* Barra di navigazione */}
      <Navbar namePage="BorsaDiStudioPage"></Navbar>
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