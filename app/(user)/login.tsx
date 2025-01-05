import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import LogoAdisu from '@/components/logoAdisu';
import { authService } from '@/services/api';
import { useRouter } from "expo-router";

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [usernameError, setUsernameError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);

    const handleLogin = async () => {
        let response = await authService.login({ username: username, password: password }) as { status: Number, response: { data: { username?: String, password?: String } } };
        if (response.status == 200) {
            router.push("/(tabs)/landingPage");
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
                onChangeText={text => setUsername(text)}
                error={usernameError}
                style={styles.input}
                theme={{ colors: { primary: '#007BFF' } }}
            />
            <PaperTextInput
                mode="outlined"
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                error={passwordError}
                secureTextEntry
                style={styles.input}
                theme={{ colors: { primary: '#007BFF' } }}
            />
            <TouchableOpacity>
                <Text>Password dimenticata ? </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push("/Registration")}>
            <Text style={[styles.Registrati, { textDecorationLine: 'underline' }]}>
                Non hai un account ? Registrati
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
        width: '70%',
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: '#007FFF',
        padding: 10,
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
        marginTop: 10,
    },
    loginButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    Registrati: {
        marginTop: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 13,
        backgroundColor: '#FFFFFF',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});