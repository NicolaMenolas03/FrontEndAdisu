import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Navbar from '@/components/Navbar';
import { Card } from 'react-native-paper';
import TornaIndietro from '@/components/TornaIndietro';

export default function DatiBorsaDiStudio() {
  return (
    <View style={styles.container}>
      <TornaIndietro />
      <ScrollView contentContainerStyle={styles.scholarshipContainer}>
        <Text style={styles.title}>Dati Borsa di Studio</Text>

        {/* Prima sezione */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Dati Personali</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Matricola</Text>
              <TextInput style={styles.input} value="--------" editable={false} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tipo Borsa di Studio</Text>
              <TextInput style={styles.input} value="--------" editable={false} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Tipo Studente</Text>
              <TextInput style={styles.input} value="--------" editable={false} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Fascia Reddito</Text>
              <TextInput style={styles.input} value="--------" editable={false} />
            </View>
          </Card.Content>
        </Card>

        {/* Seconda sezione */}
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Importi</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Importo Mensa</Text>
              <TextInput style={styles.input} value="--------" editable={false} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Importo Alloggio</Text>
              <TextInput style={styles.input} value="--------" editable={false} />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Importo Totale</Text>
              <TextInput style={styles.input} value="--------" editable={false} />
            </View>
          </Card.Content>
        </Card>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scholarshipContainer: {
    padding: 20,
    paddingBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
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
