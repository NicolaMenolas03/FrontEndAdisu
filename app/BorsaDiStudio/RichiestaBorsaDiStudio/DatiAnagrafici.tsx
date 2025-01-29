import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import Navbar from '@/components/Navbar';
import { useRouter } from 'expo-router'; // Ensure correct import for router

export default function DatiAnagraficiPage() {
const router = useRouter(); // Declare the router variable
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    sesso: '',
    etaNascita: '',
    cittadinanza: '',
    disabilita: false,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Text style={styles.sectionTitle}>Dati Anagrafici</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={formData.nome}
            onChangeText={(text) => handleInputChange('nome', text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Cognome"
            value={formData.cognome}
            onChangeText={(text) => handleInputChange('cognome', text)}
          />

          <Picker
            style={styles.picker}
            selectedValue={formData.sesso}
            onValueChange={(itemValue) => handleInputChange('sesso', itemValue)}
          >
            <Picker.Item label="Seleziona Sesso" value="" />
            <Picker.Item label="Maschio" value="Maschio" />
            <Picker.Item label="Femmina" value="Femmina" />
            <Picker.Item label="Altro" value="Altro" />
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Età di Nascita"
            keyboardType="numeric"
            value={formData.etaNascita}
            onChangeText={(text) => handleInputChange('etaNascita', text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Cittadinanza"
            value={formData.cittadinanza}
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
      <Navbar namePage="DatiAnagraficiPage" />
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