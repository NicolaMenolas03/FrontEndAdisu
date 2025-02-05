import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { TextInput, Button, Card, HelperText } from "react-native-paper";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomePage from "../../../components/HomePage";
import GufoChat from "@/components/Gufochat";

export default function DatiResidenzaPage() {
  const router = useRouter();

  const [formDatiResidenza, setformDatiResidenza] = useState({
    provincia: "",
    comune: "",
    indirizzo: "",
    cap: "",
  });

  const [errors, setErrors] = useState({
    provincia: "",
    comune: "",
    indirizzo: "",
    cap: "",
  });

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
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === "");
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

  const handleNext = () => {
    if (validateFields()) {
      router.push("/BorsaDiStudio/RichiestaBorsaDiStudio/DatiScolastici");
    }
  };

  const handleInputChange = async (
    field: keyof typeof formDatiResidenza,
    value: string
  ) => {
    const updatedformDatiResidenza = { ...formDatiResidenza, [field]: value };
    setformDatiResidenza(updatedformDatiResidenza);
    try {
      await AsyncStorage.setItem(
        "formDatiResidenza",
        JSON.stringify(updatedformDatiResidenza)
      );
    } catch (error) {
      console.error("Failed to save form data", error);
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
              onChangeText={(text) => handleInputChange("cap", text)}
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
              theme={{ colors: { primary: "#007BFF" } }}
            />
            {errors.cap ? (
              <HelperText type="error">{errors.cap}</HelperText>
            ) : null}
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
});
