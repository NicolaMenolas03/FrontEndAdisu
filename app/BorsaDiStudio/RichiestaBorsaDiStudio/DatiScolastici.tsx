import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Navbar from '@/components/Navbar';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DatiScolasticiPage() {
  const router = useRouter();

  const getAnnoAccademico = () => {
    const currentYear = new Date().getFullYear();
    return `${currentYear}/${currentYear + 1}`;
  };

  const [formDatiScolatici, setformDatiScolatici] = useState({
    matricola: '',
    ateneo: '',
    corso: '',
    dipartimento: '',
    durata: '',
    statoStudente: 'Full Time',
  });

  const updateFormDatiScolatici = (newData: Partial<typeof formDatiScolatici>) => {
    setformDatiScolatici({ ...formDatiScolatici, ...newData });
  };


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

  const handleInputChange = async (field: string, value: string | boolean) => {
    const updatedformDatiScolatici = { ...formDatiScolatici, [field]: value };
    setformDatiScolatici(updatedformDatiScolatici);
    try {
      await AsyncStorage.setItem('formDatiScolatici', JSON.stringify(updatedformDatiScolatici));
    } catch (error) {
      console.error('Failed to save form data', error);
    }
  };

  const handleExit = () => {
    Alert.alert(
      "Conferma Uscita",
      "Sei sicuro di voler uscire senza salvare i dati?",
      [
        {
          text: "Annulla",
          style: "cancel",
        },
        {
          text: "Conferma",
          onPress: () => router.push('/BorsaDiStudio/BorsaDiStudioPage'), // Se conferma, esce e torna alla pagina
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <View style={styles.container}>
      {/* Tasto Esci in alto a destra */}
      <TouchableOpacity
        style={styles.exitButton}
        onPress={handleExit}
      >
        <Text style={styles.exitButtonText}>Esci</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Dati Scolastici</Text>
        
        <Text style={styles.label}>Iscrizione a.a.</Text>
        <Text style={styles.output}>{getAnnoAccademico()}</Text>

        <Text style={styles.label}>Matricola</Text>
        <TextInput
          style={styles.input}
          placeholder="Matricola"
          keyboardType="numeric"
          value={formDatiScolatici.matricola}
          onChangeText={(text) => handleInputChange( 'matricola', text )}
        />
        <Text style={styles.label}>Ateneo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ateneo"
          value={formDatiScolatici.ateneo}
          onChangeText={(text) => handleInputChange( 'ateneo', text )}
        />
        <Text style={styles.label}>Corso</Text>
        <TextInput
          style={styles.input}
          placeholder="Corso"
          value={formDatiScolatici.corso}
          onChangeText={(text) => handleInputChange( 'corso', text )}
        />
        <Text style={styles.label}>Dipartimento</Text>
        <TextInput
          style={styles.input}
          placeholder="Dipartimento"
          value={formDatiScolatici.dipartimento}
          onChangeText={(text) => handleInputChange( 'dipartimento', text )}
        />
        <Text style={styles.label}>Durata legale del corso (1-6)</Text>
        <TextInput
          style={styles.input}
          placeholder="Durata legale del corso (1-6)"
          keyboardType="numeric"
          value={formDatiScolatici.durata}
          onChangeText={(text) => handleInputChange( 'durata', text )}
        />
        
        <Text style={styles.label}>Stato Studente</Text>
        <Picker
          selectedValue={formDatiScolatici.statoStudente}
          style={styles.picker}
          onValueChange={(itemValue: string) => handleInputChange( 'statoStudente', itemValue )}
        >
          <Picker.Item label="Full Time" value="Full Time" />
          <Picker.Item label="Part Time" value="Part Time" />
        </Picker>
        
        <View style={styles.buttonContainer}>
          <Button title="Indietro" onPress={() => router.push("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiAnagrafici")} />
          <Button title="Successivo" onPress={() => router.push("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiEsame")} />
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
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  exitButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#0660ff',
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  exitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});