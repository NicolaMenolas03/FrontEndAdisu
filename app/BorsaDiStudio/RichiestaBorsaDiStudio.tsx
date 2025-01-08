import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Picker, CheckBox, ScrollView, Button, TouchableOpacity } from 'react-native';
import Navbar from '@/components/Navbar';

export default function BorsaDiStudioPage() {
  const [selectedEsami, setSelectedEsami] = useState([]);
  const [esami, setEsami] = useState([
    { nome: 'Matematica 1', data: '01/01/2023', cfu: 6 },
    { nome: 'Fisica', data: '15/02/2023', cfu: 8 },
    { nome: 'Programmazione', data: '10/03/2023', cfu: 9 },
  ]);

  const addEsame = (esame) => {
    setSelectedEsami([...selectedEsami, esame]);
  };

  const removeEsame = (index) => {
    setSelectedEsami(selectedEsami.filter((_, i) => i !== index));
  };

  const importEsami = () => {
    // Placeholder logic for importing exams, replace with actual logic if needed
    const importedEsami = [
      { nome: 'Analisi Matematica 2', data: '12/05/2023', cfu: 6 },
      { nome: 'Chimica', data: '20/06/2023', cfu: 5 },
    ];
    setSelectedEsami([...selectedEsami, ...importedEsami]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <Text style={styles.sectionTitle}>Dati Personali</Text>

          <TextInput
            style={styles.input}
            placeholder="Matricola"
          />

          <Picker style={styles.picker}>
            <Picker.Item label="Seleziona Anno Accademico" value="" />
            <Picker.Item label="2023/2024" value="2023/2024" />
            <Picker.Item label="2024/2025" value="2024/2025" />
          </Picker>

          <Picker style={styles.picker}>
            <Picker.Item label="Seleziona Corso di Laurea" value="" />
            <Picker.Item label="Ingegneria Informatica" value="Ingegneria Informatica" />
            <Picker.Item label="Economia" value="Economia" />
            <Picker.Item label="Medicina" value="Medicina" />
          </Picker>

          <Picker style={styles.picker}>
            <Picker.Item label="Seleziona Dipartimento" value="" />
            <Picker.Item label="Dipartimento di Scienze" value="Scienze" />
            <Picker.Item label="Dipartimento di Ingegneria" value="Ingegneria" />
            <Picker.Item label="Dipartimento di Lettere" value="Lettere" />
          </Picker>

          <Picker style={styles.picker}>
            <Picker.Item label="Seleziona Sede" value="" />
            <Picker.Item label="Bari" value="Bari" />
            <Picker.Item label="Taranto" value="Taranto" />
            <Picker.Item label="Brindisi" value="Brindisi" />
          </Picker>

          <Picker style={styles.picker}>
            <Picker.Item label="Durata del Corso" value="" />
            <Picker.Item label="1 anno" value="1" />
            <Picker.Item label="2 anni" value="2" />
            <Picker.Item label="3 anni" value="3" />
            <Picker.Item label="4 anni" value="4" />
            <Picker.Item label="5 anni" value="5" />
          </Picker>

          <View style={styles.checkboxContainer}>
            <CheckBox />
            <Text style={styles.label}>Sono uno studente lavoratore</Text>
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Esami Passati</Text>

          {selectedEsami.map((esame, index) => (
            <View key={index} style={styles.esameContainer}>
              <Text style={styles.label}>{esame.nome}</Text>
              <Text style={styles.label}>Data: {esame.data}</Text>
              <Text style={styles.label}>CFU: {esame.cfu}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeEsame(index)}
              >
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}

          <View style={styles.actionButtonsContainer}>
            <Picker
              style={[styles.picker, { flex: 1 }]}
              onValueChange={(itemValue) => {
                const selected = esami.find((e) => e.nome === itemValue);
                if (selected) addEsame(selected);
              }}
            >
              <Picker.Item label="Aggiungi un Esame" value="" />
              {esami.map((esame, index) => (
                <Picker.Item key={index} label={esame.nome} value={esame.nome} />
              ))}
            </Picker>
            <TouchableOpacity style={styles.importButton} onPress={importEsami}>
              <Text style={styles.importButtonText}>Importa Esami</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Dati ISEE</Text>

          <TextInput
            style={styles.input}
            placeholder="ISEE Attuale"
          />

          <TextInput
            style={styles.input}
            placeholder="Data Rilascio ISEE"
          />

          <View style={styles.checkboxContainer}>
            <CheckBox />
            <Text style={styles.label}>
              Autorizzo l'Università degli Studi di Bari all'acquisizione dei dati ISEE dalla banca dati dell'INPS
            </Text>
          </View>
        </View>
      </ScrollView>

      <Navbar namePage="BorsaDiStudioPage" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0660ff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  picker: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginLeft: 8,
  },
  esameContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 5,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 15,
  },
  importButton: {
    backgroundColor: '#0660ff',
    padding: 10,
    borderRadius: 5,
  },
  importButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
