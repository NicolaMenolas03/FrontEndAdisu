import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button, FlatList } from 'react-native';
import Navbar from '@/components/Navbar';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      console.log('Dati esame salvati');
      router.push('/BorsaDiStudio/RichiestaBorsaDiStudio/DatiEsame'); // O la pagina finale
    } catch (error) {
      console.error('Errore nel salvataggio dei dati', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Dati Esame</Text>

        <Text style={styles.label}>Matricola</Text>
        <Text style={styles.output}>{formDatiScolatici.matricola}</Text>

        <Text style={styles.label}>Corso</Text>
        <Text style={styles.output}>{formDatiScolatici.corso}</Text>

        <Text style={styles.label}>Dipartimento</Text>
        <Text style={styles.output}>{formDatiScolatici.dipartimento}</Text>

        <Text style={styles.label}>Esami Universitari</Text>

        <FlatList
          data={esami}
          renderItem={({ item, index }) => (
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                placeholder="Materia"
                value={item.materia}
                onChangeText={(text) => handleInputChange(index, 'materia', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="CFU"
                value={item.cfu}
                keyboardType="numeric"
                onChangeText={(text) => handleInputChange(index, 'cfu', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Data"
                value={item.data}
                onChangeText={(text) => handleInputChange(index, 'data', text)}
              />
              <Button title="Rimuovi" onPress={() => handleRemoveEsame(index)} />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <Button title="Aggiungi Esame" onPress={handleAddEsame} />

        <View style={styles.buttonContainer}>
          <Button title="Indietro" onPress={() => router.push("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiScolastici")} />
          <Button title="Successivo" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  output: {
    fontSize: 16,
    color: '#333',
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    marginBottom: 15,
  },
  input: {
    width: '30%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
