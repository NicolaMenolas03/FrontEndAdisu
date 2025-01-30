import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TextInput, Button, Card, HelperText } from 'react-native-paper';
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

  const [errors, setErrors] = useState({
    nome: '',
    cognome: '',
    sesso: '',
    etaNascita: '',
    cittadinanza: '',
  });

  const validateFields = () => {
    const newErrors = {
      nome: formDatiAnagrafici.nome ? '' : 'Il campo Nome è obbligatorio.',
      cognome: formDatiAnagrafici.cognome ? '' : 'Il campo Cognome è obbligatorio.',
      sesso: formDatiAnagrafici.sesso ? '' : 'Il campo Sesso è obbligatorio.',
      etaNascita: formDatiAnagrafici.etaNascita.match(/^\d+$/) ? '' : 'Inserire una età valida (numerica).',
      cittadinanza: formDatiAnagrafici.cittadinanza ? '' : 'Il campo Cittadinanza è obbligatorio.',
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

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

  const handleInputChange = async (field: string, value: string) => {
    const updatedData = { ...formDatiAnagrafici, [field]: value };
    setformDatiAnagrafici(updatedData);
    try {
      await AsyncStorage.setItem('formDatiAnagrafici', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Errore nel salvataggio dei dati', error);
    }
  };

  const handleNext = () => {
    if (validateFields()) {
      router.push('/BorsaDiStudio/RichiestaBorsaDiStudio/DatiResidenza');
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
          {errors.nome ? <HelperText type="error">{errors.nome}</HelperText> : null}

          <TextInput
            label="Cognome"
            value={formDatiAnagrafici.cognome}
            onChangeText={(text) => handleInputChange('cognome', text)}
            mode="outlined"
            style={styles.input}
          />
          {errors.cognome ? <HelperText type="error">{errors.cognome}</HelperText> : null}

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
          {errors.sesso ? <HelperText type="error">{errors.sesso}</HelperText> : null}

          <TextInput
            label="Età di Nascita"
            value={formDatiAnagrafici.etaNascita}
            onChangeText={(text) => handleInputChange('etaNascita', text)}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />
          {errors.etaNascita ? <HelperText type="error">{errors.etaNascita}</HelperText> : null}

          <TextInput
            label="Cittadinanza"
            value={formDatiAnagrafici.cittadinanza}
            onChangeText={(text) => handleInputChange('cittadinanza', text)}
            mode="outlined"
            style={styles.input}
          />
          {errors.cittadinanza ? <HelperText type="error">{errors.cittadinanza}</HelperText> : null}
        </Card.Content>
      </Card>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          buttonColor="#005dff"
          onPress={handleNext}
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
  label: {
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