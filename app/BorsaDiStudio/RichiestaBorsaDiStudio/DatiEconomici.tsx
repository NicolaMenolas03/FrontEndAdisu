import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button, Switch } from 'react-native';
import Navbar from '@/components/Navbar';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DatiEconomiciPage() {
  const router = useRouter();
  
  const [formDatiEconomici, setformDatiEconomici] = useState({
    isee: '',
    dataRilascio: '',
    autorizzoINPS: false,
  });

  useEffect(() => {
    const loadformDatiEconomici = async () => {
      try {
        const savedformDatiEconomici = await AsyncStorage.getItem('formDatiEconomici');
        if (savedformDatiEconomici) {
          setformDatiEconomici(JSON.parse(savedformDatiEconomici));
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    loadformDatiEconomici();
  }, []);

  const handleInputChange = async (field: string, value: string | boolean) => {
    const updatedformDatiEconomici = { ...formDatiEconomici, [field]: value };
    setformDatiEconomici(updatedformDatiEconomici);
    try {
      await AsyncStorage.setItem('formDatiEconomici', JSON.stringify(updatedformDatiEconomici));
    } catch (error) {
      console.error('Failed to save form data', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Dati Economici</Text>

        <Text style={styles.label}>ISEE</Text>
        <TextInput
          style={styles.input}
          placeholder="Codice ISEE"
          value={formDatiEconomici.isee}
          onChangeText={(text) => handleInputChange('isee', text)}
        />

        <Text style={styles.label}>Data Rilascio ISEE</Text>
        <TextInput
          style={styles.input}
          placeholder="Data Rilascio"
          value={formDatiEconomici.dataRilascio}
          onChangeText={(text) => handleInputChange('dataRilascio', text)}
        />

        <Text style={styles.label}>Autorizzo l'Università degli Studi di Bari all'acquisizione dei dati ISEE dalla banca dati dell'INPS</Text>
        <View style={styles.switchContainer}>
          <Text>Sì</Text>
          <Switch
            value={formDatiEconomici.autorizzoINPS}
            onValueChange={(value) => handleInputChange('autorizzoINPS', value)}
          />
          <Text>No</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Indietro" onPress={() => router.push("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiResidenza")} />
          <Button title="Successivo" onPress={() => router.push("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiScolastici")} />
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});