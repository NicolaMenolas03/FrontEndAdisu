import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Modal } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePage from '../../../components/HomePage';
import GufoChat from '@/components/Gufochat';

export default function DatiResidenzaPage() {
  const router = useRouter();
  
  const [formDatiResidenza, setformDatiResidenza] = useState({
    provincia: '',
    comune: '',
    indirizzo: '',
    cap: '',
  });

  useEffect(() => {
    const loadformDatiResidenza = async () => {
      try {
        const savedformDatiResidenza = await AsyncStorage.getItem('formDatiResidenza');
        if (savedformDatiResidenza) {
          setformDatiResidenza(JSON.parse(savedformDatiResidenza));
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    loadformDatiResidenza();
  }, []);

  const handleInputChange = async (field: keyof typeof formDatiResidenza, value: string) => {
    const updatedformDatiResidenza = { ...formDatiResidenza, [field]: value };
    setformDatiResidenza(updatedformDatiResidenza);
    try {
      await AsyncStorage.setItem('formDatiResidenza', JSON.stringify(updatedformDatiResidenza));
    } catch (error) {
      console.error('Failed to save form data', error);
    }
  };

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <HomePage />
      
      <Text style={styles.title}>Dati di Residenza</Text>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput 
            label="Provincia" 
            value={formDatiResidenza.provincia} 
            onChangeText={(text) => handleInputChange('provincia', text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput 
            label="Comune" 
            value={formDatiResidenza.comune} 
            onChangeText={(text) => handleInputChange('comune', text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput 
            label="Indirizzo" 
            value={formDatiResidenza.indirizzo} 
            onChangeText={(text) => handleInputChange('indirizzo', text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput 
            label="CAP" 
            value={formDatiResidenza.cap} 
            onChangeText={(text) => handleInputChange('cap', text)}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button mode="outlined" textColor="#005dff" onPress={() => router.push("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiAnagrafici")}>
          Indietro
        </Button>
        <Button mode="contained" buttonColor="#005dff" onPress={() => router.push("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiScolastici")}>
          Successivo
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
  input: {
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
});
