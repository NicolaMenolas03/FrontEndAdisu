import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';
import LogoAdisu from '@/components/logoAdisu';

const { width, height } = Dimensions.get('window');

export default function Registration() {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <LogoAdisu />
                <Title style={styles.title}>Registration</Title>
                <TextInput
                    label="Name"
                    mode="outlined"
                    style={styles.input}
                />
                <TextInput
                    label="Surname"
                    mode="outlined"
                    style={styles.input}
                />
                <TextInput
                    label="Username"
                    mode="outlined"
                    style={styles.input}
                />
                <TextInput
                    label="Email"
                    mode="outlined"
                    keyboardType="email-address"
                    style={styles.input}
                />
                <TextInput
                    label="Password"
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                />
                <TextInput
                    label="Confirm Password"
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                />
                <Button
                    mode="contained"
                    onPress={() => { window.location.href = 'landingPage'; }}
                    style={styles.registerButton}
                >
                    Register
                </Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    container: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: width * 0.8, // Use width from Dimensions for responsive width
        margin: 10,
        backgroundColor: '#fff',
    },
    registerButton: {
        marginTop: 20,
        width: width * 0.8, // Use width from Dimensions for responsive width
        padding: 10,
        borderRadius: 5,
    },
});

