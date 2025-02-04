import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Modal, Pressable } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import GufoChat from '@/components/Gufochat';

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

  const [errors, setErrors] = useState({
    matricola: '',
    ateneo: '',
    corso: '',
    dipartimento: '',
    durata: '',
    statoStudente: '',
  });

  const validateFields = () => {
    const newErrors = {
      matricola: formDatiScolatici.matricola ? '' : 'Il campo Matricola è obbligatorio.',
      ateneo: formDatiScolatici.ateneo ? '' : 'Il campo Ateneo è obbligatorio.',
      corso: formDatiScolatici.corso ? '' : 'Il campo Corso è obbligatorio.',
      dipartimento: formDatiScolatici.dipartimento ? '' : 'Il campo Dipartimento è obbligatorio.',
      durata: formDatiScolatici.durata ? '' : 'Il campo Durata è obbligatorio.',
      statoStudente: formDatiScolatici.statoStudente ? '' : 'Il campo Stato Studente è obbligatorio.',
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === '');
  };

  const [isModalVisible, setModalVisible] = useState(false);

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

  const handleInputChange = async (field: keyof typeof formDatiScolatici, value: string) => {
    const updatedData = { ...formDatiScolatici, [field]: value };
    setformDatiScolatici(updatedData);
    try {
      await AsyncStorage.setItem('formDatiScolatici', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Failed to save form data', error);
    }
  };

  const handleHomePress = () => {
    setModalVisible(true);
  };

  const confirmExit = () => {
    if (validateFields()) {
      setModalVisible(false);
      router.push('/BorsaDiStudio/BorsaDiStudioPage'); // Cambia con la route della tua pagina principale
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Pulsante HOME */}
        <View style={styles.header}>
          <Ionicons
            name="home-outline"
            size={28}
            color="#005dff"
            onPress={handleHomePress}
          />
        </View>

        <Text style={styles.title}>Dati Scolastici</Text>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.label}>Iscrizione a.a.</Text>
            <Text style={styles.output}>{getAnnoAccademico()}</Text>

            <TextInput
              style={styles.input}
              label="Matricola"
              value={formDatiScolatici.matricola}
              onChangeText={(text) => handleInputChange('matricola', text)}
              mode="outlined"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              label="Ateneo"
              value={formDatiScolatici.ateneo}
              onChangeText={(text) => handleInputChange('ateneo', text)}
              mode="outlined"
            />
            <TextInput
              style={styles.input}
              label="Corso"
              value={formDatiScolatici.corso}
              onChangeText={(text) => handleInputChange('corso', text)}
              mode="outlined"
            />
            <TextInput
              style={styles.input}
              label="Dipartimento"
              value={formDatiScolatici.dipartimento}
              onChangeText={(text) => handleInputChange('dipartimento', text)}
              mode="outlined"
            />
            <TextInput
              style={styles.input}
              label="Durata legale del corso (1-6)"
              value={formDatiScolatici.durata}
              onChangeText={(text) => handleInputChange('durata', text)}
              mode="outlined"
              keyboardType="numeric"
            />

            <Text style={styles.label}>Stato Studente</Text>
            <Picker
              selectedValue={formDatiScolatici.statoStudente}
              onValueChange={(value) => handleInputChange('statoStudente', value)}
            >
              <Picker.Item label="Full Time" value="Full Time" />
              <Picker.Item label="Part Time" value="Part Time" />
            </Picker>
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            textColor="#005dff"
            onPress={() => router.push('/BorsaDiStudio/RichiestaBorsaDiStudio/DatiResidenza')}
          >
            Indietro
          </Button>
          <Button
            mode="contained"
            buttonColor="#005dff"
            onPress={() => router.push('/BorsaDiStudio/RichiestaBorsaDiStudio/DatiEsame')}
          >
            Successivo
          </Button>
        </View>

        {/* Modal per confermare uscita */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Sei sicuro di voler abbandonare la richiesta?</Text>
              <View style={styles.modalButtons}>
                <Button mode="outlined" onPress={() => setModalVisible(false)}>
                  Annulla
                </Button>
                <Button mode="contained" buttonColor="#ff4d4d" onPress={confirmExit}>
                  Conferma
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <GufoChat></GufoChat>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    marginBottom: 7,
  },
  output: {
    fontSize: 16,
    color: '#333',
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 15,
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
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});