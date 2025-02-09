import React, { useEffect } from "react";
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, } from "react-native";
import { Switch } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { apiService } from "@/services/api";
import TornaIndietro from "@/components/TornaIndietro";
import { useSimulazioneState } from "@/context/SimulationContext";

export default function SimulazioneBorsaDiStudio() {
  const { showResults, setShowResults, selectedAnno, setSelectedAnno, results, setResults, tipologiaStudente, setTipologiaStudente, anniAccademici, setAnniAccademici,
    isee, isees, setIsees, selectedRange, setSelectedRange, disabilita, setDisabilita, pastiAggiuntivi, corsoSTEM, setCorsoSTEM, } = useSimulazioneState();

  useEffect(() => {
    const fetchFirstYear = async () => {
      try {
        const response = await apiService.get(`/academicyear/`);

        if (Array.isArray(response.data) && response.data.length > 0) {
          const { data } = response;
          handleAnnoAccademico(data[0].academicYear);
        }
      } catch (error) {
        console.error("Errore nel recuperare gli anni accademici:", error);
      }
    };

    const fetchAnniAccademici = async () => {
      try {
        const response = await apiService.get("/academicyear/");
        const { data } = response;

        if (Array.isArray(data) && data.length > 0) {
          setAnniAccademici(data);
          setSelectedAnno(data[0].academicYear);
        }
      } catch (error) {
        console.error("Errore nel recuperare gli anni accademici:", error);
      }
    };

    fetchAnniAccademici();
    fetchFirstYear();
  }, []);

  const handleSimulaPress = async () => {
    const calcoloSimulazione = async () => {
      let importoMensa = ``;
      let importoAlloggio = ``;
      let importoTotale = ``;
      let response = await apiService.get(
        `/iseerange/get-isee-range-by-id/?nr=${selectedRange}`
      );
      const { data } = response;

      if (Array.isArray(data) && data.length > 0) {
        let iseeMax = data[0].iseeMax;

        let tempisee = 0;
        let tempOutSite = 0;
        if (iseeMax < 15000) {
          tempisee = 2000;
        } else if (iseeMax < 25000) {
          tempisee = 1200;
        } else {
          tempisee = 0;
        }

        if (tipologiaStudente === "Fuori sede") {
          tempisee += 3000;
          tempOutSite = 3000;
        } else if (tipologiaStudente === "Pendolare") {
          tempisee += 1500;
        } else {
          tempisee += 0;
        }

        if (disabilita) {
          tempisee *= 1.2;
        }
        if (corsoSTEM) {
          tempisee *= 1.1;
        }

        importoMensa = iseeMax < 25000 ? "600 €" : "0 €";
        importoAlloggio = `${tempOutSite.toFixed(2)}€`;
        importoTotale = `${tempisee.toFixed(2)} €`;
      }

      return { importoMensa, importoAlloggio, importoTotale };
    };

    const simulationResults = await calcoloSimulazione();
    setResults(simulationResults);
    setShowResults(true);
  };

  const handleAnnoAccademico = async (itemValue: string) => {
    setSelectedAnno(itemValue);
    let response = await apiService.get(
      `/ iseerange / get - isee - range /? academicYear = ${itemValue} `
    );
    const { data } = response;
    if (response.status == 200 && Array.isArray(data) && data.length > 0) {
      data.sort((a: { iseeMin: number; }, b: { iseeMin: number; }) => a.iseeMin - b.iseeMin); // Ordinamento per iseeMin crescente
      setIsees(data); // Imposta i range ISEE ricevuti
      setSelectedRange(data[0].nrRange);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.topbar}>
          <TornaIndietro />
          <Text style={styles.title}>Simulazione Borsa di Studio</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.inputLabel}>Dati personali</Text>

          <Text style={styles.boxText}>Anno accademico</Text>
          {anniAccademici.length > 0 ? (
            <Picker
              selectedValue={selectedAnno}
              style={styles.picker}
              onValueChange={(itemValue: string) =>
                handleAnnoAccademico(itemValue)
              }
            >
              {anniAccademici.map((annoAccademico) => (
                <Picker.Item
                  label={`${annoAccademico.academicYear} `}
                  value={annoAccademico.academicYear}
                />
              ))}
            </Picker>
          ) : (
            <Text style={styles.boxText}>
              Seleziona un anno accademico per caricare i range ISEE.
            </Text>
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
                  label={`Range ISEE: ${range.iseeMin}€ - ${range.iseeMax}€`}
                  value={range.nrRange}
                />
              ))}
            </Picker>
          ) : (
            <Text style={styles.boxText}>
              Seleziona un anno accademico per caricare i range ISEE.
            </Text>
          )}

          <Text style={styles.boxText}>Tipologia Studente</Text>
          <Picker
            selectedValue={tipologiaStudente}
            style={styles.picker}
            onValueChange={(itemValue: string) =>
              setTipologiaStudente(itemValue)
            }
          >
            <Picker.Item label="Fuori sede" value="Fuori sede" />
            <Picker.Item label="Pendolare" value="Pendolare" />
            <Picker.Item label="In sede" value="In sede" />
          </Picker>
          <View style={styles.switchContainer}>
            <Text style={styles.boxText}>
              Studente diversamente abile con disabilità pari o superiore al 66%
              o in possesso di attestazione di invalidità ex art. 3 c. 1 della
              l. 104/92.
            </Text>
            <Switch
              onValueChange={() => setDisabilita(!disabilita)}
              value={disabilita}
              color="#007BFF"
            />
          </View>

          <View style={styles.switchContainer}>
            <Text style={styles.boxText}>
              Studentessa frequentante corso di laurea S.T.E.M.
            </Text>
            <Switch
              onValueChange={() => setCorsoSTEM(!corsoSTEM)}
              value={corsoSTEM}
              color="#007BFF"
            />
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
            <TextInput
              style={styles.input}
              value={results.importoMensa}
              editable={false}
            />
            <Text style={styles.boxText}>Importo alloggio</Text>
            <TextInput
              style={styles.input}
              value={results.importoAlloggio}
              editable={false}
            />
            <Text style={styles.boxText}>Importo totale</Text>
            <TextInput
              style={styles.input}
              value={results.importoTotale}
              editable={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    marginBottom: "35%",
  },
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginStart: 90,
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 60, // Aggiungi spazio per la navbar
  },
  scrollContent: {
    padding: 20,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
  box: {
    backgroundColor: "#007FFF",
    padding: 10,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
    marginTop: 10,
  },
  card: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  boxText: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "#555",
  },
  buttonText: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
    color: "white",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "Black",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionContainerImport: {
    marginBottom: 30,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  sectionContainer: {
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  inputLabel: {
    textAlign: "center",
    padding: 13,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  toggleGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  toggleButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginLeft: 13,
    marginRight: 13,
  },
  toggleButtonSelected: {
    backgroundColor: "#0660ff",
    borderColor: "#0660ff",
  },
  toggleButtonText: {
    color: "#333",
    fontSize: 20,
  },
  picker: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
    marginRight: 15,
  },
});
