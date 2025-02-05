import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
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
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.topbar}>
                  <HomePage />
                  <Text style={styles.title}>Dati Esami</Text>
                </View>
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
                style={styles.input}
                theme={{ colors: { primary: '#007BFF' } }}
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
                theme={{ colors: { primary: '#007BFF' } }}
              />
              {errori[index]?.cfu && <Text>{errori[index]?.cfu}</Text>}

              <TextInput
                label="Data"
                value={esame.data}
                onChangeText={(text) => handleInputChange(index, 'data', text)}
                mode="outlined"
                style={styles.input}
                theme={{ colors: { primary: '#007BFF' } }}
                error={!!errori[index]?.data}
              />
              {errori[index]?.data && <Text>{errori[index]?.data}</Text>}

              <IconButton
                icon="delete"
                iconColor="#990000"
                size={30}
                onPress={() => handleRemoveEsame(index)}
                style={{ alignSelf: 'flex-end' }}
              />
            </Card.Content>
          </Card>
        ))}
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.boxadd} onPress={handleAddEsame}>
                            <Text style={styles.buttonText}>Aggiungi Esame</Text>
                          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
                          <TouchableOpacity
                            style={styles.boxindietro}
                            onPress={() => router.push('/BorsaDiStudio/RichiestaBorsaDiStudio/DatiScolastici')}
                          >
                            <Text style={styles.buttonTextindietro}>Indietro</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={styles.box} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Successivo</Text>
                          </TouchableOpacity>
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
    marginStart: 90,
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
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  boxadd: {
    backgroundColor: '#007FFF',
    padding: 10,
    borderRadius: 10,
    width: 330,
    alignItems: 'center',
    marginTop: 10,
  },
  box: {
    backgroundColor: '#007FFF',
    padding: 10,
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
    marginTop: 10,
  },
  boxindietro: { 
    backgroundColor: 'white', 
    padding: 10, 
    borderRadius: 10, 
    width: 150, 
    alignItems: 'center', 
    marginTop: 10, 
    color: '#007FFF',
    borderColor: '#007FFF',
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: 'white',
  },
  buttonTextindietro: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#007FFF',
  },
  picker: {
    height: 50,
    borderColor: '#87828b',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
});
