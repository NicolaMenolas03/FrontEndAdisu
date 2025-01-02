import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';
import LogoAdisu from '@/components/logoAdisu';
import { authService } from '@/services/api';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Importa il tipo di navigazione per lo stack

const { width, height } = Dimensions.get('window');

type RootStackParamList = {
    Registration: undefined;
    landingPage: undefined;
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
      }

    const register = async () => {
        let response = await authService.register({
            first_name: name, last_name: surname, username: username, email: email, password: password,
            password2: password2
        });
        if(response.status == 201) {
            navigateTolandingPage;
        } else {
            // TODO: Create un messaggio di errore
            alert(response);
        }
    }


    
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <LogoAdisu />
                <Title style={styles.title}>Registration</Title>
                <TextInput
                    label="Name"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    label="Surname"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={(text) => setSurname(text)}
                />
                <TextInput
                    label="Username"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    label="Email"
                    mode="outlined"
                    keyboardType="email-address"
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    label="Password"
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    label="Confirm Password"
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={(text) => setPassword2(text)}
                />
                <Button
                    mode="contained"
                    onPress={register}
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

