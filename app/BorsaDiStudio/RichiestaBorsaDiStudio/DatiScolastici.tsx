import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Alert, Modal, Pressable, TouchableOpacity, } from "react-native";
import { TextInput, Card } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GufoChat from "@/components/Gufochat";
import HomePage from "@/components/HomePage";
import { useStudentSchoolState } from "@/hooks/useRequestState";

export default function DatiScolasticiPage() {
  const router = useRouter();

  const { formDatiScolastici, setformDatiScolastici, errors, setErrors } =
    useStudentSchoolState();
  const [isModalVisible, setModalVisible] = useState(false);

  //Prossima pagina
  const handleNext = () => {
    if (validateFields()) {
      setModalVisible(false);
      router.replace("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiEsame"); // Cambia con la route della tua pagina principale
    }
  };

  //Controllo campi numerici
  const handleNumeric = (field: any, text: string) => {
    if (!Number.isNaN(Number(text))) {
      handleInputChange(field, text);
    }
  };

  //Riempimento automatico del campo a.a.
  const getAnnoAccademico = () => {
    const currentYear = new Date().getFullYear();
    return `${currentYear}/${currentYear + 1}`;
  };

  useEffect(() => {
    const loadformDatiScolastici = async () => {
      try {
        const savedformDatiScolastici = await AsyncStorage.getItem("formDatiScolastici");
        if (savedformDatiScolastici) {
          setformDatiScolastici(JSON.parse(savedformDatiScolastici));
        }
      } catch (error) {
        console.error("Failed to load form data", error);
      }
    };
    loadformDatiScolastici();
  }, []);

  //Salvataggio dati
  const handleInputChange = async (
    field: keyof typeof formDatiScolastici,
    value: string
  ) => {
    // Crea un nuovo oggetto con i dati aggiornati del modulo
    const updatedData = { ...formDatiScolastici, [field]: value };

    // Aggiorna lo stato del componente con i dati aggiornati
    setformDatiScolastici(updatedData);

    try {
      // Salva i dati aggiornati in AsyncStorage per la persistenza
      await AsyncStorage.setItem(
        "formDatiScolastici",
        JSON.stringify(updatedData)
      );
    } catch (error) {
      // Gestisce eventuali errori durante il salvataggio dei dati
      console.error("Failed to save form data", error);
    }
  };

  //Controllo campi vuoti
  const validateFields = () => {
    const newErrors = {
      matricola: formDatiScolastici.matricola ? "" : "Il campo Matricola è obbligatorio.",
      ateneo: formDatiScolastici.ateneo ? "" : "Il campo Ateneo è obbligatorio.",
      corso: formDatiScolastici.corso ? "" : "Il campo Corso è obbligatorio.",
      dipartimento: formDatiScolastici.dipartimento ? "" : "Il campo Dipartimento è obbligatorio.",
      durata: formDatiScolastici.durata ? "" : "Il campo Durata è obbligatorio.",
      statoStudente: formDatiScolastici.statoStudente ? "" : "Il campo Stato Studente è obbligatorio.",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topbar}>
          <HomePage />
          <Text style={styles.title}>Dati Scolastici</Text>
        </View>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.label}>Iscrizione a.a.</Text>
            <Text style={styles.output}>{getAnnoAccademico()}</Text>

            <TextInput
              style={styles.input}
              label="Matricola"
              value={formDatiScolastici.matricola}
              onChangeText={(text) => handleNumeric("matricola", text)}
              mode="outlined"
              keyboardType="numeric"
              maxLength={6}
              theme={{ colors: { primary: "#007BFF" } }}
            />
            <TextInput
              style={styles.input}
              label="Ateneo"
              value={formDatiScolastici.ateneo}
              onChangeText={(text) => handleInputChange("ateneo", text)}
              mode="outlined"
              theme={{ colors: { primary: "#007BFF" } }}
            />
            <TextInput
              style={styles.input}
              label="Corso"
              value={formDatiScolastici.corso}
              onChangeText={(text) => handleInputChange("corso", text)}
              mode="outlined"
              theme={{ colors: { primary: "#007BFF" } }}
            />
            <TextInput
              style={styles.input}
              label="Dipartimento"
              value={formDatiScolastici.dipartimento}
              onChangeText={(text) => handleInputChange("dipartimento", text)}
              mode="outlined"
              theme={{ colors: { primary: "#007BFF" } }}
            />
            <TextInput
              style={styles.input}
              label="Durata legale del corso (1-6)"
              value={formDatiScolastici.durata}
              onChangeText={(text) => handleNumeric("durata", text)}
              maxLength={1}
              mode="outlined"
              keyboardType="numeric"
              theme={{ colors: { primary: "#007BFF" } }}
            />

            <Text style={styles.label}>Anno di Iscrizione</Text>
            <Picker
              selectedValue={formDatiScolastici.annoIscrizioneStudente}
              onValueChange={(value) =>
                handleInputChange("annoIscrizioneStudente", value)
              }
              style={styles.picker}
            >
              <Picker.Item label="1 anno" value="1 anno" />
              <Picker.Item label="2 anno" value="2 anno" />
              <Picker.Item label="3 anno" value="3 anno" />
              <Picker.Item
                label="4 anno laurea a ciclo unico"
                value="4 anno laurea a ciclo unico"
              />
              <Picker.Item
                label="5 anno laurea a ciclo unico"
                value="5 anno laurea a ciclo unico"
              />
            </Picker>

            <Text style={styles.label}>Stato Studente</Text>
            <Picker
              selectedValue={formDatiScolastici.statoStudente}
              onValueChange={(value) =>
                handleInputChange("statoStudente", value)
              }
              style={styles.picker}
            >
              <Picker.Item label="Full Time" value="Full Time" />
              <Picker.Item label="Part Time" value="Part Time" />
            </Picker>
          </Card.Content>
        </Card>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.boxindietro}
            onPress={() =>
              router.push("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiResidenza")
            }
          >
            <Text style={styles.buttonTextindietro}>Indietro</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box} onPress={handleNext}>
            <Text style={styles.buttonText}>Successivo</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <GufoChat></GufoChat>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginStart: 90,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    marginBottom: 7,
  },
  output: {
    fontSize: 16,
    color: "#333",
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginBottom: 15,
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
    width: "80%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  box: {
    backgroundColor: "#007FFF",
    padding: 10,
    borderRadius: 10,
    width: 150,
    alignItems: "center",
    marginTop: 10,
  },
  boxindietro: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: 150,
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
