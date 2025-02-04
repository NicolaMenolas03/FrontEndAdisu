import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { TextInput, Button, Card, Switch, HelperText  } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePage from '@/components/HomePage';
import GufoChat from '@/components/Gufochat';

export default function DatiEconomiciPage() {
  const router = useRouter();

  const [formDatiEconomici, setformDatiEconomici] = useState({
    isee: '',
    dataRilascio: '',
    autorizzoINPS: false,
  });

const [errors, setErrors] = useState({
    isee: '',
    dataRilascio: '',
  });
  const validateFields = () => {
    const newErrors = {
      isee: formDatiEconomici.isee ? '' : 'Il campo isee è obbligatorio.',
      dataRilascio: formDatiEconomici.dataRilascio ? '' : 'Il campo dataRilascio è obbligatorio.',
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  const handleNext = () => {
    if (validateFields()) {
      router.push('/BorsaDiStudio/RichiestaBorsaDiStudio/DatiScolastici');
    }
  };

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
      <HomePage />
      <Text style={styles.title}>Dati Economici</Text>

      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="ISEE"
            value={formDatiEconomici.isee}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange('isee', text)}
            mode="outlined"
            style={styles.input}
          />
          {errors.isee ? <HelperText type="error">{errors.isee}</HelperText> : null}
          <TextInput
            label="Data Rilascio ISEE"
            value={formDatiEconomici.dataRilascio}
            onChangeText={(text) => handleInputChange('dataRilascio', text)}
            mode="outlined"
            style={styles.input}
          />
          {errors.dataRilascio ? <HelperText type="error">{errors.dataRilascio}</HelperText> : null}
          <View style={styles.switchContainer}>
            <Text>Autorizzo l'Università a consultare i dati INPS</Text>
            <Switch
              value={formDatiEconomici.autorizzoINPS}
              onValueChange={(value) => handleInputChange('autorizzoINPS', value)}
            />
          </View>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button mode="outlined" textColor="#005dff" onPress={() => router.push('/BorsaDiStudio/RichiestaBorsaDiStudio/DatiEsame')}>
          Indietro
        </Button>
        <Button mode="contained" buttonColor="#005dff" onPress={handleNext}>
          Invia Richiesta
        </Button>
      </View>
    </ScrollView>
    <GufoChat></GufoChat>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
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
  input: {
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
});