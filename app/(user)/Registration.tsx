import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';
import LogoAdisu from '@/components/logoAdisu';
import { authService } from '@/services/api';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Importa il tipo di navigazione per lo stack

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
    Registration: undefined;
    landingPage: undefined;
    login: undefined;
};

export default function Registration() {
    const [name, setName] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [password2, setPassword2] = React.useState('');

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const navigateTolandingPage = () => {
        navigation.navigate('landingPage');
    };

    const navigateToLogin = () => {
        navigation.navigate('login');
    };

    const register = async () => {
        let response = await authService.register({
            first_name: name, last_name: surname, username: username, email: email, password: password,
            password2: password2
        });
        if (response.status == 201) {
            navigateTolandingPage();
        } else {
            // TODO: Create un messaggio di errore
            alert(response);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
            <View style={styles.innerContainer}>
                <LogoAdisu />
                <Title style={styles.title}>Registrati</Title>
                <TextInput
                    label="Name"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={(text) => setName(text)}
                    theme={{ colors: { primary: '#007BFF' } }}
                />
                <TextInput
                    label="Surname"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={(text) => setSurname(text)}
                    theme={{ colors: { primary: '#007BFF' } }}
                />
                <TextInput
                    label="Username"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={(text) => setUsername(text)}
                    theme={{ colors: { primary: '#007BFF' } }}
                />
                <TextInput
                    label="Email"
                    mode="outlined"
                    keyboardType="email-address"
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                    theme={{ colors: { primary: '#007BFF' } }}
                />
                <TextInput
                    label="Password"
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)}
                    theme={{ colors: { primary: '#007BFF' } }}
                />
                <TextInput
                    label="Confirm Password"
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={(text) => setPassword2(text)}
                    theme={{ colors: { primary: '#007BFF' } }}
                />
                 <TouchableOpacity onPress={register} style={styles.RegisterButton}>
                                <Text style={styles.RegisterButtonText}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={navigateToLogin}>
                                <Text style={styles.Login}>
                                    Non hai un account ? <u>Login</u>
                                </Text>
                            </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    innerContainer: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: '#333',
        fontWeight: 'bold',
    },
    input: {
        width: width * 0.8, // Use width from Dimensions for responsive width
        margin: 10,
        backgroundColor: '#fff',
    },
    RegisterButton: {
        backgroundColor: '#007FFF',
        padding: 10,
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
        marginTop: 10,
    },
    RegisterButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    Login: {
        marginTop: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 13,
        backgroundColor: '#FFFFFF',
        marginBottom: 100,
    },
});