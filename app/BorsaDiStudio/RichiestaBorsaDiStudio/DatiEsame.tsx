import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TextInput, Button, Card, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePage from '../../../components/HomePage';

interface Esame {
  materia: string;
  cfu: string;
  data: string;
}

export default function DatiEsamePage() {
  const router = useRouter();

  const [formDatiScolatici, setformDatiScolatici] = useState({
    matricola: '',
    corso: '',
    dipartimento: '',
  });

  const [esami, setEsami] = useState<Esame[]>([{ materia: '', cfu: '', data: '' }]);

  useEffect(() => {
    const loadformDatiScolatici = async () => {
      try {
        const savedformDatiScolatici = await AsyncStorage.getItem('formDatiScolatici');
        if (savedformDatiScolatici) {
          setformDatiScolatici(JSON.parse(savedformDatiScolatici));
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };
    loadformDatiScolatici();
  }, []);

  const handleInputChange = (index: number, field: keyof Esame, value: string) => {
    const updatedEsami = [...esami];
    updatedEsami[index][field] = value;
    setEsami(updatedEsami);
  };

  const handleAddEsame = () => {
    setEsami([...esami, { materia: '', cfu: '', data: '' }]);
  };

  const handleRemoveEsame = (index: number) => {
    const updatedEsami = esami.filter((_, i) => i !== index);
    setEsami(updatedEsami);
  };

  const handleSubmit = async () => {
    try {
      const formData = { ...formDatiScolatici, esami };
      await AsyncStorage.setItem('formDatiEsame', JSON.stringify(formData));
      router.push('/BorsaDiStudio/RichiestaBorsaDiStudio/DatiEsame');
    } catch (error) {
      console.error('Errore nel salvataggio dei dati', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HomePage />
      <Text style={styles.title}>Dati Esame</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.label}>Matricola:</Text>
          <Text style={styles.output}>{formDatiScolatici.matricola}</Text>

          <Text style={styles.label}>Corso:</Text>
          <Text style={styles.output}>{formDatiScolatici.corso}</Text>

          <Text style={styles.label}>Dipartimento:</Text>
          <Text style={styles.output}>{formDatiScolatici.dipartimento}</Text>
        </Card.Content>
      </Card>

      {esami.map((esame, index) => (
        <Card key={index} style={styles.esameCard}>
          <Card.Content>
            <TextInput
              label="Materia"
              value={esame.materia}
              onChangeText={(text) => handleInputChange(index, 'materia', text)}
              mode="outlined"
            />
            <TextInput
              label="CFU"
              value={esame.cfu}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange(index, 'cfu', text)}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Data"
              value={esame.data}
              onChangeText={(text) => handleInputChange(index, 'data', text)}
              mode="outlined"
            />
            <IconButton
              icon="delete"
              iconColor="red"
              size={20}
              onPress={() => handleRemoveEsame(index)}
            />
          </Card.Content>
        </Card>
      ))}

      <Button mode="contained" buttonColor="#005dff" onPress={handleAddEsame} style={styles.addButton}>
        Aggiungi Esame
      </Button>

      <View style={styles.buttonContainer}>
        <Button mode="outlined" textColor="#005dff" onPress={() => router.push('/BorsaDiStudio/RichiestaBorsaDiStudio/DatiScolastici')}>Indietro</Button>
        <Button mode="contained" buttonColor="#005dff" onPress={() => router.push('/BorsaDiStudio/RichiestaBorsaDiStudio/DatiEconomici')}>Successivo</Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0660ff',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
    backgroundColor: 'white',
  },
  esameCard: {
    marginBottom: 15,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  output: {
    fontSize: 16,
    color: '#333',
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 15,
  },
  input: {
    marginBottom: 10,
  },
  addButton: {
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    
  },
});
