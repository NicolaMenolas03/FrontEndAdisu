import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput as PaperTextInput, Button } from 'react-native-paper';
import LogoAdisu from '@/components/logoAdisu';
import { authService } from '@/services/api';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Registration: undefined;
    landingPage: undefined;
};

export default function login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [usernameError, setUsernameError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const navigateToRegistration = () => {
        navigation.navigate('Registration');
    };

    const navigateToLandingPage = () => {
        navigation.navigate('landingPage');
    };

    const login = async () => {
        let response = await authService.login({ username: username, password: password }) as { status: number, response: { data: { username?: string, password?: string } } };
        if (response.status == 200) {
            navigateToLandingPage();
        } else {
            setUsernameError(!!response.response.data.username);
            setPasswordError(!!response.response.data.password);
        }
    };

    return (
        <View style={styles.container}>
            <LogoAdisu />
            <Text style={styles.title}>Login</Text>
            <PaperTextInput
                mode="outlined"
                label="Username"
                value={username}
                onChangeText={setUsername}
                error={usernameError}
                style={styles.input}
                theme={{ colors: { primary: '#007BFF' } }}
            />
            <PaperTextInput
                mode="outlined"
                label="Password"
                value={password}
                onChangeText={setPassword}
                error={passwordError}
                secureTextEntry
                style={styles.input}
                theme={{ colors: { primary: '#007BFF' } }}
            />
            <TouchableOpacity>
                <Text>Password dimenticata ? </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={login} style={styles.LoginButton}>
                <Text style={styles.LoginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToRegistration}>
                <Text style={styles.Registrati}>
                    Non hai un account ? <u>Registrati</u>
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
        marginTop: -70,
    },
    title: {
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 40,
    },
    input: {
        width: '100%',
        marginBottom: 20,
    },
    LoginButton: {
        backgroundColor: '#007FFF',
        padding: 10,
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
        marginTop: 10,
    },
    LoginButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    Registrati: {
        marginTop: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 13,
    },
});