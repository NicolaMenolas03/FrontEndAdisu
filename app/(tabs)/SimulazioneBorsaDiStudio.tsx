import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Navbar from '@/components/Navbar';

type RootStackParamList = {
  Home: undefined;
  Page1: undefined;
  Page2: undefined;
  DatiBorsaDiStudio: undefined;
};

type SimulationResults = {
  importoMensa: string;
  importoAlloggio: string;
  importoTotale: string;
};

export default function SimulazioneBorsaDiStudio() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [isee, setIsee] = useState('');
  const [tipologiaStudente, setTipologiaStudente] = useState('');
  const [disabilita, setDisabilita] = useState(false);
  const [pastiAggiuntivi, setPastiAggiuntivi] = useState(false);
  const [corsoSTEM, setCorsoSTEM] = useState(false);

  const handleSimulaPress = () => {
    const calcoloSimulazione = () => {
      const parsedIsee = parseFloat(isee);

      // Importo base
      let importoBase = 0;
      if (tipologiaStudente === 'Fuori sede') {
        importoBase = 5000;
      } else if (tipologiaStudente === 'Pendolare') {
        importoBase = 3000;
      } else {
        importoBase = 2000;
      }

      // Aggiustamenti
      if (disabilita) {
        importoBase *= 1.2; // Aumento del 20% per disabilità
      }
      if (pastiAggiuntivi) {
        importoBase += 500; // Aggiunta per pasti extra
      }
      if (corsoSTEM) {
        importoBase *= 1.1; // Aumento del 10% per corsi STEM
      }

      const importoMensa = pastiAggiuntivi ? '500 €' : '310 €';
      const importoAlloggio = tipologiaStudente === 'Fuori sede' ? '3000 €' : '0 €';
      const importoTotale = `${importoBase.toFixed(2)} €`;

      return { importoMensa, importoAlloggio, importoTotale };
    };

    setResults(calcoloSimulazione());
    setShowResults(true);
  };


   const handleIseeChange = (text: string) => {
    // Rimuovi tutti i caratteri non numerici
    const numericText = text.replace(/[^0-9]/g, '');
    setIsee(numericText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Dati Borsa di Studio</Text>

          <View style={styles.sectionContainer}>
            <Text style={styles.inputLabel}>Dati personali</Text>
            
            <Text>Anno accademico</Text>
            <Picker
              selectedValue={tipologiaStudente}
              style={styles.picker}
              onValueChange={(itemValue: string) => setTipologiaStudente(itemValue)}
            >
              <Picker.Item label="Matricola" value="Matricola" />
              <Picker.Item label="2 anno" value="2 anno"/>
              <Picker.Item label="3 anno" value="3 anno"/>
              <Picker.Item label="4 anno laurea ciclo unico" value="4 anno laurea ciclo unico"/>
              <Picker.Item label="5 anno laurea ciclo unico" value="5 anno laurea ciclo unico"/>
              <Picker.Item label="1 anno Fuoricorso" value="1 anno Fuoricorso"/>
              <Picker.Item label="2 anno Fuoricorso" value="2 anno Fuoricorso"/>
            </Picker>

            <Text>Valore ISEE</Text>
            <TextInput
              style={styles.input}
              value={isee}
              onChangeText={handleIseeChange}
              placeholder="Inserisci il valore ISEE"
              keyboardType="numeric"
            />

            <Text>Tipologia Studente</Text>
            <Picker
              selectedValue={tipologiaStudente}
              style={styles.picker}
              onValueChange={(itemValue: string) => setTipologiaStudente(itemValue)}
            >
              <Picker.Item label="Fuori sede" value="Fuori sede" />
              <Picker.Item label="Pendolare" value="Pendolare" />
              <Picker.Item label="In sede" value="In sede" />
            </Picker>

            <View style={styles.toggleGroup}>
              <Text>Studente diversamente abile con disabilità pari o superiore al 66% o in possesso di attestazione di invalidità ex art. 3 c. 1 della l. 104/92.</Text>
              <TouchableOpacity
                style={[styles.toggleButton, disabilita && styles.toggleButtonSelected]}
                onPress={() => setDisabilita(!disabilita)}
              >
                <Text style={styles.toggleButtonText}>{disabilita ? '✔' : '✘'}</Text>
              </TouchableOpacity>
            </View>


            <View style={styles.toggleGroup}>
              <Text>Studentessa frequentante corso di laurea S.T.E.M.</Text>
              <TouchableOpacity
                style={[styles.toggleButton, corsoSTEM && styles.toggleButtonSelected]}
                onPress={() => setCorsoSTEM(!corsoSTEM)}
              >
                <Text style={styles.toggleButtonText}>{corsoSTEM ? '✔' : '✘'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.box} onPress={handleSimulaPress}>
              <Text style={styles.boxText}>Simula</Text>
            </TouchableOpacity>
          </View>

          {showResults && results && (
            <View style={styles.sectionContainerImport}>
              <Text style={styles.inputLabel}>Importi</Text>
              <Text>Importo mensa</Text>
              <TextInput style={styles.input} value={results.importoMensa} editable={false} />
              <Text>Importo alloggio</Text>
              <TextInput style={styles.input} value={results.importoAlloggio} editable={false} />
              <Text>Importo totale</Text>
              <TextInput style={styles.input} value={results.importoTotale} editable={false} />
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
  toggleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  toggleButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginLeft: 10,
  },
  toggleButtonSelected: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  toggleButtonText: {
    color: '#333',
    fontSize: 20,
  },
  picker: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
});
