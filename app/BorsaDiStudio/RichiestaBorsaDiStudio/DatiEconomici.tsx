import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Modal, TouchableOpacity, } from "react-native";
import { TextInput, Card, Switch, HelperText } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomePage from "@/components/HomePage";
import GufoChat from "@/components/Gufochat";
import { useStudentEconomicState } from "@/hooks/useRequestState";
import { useScholarshipRequest } from "../../utils/RequestUtil";
import { deleteAllData } from "@/hooks/useScholarshipRequestState";

export default function DatiEconomiciPage() {
  const router = useRouter();
  const [isModalVisible, setModalVisible] = useState(false);
  const { formDatiEconomici, setformDatiEconomici, errors, setErrors } = useStudentEconomicState();
  const { createRequest } = useScholarshipRequest();

  //menua a tendina dopo aver inviato la conferma della richiesta
  const handleCloseModal = () => {
    setModalVisible(false);
    deleteAllData();
    router.push("/BorsaDiStudio/BorsaDiStudioPage");
  };

  //invo della richiesta
  const handleNext = async () => {
    if (validateFields()) {
      await createRequest();
      setModalVisible(true);
    }
  };

  useEffect(() => {
    const loadformDatiEconomici = async () => {
      try {
        const savedformDatiEconomici = await AsyncStorage.getItem(
          "formDatiEconomici"
        );
        if (savedformDatiEconomici) {
          setformDatiEconomici(JSON.parse(savedformDatiEconomici));
        }
      } catch (error) {
        console.error("Failed to load form data", error);
      }
    };
    loadformDatiEconomici();
  }, []);

  //salvataggio dati
  const handleInputChange = async (field: string, value: string | boolean) => {
    const updatedformDatiEconomici = { ...formDatiEconomici, [field]: value };
    setformDatiEconomici(updatedformDatiEconomici);
    try {
      await AsyncStorage.setItem(
        "formDatiEconomici",
        JSON.stringify(updatedformDatiEconomici)
      );
    } catch (error) {
      console.error("Failed to save form data", error);
    }
  };

  //controllo campi vuoti
  const validateFields = () => {
    const newErrors = {
      dataRilascio: formDatiEconomici.dataRilascio
        ? ""
        : "Il campo dataRilascio è obbligatorio.",
      isee: formDatiEconomici.isee ? "" : "Il campo ISEE è obbligatorio.",
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  //Controllo valori numerici
  const handleNumeric = (field: any, text: string) => {
    if (!Number.isNaN(Number(text))) {
      handleInputChange(field, text);
    }
  };

  const handleData = (field: any, text: string) => {
    // Rimuove qualsiasi carattere che non sia un numero o "/"
    let formattedText = text.replace(/[^0-9]/g, "");

    // Aggiunge "/" alla terza e sesta posizione
    if (formattedText.length > 2) {
      formattedText = formattedText.slice(0, 2) + "/" + formattedText.slice(2);
    }
    if (formattedText.length > 5) {
      formattedText = formattedText.slice(0, 5) + "/" + formattedText.slice(5);
    }

    // Evita che la lunghezza superi 10 caratteri (GG/MM/AAAA)
    if (formattedText.length > 10) {
      formattedText = formattedText.slice(0, 10);
    }

    // Estrai giorno, mese e anno
    const parts = formattedText.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Controllo base su giorno e mese
    if (day > 31 || month > 12) return;

    // Verifica i giorni massimi per ogni mese
    const daysInMonth = [31, year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,];

    if (month > 0 && day > daysInMonth[month - 1]) return;

    if (year > 2026) return;
    // Aggiorna lo stato
    handleInputChange(field, formattedText);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topbar}>
          <HomePage />
          <Text style={styles.title}>Dati Economici</Text>
        </View>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="ISEE"
              value={formDatiEconomici.isee.toString()}
              keyboardType="numeric"
              onChangeText={(text) => handleNumeric("isee", text)}
              maxLength={5}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: "#007BFF" } }}
            />
            {errors.isee ? (
              <HelperText type="error">{errors.isee}</HelperText>
            ) : null}
            <TextInput
              label="Data Rilascio ISEE"
              value={formDatiEconomici.dataRilascio}
              onChangeText={(text) => handleData("dataRilascio", text)}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: "#007BFF" } }}
            />
            {errors.dataRilascio ? (
              <HelperText type="error">{errors.dataRilascio}</HelperText>
            ) : null}
            <View style={styles.switchContainer}>
              <Text>Autorizzo l'Università a consultare i dati INPS</Text>
              <Switch
                value={formDatiEconomici.autorizzoINPS}
                onValueChange={(value) =>
                  handleInputChange("autorizzoINPS", value)
                }
                color="#007BFF"
              />
            </View>
          </Card.Content>
        </Card>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.boxindietro}
            onPress={() =>
              router.push("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiEsame")
            }
          >
            <Text style={styles.buttonTextindietro}>Indietro</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={handleNext}>
            <Text style={styles.buttonText}>Invia Richiesta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <GufoChat />
      <Modal animationType="fade" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Richiesta completata con successo
            </Text>
            <TouchableOpacity style={styles.box} onPress={handleCloseModal}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    padding: 20,
    marginBottom: "35%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginStart: 90,
  },
  card: {
    marginBottom: 20,
    backgroundColor: "white",
  },
  input: {
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
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
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  boxadd: {
    backgroundColor: "#007FFF",
    padding: 10,
    borderRadius: 10,
    width: 330,
    alignItems: "center",
    marginTop: 10,
  },
  box: {
    backgroundColor: "#007FFF",
    padding: 10,
    borderRadius: 10,
    width: 180,
    alignItems: "center",
    marginTop: 10,
  },
  boxindietro: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: 180,
    alignItems: "center",
    marginTop: 10,
    color: "#007FFF",
    borderColor: "#007FFF",
    borderWidth: 1,
  },
  buttonText: {
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
  picker: {
    height: 50,
    borderColor: "#87828b",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15,
    padding: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
});
