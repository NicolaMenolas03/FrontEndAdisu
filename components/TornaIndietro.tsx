import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function BackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.backButton} onPress={() => router.push('/BorsaDiStudio/BorsaDiStudioPage')}>
      <Ionicons
      name="arrow-back"
      style={styles.backButtonText}>

      </Ionicons>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 0,
    position: 'absolute',
    top: 10,
    left: 15,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 28,
    color: '#007fff',
    fontWeight: 'bold',
  },
});
