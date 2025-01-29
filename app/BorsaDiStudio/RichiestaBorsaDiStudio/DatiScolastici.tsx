import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Navbar from '@/components/Navbar';
import { useRouter } from 'expo-router';

export default function DatiScolasticiPage() {
  const router = useRouter();

  const getAnnoAccademico = () => {
    const currentYear = new Date().getFullYear();
    return `${currentYear}/${currentYear + 1}`;
  };

  const [formData, setFormData] = useState({
    matricola: '',
    ateneo: '',
    corso: '',
    dipartimento: '',
    durata: '',
    statoStudente: 'Full Time',
  });

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData({ ...formData, ...newData });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Dati Scolastici</Text>
        
        <Text style={styles.label}>Iscrizione a.a.</Text>
        <Text style={styles.output}>{getAnnoAccademico()}</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Matricola"
          keyboardType="numeric"
          value={formData.matricola}
          onChangeText={(text) => updateFormData({ matricola: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Ateneo"
          value={formData.ateneo}
          onChangeText={(text) => updateFormData({ ateneo: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Corso"
          value={formData.corso}
          onChangeText={(text) => updateFormData({ corso: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Dipartimento"
          value={formData.dipartimento}
          onChangeText={(text) => updateFormData({ dipartimento: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Durata legale del corso (1-6)"
          keyboardType="numeric"
          value={formData.durata}
          onChangeText={(text) => updateFormData({ durata: text })}
        />
        <Text style={styles.label}>Stato Studente</Text>
        <Picker
          selectedValue={formData.statoStudente}
          style={styles.picker}
          onValueChange={(itemValue: string) => updateFormData({ statoStudente: itemValue })}
        >
          <Picker.Item label="Full Time" value="Full Time" />
          <Picker.Item label="Part Time" value="Part Time" />
        </Picker>
        
        <View style={styles.buttonContainer}>
          <Button title="Indietro" onPress={() => router.push("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiAnagrafici")} />
          <Button title="Successivo" onPress={() => router.push("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiEconomici")} />
        </View>
      </ScrollView>
      <Navbar namePage="DatiScolasticiPage" />
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
});