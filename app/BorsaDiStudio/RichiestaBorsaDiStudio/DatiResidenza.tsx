import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button, Card, HelperText } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomePage from "@/components/HomePage";
import GufoChat from "@/components/Gufochat";
import { useStudentPlaceState } from "@/context/RequestContext";
import { Picker } from "@react-native-picker/picker";

export default function DatiResidenzaPage() {
  const router = useRouter();
  const { formDatiResidenza, setformDatiResidenza, errors, setErrors } =
    useStudentPlaceState();
  //Tasto avanti per passare alla pagina successiva
  const handleNext = () => {
    if (validateFields()) {
      router.replace("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiScolastici");
    }
  };

  useEffect(() => {
    const loadformDatiResidenza = async () => {
      try {
        const savedformDatiResidenza = await AsyncStorage.getItem(
          "formDatiResidenza"
        );
        if (savedformDatiResidenza) {
          setformDatiResidenza(JSON.parse(savedformDatiResidenza));
        }
      } catch (error) {
        console.error("Failed to load form data", error);
      }
    };

    loadformDatiResidenza();
  }, []);

  //Salvataggio dati
  const handleInputChange = async (
    field: keyof typeof formDatiResidenza,
    value: string
  ) => {
    // Crea un nuovo oggetto con i dati aggiornati del modulo
    const updatedData = { ...formDatiResidenza, [field]: value };

    // Aggiorna lo stato del componente con i dati aggiornati
    setformDatiResidenza(updatedData);

    try {
      // Salva i dati aggiornati in AsyncStorage per la persistenza
      await AsyncStorage.setItem(
        "formDatiResidenza",
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
      provincia: formDatiResidenza.provincia
        ? ""
        : "Il campo Provincia è obbligatorio.",
      comune: formDatiResidenza.comune ? "" : "Il campo Comune è obbligatorio.",
      indirizzo: formDatiResidenza.indirizzo
        ? ""
        : "Il campo Indirizzo è obbligatorio.",
      cap: formDatiResidenza.cap ? "" : "Il campo CAP è obbligatorio.",
      tipoStudente: formDatiResidenza.tipoStudente ? "" : "Seleziona un tipo.",
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
  };

  //controlli valori numerici
  const handleNumeric = (field: any, text: string) => {
    if (!Number.isNaN(Number(text))) {
      handleInputChange(field, text);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topbar}>
          <HomePage />
          <Text style={styles.title}>Dati di Residenza</Text>
        </View>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Provincia"
              value={formDatiResidenza.provincia}
              onChangeText={(text) => handleInputChange("provincia", text)}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: "#007BFF" } }}
            />
            {errors.provincia ? (
              <HelperText type="error">{errors.provincia}</HelperText>
            ) : null}

            <TextInput
              label="Comune"
              value={formDatiResidenza.comune}
              onChangeText={(text) => handleInputChange("comune", text)}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: "#007BFF" } }}
            />
            {errors.comune ? (
              <HelperText type="error">{errors.comune}</HelperText>
            ) : null}

            <TextInput
              label="Indirizzo"
              value={formDatiResidenza.indirizzo}
              onChangeText={(text) => handleInputChange("indirizzo", text)}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: "#007BFF" } }}
            />
            {errors.indirizzo ? (
              <HelperText type="error">{errors.indirizzo}</HelperText>
            ) : null}

            <TextInput
              label="CAP"
              value={formDatiResidenza.cap}
              onChangeText={(text) => handleNumeric("cap", text)}
              mode="outlined"
              keyboardType="numeric"
              maxLength={5}
              style={styles.input}
              theme={{ colors: { primary: "#007BFF" } }}
            />
            {errors.cap ? (
              <HelperText type="error">{errors.cap}</HelperText>
            ) : null}

            <Text style={styles.label}>Tipo Studente</Text>
            <Picker
              selectedValue={formDatiResidenza.tipoStudente}
              onValueChange={(text) => handleInputChange("tipoStudente", text)}
              style={styles.picker}
            >
              <Picker.Item label="In sede" value="In sede" />
              <Picker.Item label="Pendolare" value="Pendolare" />
              <Picker.Item label="Fuori sede" value="Fuori sede" />
            </Picker>
          </Card.Content>
        </Card>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.boxindietro}
            onPress={() =>
              router.push(
                "/BorsaDiStudio/RichiestaBorsaDiStudio/DatiAnagrafici"
              )
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
  card: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginStart: 90,
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
