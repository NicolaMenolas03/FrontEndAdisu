import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack'; 
import Navbar from '@/components/Navbar';

// Definisci il tipo per le pagine di navigazione
type RootStackParamList = {
  SimulazioneBorsaDiStudio: undefined;
};

export default function DatiBorsaDiStudio() {
  // Usa il hook useNavigation con il tipo di navigazione
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  const navigateToSimulazioneBorsaDiStudio = () => {
    navigation.navigate('SimulazioneBorsaDiStudio');
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scholarshipContainer}>
        <Text style={styles.sectionTitle}>Dati Borsa di Studio</Text>

        {/* Prima sezione */}
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

        {/* Seconda sezione */}
        <View style={styles.sectionContainer}>
          <Text style={styles.inputLabel}>Importi</Text>
          <Text>Importo mensa</Text>
          <TextInput style={styles.input} value="Importo mensa" editable={false} />
          <Text>Importo alloggio</Text>
          <TextInput style={styles.input} value="Importo alloggio" editable={false} />
          <Text>Importo totale</Text>
          <TextInput style={styles.input} value="Importo totale" editable={false} />
        </View>

      </ScrollView>
      
      {/* Barra di navigazione */}
        <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between', // Ensure space is between content and navbar
  },
  scholarshipContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 60, // Add bottom padding to prevent content overlap with navbar
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 30,
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
