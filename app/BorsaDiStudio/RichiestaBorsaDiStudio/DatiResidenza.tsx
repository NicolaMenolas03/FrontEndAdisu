import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';
import Navbar from '@/components/Navbar';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DatiResidenzaPage() {
  const router = useRouter();
  
  const [formDatiResidenza, setformDatiResidenza] = useState({
    provincia: '',
    comune: '',
    indirizzo: '',
    cap: ''
  });

  useEffect(() => {
    const loadformDatiResidenza = async () => {
      try {
        const savedformDatiResidenza = await AsyncStorage.getItem('formDatiResidenza');
        if (savedformDatiResidenza) {
          setformDatiResidenza(JSON.parse(savedformDatiResidenza));
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    loadformDatiResidenza();
  }, []);

  const handleInputChange = async (field: string, value: string | boolean) => {
    const updatedformDatiResidenza = { ...formDatiResidenza, [field]: value };
    setformDatiResidenza(updatedformDatiResidenza);
    try {
      await AsyncStorage.setItem('formDatiResidenza', JSON.stringify(updatedformDatiResidenza));
    } catch (error) {
      console.error('Failed to save form data', error);
    }
  };

  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Dati di Residenza</Text>

        <Text style={styles.label}>Provincia</Text>
        <TextInput
        style={styles.input}
        placeholder="Provincia"
        value={formDatiResidenza.provincia}
        onChangeText={(text) => handleInputChange('provincia', text)}
      />
      <Text style={styles.label}>Comune</Text>
      <TextInput
        style={styles.input}
        placeholder="Comune"
        value={formDatiResidenza.comune}
        onChangeText={(text) => handleInputChange('comune', text)}
      />
      <Text style={styles.label}>Indirizzo</Text>
      <TextInput
        style={styles.input}
        placeholder="Indirizzo"
        value={formDatiResidenza.indirizzo}
        onChangeText={(text) => handleInputChange('indirizzo', text)}
      />
      <Text style={styles.label}>CAP</Text>
      <TextInput
        style={styles.input}
        placeholder="CAP"
        value={formDatiResidenza.cap}
        onChangeText={(text) => handleInputChange('cap', text)}
      />

        <View style={styles.buttonContainer}>
          <Button title="Indietro" onPress={()=>router.push("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiAnagrafici")} />
          <Button title="Successivo" onPress={()=>router.push("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiScolastici")} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0660ff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
