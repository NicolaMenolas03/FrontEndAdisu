import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Navbar from '@/components/Navbar';

type RootStackParamList = {
  Home: undefined;
  Page1: undefined;
  Page2: undefined;
  DatiBorsaDiStudio: undefined;
};

export default function SimulazioneBorsaDiStudio() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [showResults, setShowResults] = useState(false);

  const handleSimulaPress = () => {
    setShowResults(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Dati Borsa di Studio</Text>

          <View style={styles.sectionContainer}>
            <Text style={styles.inputLabel}>Dati personali</Text>
            <Text>Matricola</Text>
            <TextInput style={styles.input} value="Matricola" editable={false} />
            <Text>Tipo borsa di studio</Text>
            <TextInput style={styles.input} value="Tipo borsa di studio" editable={false} />
            <Text>Tipo studente</Text>
            <TextInput style={styles.input} value="Tipo studente" editable={false} />
            <Text>Fascia reddito</Text>
            <TextInput style={styles.input} value="Fascia reddito" editable={false} />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.box} onPress={handleSimulaPress}>
              <Text style={styles.boxText}>Simula</Text>
            </TouchableOpacity>
          </View>

          {showResults && (
            <View style={styles.sectionContainerImport}>
              <Text style={styles.inputLabel}>Importi</Text>
              <Text>Importo mensa</Text>
              <TextInput style={styles.input} value="Importo mensa" editable={false} />
              <Text>Importo alloggio</Text>
              <TextInput style={styles.input} value="Importo alloggio" editable={false} />
              <Text>Importo totale</Text>
              <TextInput style={styles.input} value="Importo totale" editable={false} />
            </View>
          )}
        </ScrollView>
      </View>
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 60, // Aggiungi spazio per la navbar
  },
  scrollContent: {
    padding: 20,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  box: {
    width: '100%',
    height: 40,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  boxText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionContainerImport: {
    marginBottom: 30,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  sectionContainer: {
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  inputLabel: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});