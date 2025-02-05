import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeButton() {
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleHomePress = () => {
    setModalVisible(true);
  };

  const confirmExit = async () => {
    await AsyncStorage.removeItem('formDatiAnagrafici');
    await AsyncStorage.removeItem('formDatiEconomici');
    await AsyncStorage.removeItem('formDatiEsame');
    await AsyncStorage.removeItem('formDatiResidenza');
    await AsyncStorage.removeItem('formDatiScolatici');
    setModalVisible(false);
    router.push('/BorsaDiStudio/BorsaDiStudioPage'); // Cambia con la route della tua pagina principale
  };

  return (
    <View>
      <Ionicons
        name="home-outline"
        size={28}
        color="#007fff"
        onPress={handleHomePress}
        style={styles.icon}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Sei sicuro di voler abbandonare la richiesta?</Text>
            <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.boxindietro}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.buttonTextindietro}>Annulla</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.box} onPress={confirmExit}>
                    <Text style={styles.buttonText}>Conferma</Text>
                  </TouchableOpacity>
                </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  box: {
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
