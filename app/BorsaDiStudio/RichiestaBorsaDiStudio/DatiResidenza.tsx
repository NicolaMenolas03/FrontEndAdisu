import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';
import Navbar from '@/components/Navbar';
import { useRouter } from 'expo-router';

type RootStackParamList = {
  DatiEconomiciPage: {
    provincia: string;
    comune: string;
    indirizzo: string;
    cap: string;
    [key: string]: any;
  };
  DatiAnagraficiPage: {
    provincia: string;
    comune: string;
    indirizzo: string;
    cap: string;
    [key: string]: any;
  };
};

export default function DatiResidenzaPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    provincia: '',
    comune: '',
    indirizzo: '',
    cap: ''
  });

  const updateFormData = (newData: Partial<typeof formData>) => {
    setFormData({ ...formData, ...newData });
  };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Dati di Residenza</Text>

        <TextInput
        style={styles.input}
        placeholder="Provincia"
        value={formData.provincia}
        onChangeText={(text) => updateFormData({ provincia: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Comune"
        value={formData.comune}
        onChangeText={(text) => updateFormData({ comune: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Indirizzo"
        value={formData.indirizzo}
        onChangeText={(text) => updateFormData({ indirizzo: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="CAP"
        value={formData.cap}
        onChangeText={(text) => updateFormData({ cap: text })}
      />

        <View style={styles.buttonContainer}>
          <Button title="Indietro" onPress={()=>router.push("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiResidenza")} />
          <Button title="Successivo" onPress={()=>router.push("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiScolastici")} />
        </View>
      </ScrollView>

      <Navbar namePage="DatiResidenzaPage" />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
