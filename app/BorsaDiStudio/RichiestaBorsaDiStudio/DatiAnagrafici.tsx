import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,Switch} from 'react-native';
import { TextInput, Button, Card, HelperText } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePage from '@/components/HomePage';
import GufoChat from '@/components/Gufochat';

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
      etaNascita: formDatiAnagrafici.etaNascita ? '' : 'Inserire una età valida (numerica).',
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

  const handleInputChange = async (field: string, value: string | boolean) => {
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
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <HomePage />
      <Text style={styles.title}>Dati Anagrafici</Text>
      <Card style={styles.card}>
        <Card.Content>
        <Text style={styles.label}>Intestazione</Text>
          <TextInput
            label="Nome"
            value={formDatiAnagrafici.nome}
            onChangeText={(text) => handleInputChange('nome', text)}
            mode="outlined"
            style={styles.input}
            theme={{ colors: { primary: '#007BFF' } }}
          />
          {errors.nome ? <HelperText type="error">{errors.nome}</HelperText> : null}

          <TextInput
            label="Cognome"
            value={formDatiAnagrafici.cognome}
            onChangeText={(text) => handleInputChange('cognome', text)}
            mode="outlined"
            style={styles.input}
            theme={{ colors: { primary: '#007BFF' } }}
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
            label="Data di Nascita (GG/MM/AAAA)"
            value={formDatiAnagrafici.etaNascita}
            onChangeText={(text) => handleInputChange('etaNascita', text)}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
            theme={{ colors: { primary: '#007BFF' } }}
          />
          {errors.etaNascita ? <HelperText type="error">{errors.etaNascita}</HelperText> : null}

          <Text style={styles.label}>Cittadinanza</Text>
          <Picker
            selectedValue={formDatiAnagrafici.cittadinanza}
            onValueChange={(itemValue) => handleInputChange('cittadinanza', itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Seleziona Cittadinanza" value="" />
            <Picker.Item label="Italiana" value="Italiana" />
            <Picker.Item label="Statunitense" value="Statunitense" />
            <Picker.Item label="Francese" value="Francese" />
            <Picker.Item label="Tedesca" value="Tedesca" />
            <Picker.Item label="Spagnola" value="Spagnola" />
            <Picker.Item label="Portoghese" value="Portoghese" />
            <Picker.Item label="Inglese" value="Inglese" />
            <Picker.Item label="Cinese" value="Cinese" />
            <Picker.Item label="Giapponese" value="Giapponese" />
            <Picker.Item label="Indiana" value="Indiana" />
            <Picker.Item label="Altro" value="Altro" />
          </Picker>
          {errors.cittadinanza ? <HelperText type="error">{errors.cittadinanza}</HelperText> : null}

          <View style={styles.switchContainer}>
              <Text style={styles.label}>Disabilità</Text>
              <Switch
                value={formDatiAnagrafici.disabilita}
                onValueChange={(value) => handleInputChange('disabilita', value)}
              />
          </View>
          
        </Card.Content>
      </Card>
      <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.box} onPress={handleNext}>
                    <Text style={styles.buttonText}>Successivo</Text>
                  </TouchableOpacity>
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
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
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
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
  input: {
    marginBottom: 15,
    color: '#007BFF',
  },
  button: {
    backgroundColor: '#007FFF',
    padding: 10,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonTextStyle: {
    fontSize: 16,
    marginBottom: 5,
    color:'white',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  box: {
    backgroundColor: '#007FFF',
        padding: 10,
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
        marginTop: 10,
  },
  buttonText: {
    marginLeft:15,
    marginRight:15,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color:'white',
  },
});
