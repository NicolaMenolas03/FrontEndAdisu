import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePage from '@/components/HomePage';

export default function DatiAnagraficiPage() {
  const router = useRouter();

  const [formDatiAnagrafici, setformDatiAnagrafici] = useState({
    nome: '',
    cognome: '',
    sesso: '',
    etaNascita: '',
    cittadinanza: '',
    disabilita: false,
  });

  useEffect(() => {
    const loadformDatiAnagrafici = async () => {
      try {
        const savedData = await AsyncStorage.getItem('formDatiAnagrafici');
        if (savedData) {
          setformDatiAnagrafici(JSON.parse(savedData));
        }
      } catch (error) {
        console.error('Errore nel caricamento dei dati', error);
      }
    };

    loadformDatiAnagrafici();
  }, []);

  const handleInputChange = async (field: string, value: any) => {
    const updatedData = { ...formDatiAnagrafici, [field]: value };
    setformDatiAnagrafici(updatedData);
    try {
      await AsyncStorage.setItem('formDatiAnagrafici', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Errore nel salvataggio dei dati', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HomePage />
      <Text style={styles.title}>Dati Anagrafici</Text>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Nome"
            value={formDatiAnagrafici.nome}
            onChangeText={(text) => handleInputChange('nome', text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Cognome"
            value={formDatiAnagrafici.cognome}
            onChangeText={(text) => handleInputChange('cognome', text)}
            mode="outlined"
            style={styles.input}
          />
          <Text style={styles.label}>Sesso</Text>
          <Picker
            selectedValue={formDatiAnagrafici.sesso}
            onValueChange={(itemValue) => handleInputChange('sesso', itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Seleziona Sesso" value="" />
            <Picker.Item label="Maschio" value="Maschio" />
            <Picker.Item label="Femmina" value="Femmina" />
            <Picker.Item label="Altro" value="Altro" />
          </Picker>
          <TextInput
            label="Età di Nascita"
            value={formDatiAnagrafici.etaNascita}
            onChangeText={(text) => handleInputChange('etaNascita', text)}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            label="Cittadinanza"
            value={formDatiAnagrafici.cittadinanza}
            onChangeText={(text) => handleInputChange('cittadinanza', text)}
            mode="outlined"
            style={styles.input}
          />
        </Card.Content>
      </Card>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          buttonColor="#005dff"
          onPress={() => router.push('/BorsaDiStudio/RichiestaBorsaDiStudio/DatiResidenza')}
        >
          Successivo
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label:{
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0660ff',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  picker: {
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
});