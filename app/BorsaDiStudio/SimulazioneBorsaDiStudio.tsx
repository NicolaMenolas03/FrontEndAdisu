import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Navbar from '@/components/Navbar';
import { apiService } from '@/services/api';
import { useCRUD } from '@/hooks/useCRUD';


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

interface IseeData {
  id: number;
  nrRange: number;
  iseeMin: string;
  iseeMax: string;
  academicYear: string;
}

interface AcademicYear {
  id: number;
  academicYear: string;
}


export default function SimulazioneBorsaDiStudio() {
  const { data: IseeData, loading: IseeLoading, error: IseeError, createItem: createIseeItem, updateItem: updateIseeItem, deleteItem: deleteIseeItem }  = useCRUD<IseeData>('/isee-range/');
  const { data: academicYearData, loading: academicYearLoading, error: academicYearError, createItem: createAcademicYearItem, updateItem: updateAcademicYearItem, deleteItem: deleteAcademicYearItem } = useCRUD<AcademicYear>('/academicyear/');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [showResults, setShowResults] = useState(false); 
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [tipologiaStudente, setTipologiaStudente] = useState('');
  const [anniAccademici, setAnniAccademici] = useState<any[]>([]);
  const [selectedAnno, setSelectedAnno] = useState<string>('');
  const [isee, setIsee] = useState<string>('');  // Valore ISEE
  const [isees, setIsees] = useState<any[]>([]); // Array dei range ISEE
  const [selectedRange, setSelectedRange] = useState<string>(''); // Valore del range selezionato
  const [disabilita, setDisabilita] = useState(false);
  const [pastiAggiuntivi, setPastiAggiuntivi] = useState(false);
  const [corsoSTEM, setCorsoSTEM] = useState(false);
  
  
  useEffect(() => {
    const fetchFirstYear = async () => {
      try {
        const response = await apiService.get(`/academicyear/`);
        const { data } = response;
        console.log(data);
  
        // Supponendo che data sia un array di anni accademici
        if (data && data.length > 0) {
          handleAnnoAccademico(data[0].academicYear); // Usa il primo anno accademico
        }
      } catch (error) {
        console.error("Errore nel recuperare gli anni accademici:", error);
      }
    };

    const fetchAnniAccademici = async () => {
      try {
        const response = await apiService.get('/academicyear/');
        const { data } = response;
  
        // Assumi che `data` sia un array di anni accademici
        if (data && data.length > 0) {
          setAnniAccademici(data);
          setSelectedAnno(data[0].academicYear); // Imposta il primo anno come selezionato
        }
      } catch (error) {
        console.error("Errore nel recuperare gli anni accademici:", error);
      }
    };
  
    fetchAnniAccademici();
    fetchFirstYear(); // Chiama la funzione
  }, []); // L'array vuoto garantisce l'esecuzione al montaggio

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

  const handleAnnoAccademico = async (itemValue: string) => {    
    console.log("Anno selezionato:", itemValue);
    setSelectedAnno(itemValue);
    let response = await apiService.get(`/iseerange/get-isee-range/?academicYear=${itemValue}`);	
    const { data } = response;
    if (response.status == 200) {
      setIsees(data);  // Imposta i range ISEE ricevuti
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Simulazione Borsa di Studio</Text>

          <View style={styles.sectionContainer}>
            <Text style={styles.inputLabel}>Dati personali</Text>
            
            <Text style={styles.boxText}>Anno accademico</Text>
            {anniAccademici.length > 0 ? (
            <Picker
              selectedValue={selectedAnno}
              style={styles.picker}
              onValueChange={(itemValue: string) => handleAnnoAccademico(itemValue)}
            >
              {anniAccademici.map((annoAccademico) => (
                <Picker.Item
                  label={`${annoAccademico.academicYear}` }
                  value={annoAccademico.academicYear}
                />
              ))}
            </Picker>
          ) : (
            <Text style={styles.boxText}>Seleziona un anno accademico per caricare i range ISEE.</Text>
          )}

            <Text style={styles.boxText}>Valore ISEE</Text>
            {isees.length > 0 ? (
            <Picker
              selectedValue={selectedRange}
              style={styles.picker}
              onValueChange={(itemValue: string) => setSelectedRange(itemValue)}
            >
              {isees.map((range) => (
                <Picker.Item
                  key={range.nrRange}
                  label={`Range ISEE ${range.nrRange}: ${range.iseeMin} - ${range.iseeMax}`}
                  value={range.nrRange}
                />
              ))}
            </Picker>
          ) : (
            <Text style={styles.boxText}>Seleziona un anno accademico per caricare i range ISEE.</Text>
          )}

            <Text style={styles.boxText}>Tipologia Studente</Text>
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
              <Text style={styles.boxText}>Studente diversamente abile con disabilità pari o superiore al 66% o in possesso di attestazione di invalidità ex art. 3 c. 1 della l. 104/92.</Text>
              <TouchableOpacity
                style={[styles.toggleButton, disabilita && styles.toggleButtonSelected]}
                onPress={() => setDisabilita(!disabilita)}
              >
                <Text style={styles.toggleButtonText}>{disabilita ? '✔' : '✘'}</Text>
              </TouchableOpacity>
            </View>


            <View style={styles.toggleGroup}>
              <Text style={styles.boxText}>Studentessa frequentante corso di laurea S.T.E.M.</Text>
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
              <Text style={styles.buttonText}>Simula</Text>
            </TouchableOpacity>
          </View>

          {showResults && results && (
            <View style={styles.sectionContainer}>
              <Text style={styles.inputLabel}>Importi</Text>
              <Text style={styles.boxText}>Importo mensa</Text>
              <TextInput style={styles.input} value={results.importoMensa} editable={false} />
              <Text style={styles.boxText}>Importo alloggio</Text>
              <TextInput style={styles.input} value={results.importoAlloggio} editable={false} />
              <Text style={styles.boxText}>Importo totale</Text>
              <TextInput style={styles.input} value={results.importoTotale} editable={false} />
            </View>
          )}
        </ScrollView>
      </View>
      <Navbar namePage={''} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
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
    backgroundColor: '#007FFF',
        padding: 10,
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
        marginTop: 10,
  },
  card: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  boxText: {
    marginLeft:15,
    marginRight:15,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#555',
  },
  buttonText: {
    marginLeft:15,
    marginRight:15,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color:'white',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'Black',
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
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  inputLabel: {
    textAlign: 'center',
    padding: 13,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    marginLeft:15,
    marginRight:15,
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
    marginLeft: 13,
    marginRight: 13,
  },
  toggleButtonSelected: {
    backgroundColor: '#0660ff',
    borderColor: '#0660ff',
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
    marginLeft:15,
    marginRight:15,
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
});
