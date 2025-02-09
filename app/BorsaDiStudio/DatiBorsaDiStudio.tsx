import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import TornaIndietro from '@/components/TornaIndietro';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from '@/services/api';
import { useScholarshipDataState } from '@/context/DataScholarshipContext';


export default function DatiBorsaDiStudio() {
  const { scholarshipData, setscholarshipData, studentNr, setStudentNr, studentType, setStudentType, nrRange, setNrRange, iseeMin, setIseeMin, iseeMax, setIseeMax, physicalCondition, setPhysicalCondition, result, setResult } = useScholarshipDataState();

  useEffect(() => {
    const checkRequest = async () => {
      const username = await AsyncStorage.getItem('username');
      let response = await apiService.get(`/request/get-request-by-user/?nrUtente=` + username);

      if (Array.isArray(response.data) && response.data.length > 0) {
        const requestData = response.data[0];

        setscholarshipData(requestData);
        setStudentNr(requestData.nrStudent);
        setStudentType(requestData.studentType);
        setNrRange(requestData.nrRange);

        response = await apiService.get(`/iseerange/get-isee-range-by-id/?nr=${requestData.nrRange}`);

        if (Array.isArray(response.data) && response.data.length > 0) {
          setIseeMin(response.data[0].iseeMin);
          setIseeMax(response.data[0].iseeMax);
        }
      } else {
        console.error('Errore: ', response.status);
      }
    };

    checkRequest();
  }, []);

  useEffect(() => {
    if (!studentType || iseeMax === null) {
      console.log("Dati non ancora disponibili, riprovando...");
      return;
    }

    const loadAmounts = async () => {
      let importoMensa = ``;
      let importoAlloggio = ``;
      let importoTotale = ``;

      let tempisee = 0;
      let tempOutSite = 0;

      if (iseeMax < 15000) {
        tempisee = 2000;
      } else if (iseeMax < 25000) {
        tempisee = 1200;
      } else {
        tempisee = 0;
      }

      if (studentType === "Fuori sede") {
        tempisee += 3000;
        tempOutSite = 3000;
      } else if (studentType === "Pendolare") {
        tempisee += 1500;
      }

      if (physicalCondition) {
        tempisee *= 1.2;
      }

      importoMensa = iseeMax < 25000 ? "600 €" : "0 €";
      importoAlloggio = `${tempOutSite.toFixed(2)}€`;
      importoTotale = `${tempisee.toFixed(2)} €`;

      setResult({ importoMensa, importoAlloggio, importoTotale });
    };

    setTimeout(loadAmounts, 500);
  }, [studentType, iseeMax]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        <View style={styles.topbar}>
          <TornaIndietro />
          <Text style={styles.title}>Dati Borsa di Studio</Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Dati Personali</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Matricola</Text>
              <TextInput style={styles.input} value={studentNr} editable={false} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tipo Borsa di Studio</Text>
              <TextInput style={styles.input} value="Adisu 2025" editable={false} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tipo Studente</Text>
              <TextInput style={styles.input} value={studentType} editable={false} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Fascia Reddito</Text>
              <TextInput style={styles.input} value={`${iseeMin} - ${iseeMax}`} editable={false} />
            </View>
          </Card.Content>
        </Card>

        {/* Seconda sezione */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Importi</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Importo Mensa</Text>
              <TextInput style={styles.input} value={result.importoMensa} editable={false} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Importo Alloggio</Text>
              <TextInput style={styles.input} value={result.importoAlloggio} editable={false} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Importo Totale</Text>
              <TextInput style={styles.input} value={result.importoTotale} editable={false} />
            </View>
          </Card.Content>
        </Card>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    marginBottom: '35%',
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginStart: 90,
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scholarshipContainer: {
    padding: 20,
    paddingBottom: 60,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
  },
});
