import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function BackButton() {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
      <Text style={styles.backButtonText}>{'< Torna indietro'}</Text>
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
    fontSize: 14,
    color: '#005dff',
    fontWeight: 'bold',
  },
});
