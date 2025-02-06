import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Modal } from 'react-native';
import { TextInput, Button, Card, Switch, HelperText } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePage from '@/components/HomePage';
import GufoChat from '@/components/Gufochat';

export default function DatiEconomiciPage() {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);

  const [formDatiEconomici, setformDatiEconomici] = useState({
    isee: '',
    dataRilascio: '',
    autorizzoINPS: false,
  });

  const [errors, setErrors] = useState({
    isee: '',
    dataRilascio: '',
  });
  
  //menua a tendina dopo aver inviato la conferma della richiesta
  const handleCloseModal = () => {
    setModalVisible(false);
    router.push('/BorsaDiStudio/BorsaDiStudioPage');
  };
  
  //invo della richiesta
  const handleNext = () => {
    if (validateFields()) {
      setModalVisible(true);
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

  //salvataggio dati
  const handleInputChange = async (field: string, value: string | boolean) => {
    const updatedformDatiEconomici = { ...formDatiEconomici, [field]: value };
    setformDatiEconomici(updatedformDatiEconomici);
    try {
      await AsyncStorage.setItem('formDatiEconomici', JSON.stringify(updatedformDatiEconomici));
    } catch (error) {
      console.error('Failed to save form data', error);
    }
  };

   //controllo campi vuoti
   const validateFields = () => {
    const newErrors = {
      isee: formDatiEconomici.isee ? '' : 'Il campo isee è obbligatorio.',
      dataRilascio: formDatiEconomici.dataRilascio ? '' : 'Il campo dataRilascio è obbligatorio.',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

   //Controllo valori numerici
  const handleNumeric = (field: any, text: string) => {
    if(!Number.isNaN(Number(text))){
        handleInputChange(field, text)
    }
  } 

  //Controllo valori data
  const handleData = (field: any, text: string) => {
    // Rimuove qualsiasi carattere che non sia un numero o "/"
    let formattedText = text.replace(/[^0-9]/g, "");
  
    // Aggiunge "/" alla terza e sesta posizione
    if (formattedText.length > 2) {
      formattedText = formattedText.slice(0, 2) + "/" + formattedText.slice(2);
    }
    if (formattedText.length > 5) {
      formattedText = formattedText.slice(0, 5) + "/" + formattedText.slice(5);
    }
  
    // Evita che la lunghezza superi 10 caratteri (GG/MM/AAAA)
    if (formattedText.length > 10) {
      formattedText = formattedText.slice(0, 10);
    }
    // Aggiorna lo stato
    handleInputChange(field,formattedText );
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
              onChangeText={(text) => handleNumeric('isee', text)}
              maxLength={5}
              mode="outlined"
              style={styles.input}
            />
            {errors.isee ? <HelperText type="error">{errors.isee}</HelperText> : null}
            <TextInput
              label="Data Rilascio ISEE"
              value={formDatiEconomici.dataRilascio}
              onChangeText={(text) => handleData('dataRilascio', text)}
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
      <GufoChat />
      <Modal animationType="fade" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Richiesta completata con successo</Text>
            <Button mode="contained" buttonColor="#005dff" onPress={handleCloseModal}>
              OK
            </Button>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});
