import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TextInput, Button, Card, IconButton } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePage from '../../../components/HomePage';
import GufoChat from '@/components/Gufochat';

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

  const [errori, setErrori] = useState<{ materia?: string; cfu?: string; data?: string }[]>([]);

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

    const newErrori = [...errori];
    newErrori.splice(index, 1);
    setErrori(newErrori);
  };

  const handleAddEsame = () => {
    setEsami([...esami, { materia: '', cfu: '', data: '' }]);
    setErrori([...errori, { materia: '', cfu: '', data: '' }]);
  };

  const handleRemoveEsame = (index: number) => {
    const updatedEsami = esami.filter((_, i) => i !== index);
    setEsami(updatedEsami);

    const updatedErrori = errori.filter((_, i) => i !== index);
    setErrori(updatedErrori);
  };

  const handleSubmit = async () => {
    try {
      if (validaEsami()) {
        const formData = { ...formDatiScolatici, esami };
        await AsyncStorage.setItem('formDatiEsame', JSON.stringify(formData));
        router.push('/BorsaDiStudio/RichiestaBorsaDiStudio/DatiEconomici');
      }
    } catch (error) {
      console.error('Errore nel salvataggio dei dati', error);
    }
  };

  const validaEsami = (): boolean => {
    let nuoviErrori: { materia?: string; cfu?: string; data?: string }[] = [];
    let valido = true; // Assume che sia valido all'inizio

    esami.forEach((esame, index) => {
      let erroriEsame: { materia?: string; cfu?: string; data?: string } = {};

      if (!esame.materia.trim()) {
        erroriEsame.materia = 'La materia è obbligatoria';
        valido = false;
      }

      const cfuNumero = parseInt(esame.cfu, 10);
      if (!esame.cfu.trim()) {
        erroriEsame.cfu = 'I CFU sono obbligatori';
        valido = false;
      } else if (isNaN(cfuNumero) || cfuNumero <= 0) {
        erroriEsame.cfu = 'Inserisci un numero valido di CFU';
        valido = false;
      } else if (cfuNumero > 12 || cfuNumero < 2) {
        erroriEsame.cfu = 'I CFU non possono superare 12';
        valido = false;
      }

      if (!esame.data.trim()) {
        erroriEsame.data = 'La data è obbligatoria';
        valido = false;
      }

      nuoviErrori[index] = erroriEsame;
    });

    setErrori(nuoviErrori); // Aggiorna gli errori nello stato

    return valido; // Restituisce true se tutto è valido, false altrimenti
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
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
                error={!!errori[index]?.materia}
              />
              {errori[index]?.materia && <Text>{errori[index]?.materia}</Text>}

              <TextInput
                label="CFU"
                value={esame.cfu}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange(index, 'cfu', text)}
                mode="outlined"
                error={!!errori[index]?.cfu}
                style={styles.input}
              />
              {errori[index]?.cfu && <Text>{errori[index]?.cfu}</Text>}

              <TextInput
                label="Data"
                value={esame.data}
                onChangeText={(text) => handleInputChange(index, 'data', text)}
                mode="outlined"
                error={!!errori[index]?.data}
              />
              {errori[index]?.data && <Text>{errori[index]?.data}</Text>}

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
          <Button mode="contained" buttonColor="#005dff" onPress={handleSubmit}>Successivo</Button>
        </View>
      </ScrollView>
      <GufoChat />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
    marginBottom: '35%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
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
  gufoChat: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
