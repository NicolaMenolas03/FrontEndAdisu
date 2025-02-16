import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Card } from 'react-native-paper';
import TornaIndietro from '@/components/BackButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiService } from '@/services/api';
import { useScholarshipDataState } from '@/hooks/useScholarshipDataState';
import { router } from 'expo-router';


export default function DatiBorsaDiStudio() {
  const { scholarshipData, setscholarshipData, studentNr, setStudentNr, studentType, setStudentType, nrRange, setNrRange, iseeMin, setIseeMin, iseeMax, setIseeMax, physicalCondition, setPhysicalCondition, result, setResult } = useScholarshipDataState();
  const [isModalVisible, setModalVisible] = useState(false);

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
      let importoRimborso = ``;

      let tempisee: number = 0;
      let tempOutSite: number = 0;

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

      // Calcolo importi come numeri
      let mensaValue: number = iseeMax < 25000 ? 600 : 0;
      let alloggioValue: number = tempOutSite;
      let totaleValue: number = tempisee;

      // Calcolo del rimborso
      let rimborsoValue: number = totaleValue - mensaValue + alloggioValue;

      // Converti i numeri in stringhe formattate
      importoMensa = `${mensaValue.toFixed(2)} €`;
      importoAlloggio = `${alloggioValue.toFixed(2)} €`;
      importoTotale = `${totaleValue.toFixed(2)} €`;
      importoRimborso = `${rimborsoValue.toFixed(2)} €`;

      setResult({ importoMensa, importoAlloggio, importoRimborso, importoTotale });
    };

    setTimeout(loadAmounts, 500);
  }, [studentType, iseeMax]);

  //Tenddina per tornare alla home
  const handleHomePress = () => {
    setModalVisible(true);
  };

  const confirmExit = async () => {
    setModalVisible(false);
    await ClearDB();
    router.push("/BorsaDiStudio/BorsaDiStudioPage"); // Cambia con la route della tua pagina principale
  };

  //Eliminazione dati dal DB
  const ClearDB = async () => {
    //setDataDeleteRequest({ nrStudent: nrStudent });
    const data = { nrStudent: studentNr };
    await apiService.post('/request/delete-request/', data)
      .then(response => {
        if (response.status === 200) { // Il tuo backend risponde con 200, non 201
          console.log('Eliminazione DB avvenuta con successo');
        }
      })
      .catch(error => {
        console.error('Errore nella Eliminazione del DB', error);
      });
  };


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
              <Text style={styles.inputLabel}>Importo Rimborso spese</Text>
              <TextInput style={styles.input} value={result.importoRimborso} editable={false} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Importo Totale</Text>
              <TextInput style={styles.input} value={result.importoTotale} editable={false} />
            </View>



          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.box} onPress={handleHomePress}>
            <Text style={styles.buttonText}>Annulla Richiesta</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Sei sicuro di voler cancellare la richiesta?
            </Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.boxindietro}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonTextindietro}>Annulla</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.box1} onPress={confirmExit}>
                <Text style={styles.buttonText1}>Conferma</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>


  );
}

const styles = StyleSheet.create({
  buttonText: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  box: {
    backgroundColor: "#007FFF",
    padding: 10,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
    marginTop: 10,
  },
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

  //Finestra modale 
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonContainer1: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  box1: {
    backgroundColor: "#cc0000",
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
  },
  boxindietro: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
    marginTop: 10,
    marginRight: 10,
    color: "#007FFF",
    borderColor: "#007FFF",
    borderWidth: 1,
  },
  buttonText1: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "white",
  },
  buttonTextindietro: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "#007FFF",
  },
});
