import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
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
        name="home"
        size={28}
        color="#005dff"
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
            <View style={styles.modalButtons}>
              <Button mode="outlined" onPress={() => setModalVisible(false)}>
                Annulla
              </Button>
              <Button mode="contained" buttonColor="#ff4d4d" onPress={confirmExit}>
                Conferma
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
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
});
