import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import Navbar from '@/components/Navbar';
import { useRouter } from 'expo-router'; // Ensure correct import for router
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DatiAnagraficiPage() {
  const router = useRouter(); // Declare the router variable

  const [formDatiAnagrafici, setformDatiAnagrafici] = useState({
    nome: '',
    cognome: '',
    sesso: '',
    etaNascita: '',
    cittadinanza: '',
    disabilita: false,
  });

  useEffect(() => {
    const loadformDatiAnagrafici = async () => {
      try {
        const savedformDatiAnagrafici = await AsyncStorage.getItem('formDatiAnagrafici');
        if (savedformDatiAnagrafici) {
          setformDatiAnagrafici(JSON.parse(savedformDatiAnagrafici));
        }
      } catch (error) {
        console.error('Failed to load form data', error);
      }
    };

    loadformDatiAnagrafici();
  }, []);

  const handleInputChange = async (field: string, value: string | boolean) => {
    const updatedformDatiAnagrafici = { ...formDatiAnagrafici, [field]: value };
    setformDatiAnagrafici(updatedformDatiAnagrafici);
    try {
      await AsyncStorage.setItem('formDatiAnagrafici', JSON.stringify(updatedformDatiAnagrafici));
    } catch (error) {
      console.error('Failed to save form data', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Text style={styles.sectionTitle}>Dati Anagrafici</Text>

          <Text style={styles.label1}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={formDatiAnagrafici.nome}
            onChangeText={(text) => handleInputChange('nome', text)}
          />
          <Text style={styles.label1}>Cognome</Text>
          <TextInput
            style={styles.input}
            placeholder="Cognome"
            value={formDatiAnagrafici.cognome}
            onChangeText={(text) => handleInputChange('cognome', text)}
          />
          <Text style={styles.label1}>Sesso</Text>
          <Picker
            style={styles.picker}
            selectedValue={formDatiAnagrafici.sesso}
            onValueChange={(itemValue) => handleInputChange('sesso', itemValue)}
          >
            <Picker.Item label="Seleziona Sesso" value="" />
            <Picker.Item label="Maschio" value="Maschio" />
            <Picker.Item label="Femmina" value="Femmina" />
            <Picker.Item label="Altro" value="Altro" />
          </Picker>
          <Text style={styles.label1}>Età di Nascita</Text>
          <TextInput
            style={styles.input}
            placeholder="Età di Nascita"
            keyboardType="numeric"
            value={formDatiAnagrafici.etaNascita}
            onChangeText={(text) => handleInputChange('etaNascita', text)}
          />
          <Text style={styles.label1}>Cittadinanza</Text>
          <TextInput
            style={styles.input}
            placeholder="Cittadinanza"
            value={formDatiAnagrafici.cittadinanza}
            onChangeText={(text) => handleInputChange('cittadinanza', text)}
          />

          <View style={styles.checkboxContainer}>
            
            <Text style={styles.label}>Disabilità</Text>
          </View>
        </View>
      

      <TouchableOpacity style={styles.nextButton} onPress={()=>router.push("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiResidenza")}>
        <Text style={styles.nextButtonText}>Successivo</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  label1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
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
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    marginLeft: 8,
  },
  nextButton: {
    backgroundColor: '#0660ff',
    padding: 15,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});