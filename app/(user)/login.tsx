import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import LogoAdisu from '@/components/logoAdisu';
import { authService } from '@/services/api';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Importa il tipo di navigazione per lo stack

type RootStackParamList = {
    Registration: undefined;
    landingPage: undefined;
  };

export default function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [usernameError, setUsernameError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);

 const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
      
      const navigateTolandingPage = () => {
        navigation.navigate('landingPage');
      }
    const login = async () => {
        let response = await authService.login({username: username, password: password});
        if(response.status == 200) {
            navigateTolandingPage;
        } else {
            setUsernameError(!!response.response.data.username);
            setPasswordError(!!response.response.data.password);
        }
    };

    return (
        <View style={styles.container}>
            <LogoAdisu />
            <Text style={styles.title}>Login</Text>
            <TextInput
                mode='outlined'
                label="Username"
                value={username}
                onChangeText={setUsername}
                error={usernameError}
                style={styles.input}
                theme={{ colors: { primary: '#007BFF' } }}
            />
            <TextInput
                mode='outlined'
                label="Password"
                value={password}
                onChangeText={setPassword}
                error={passwordError}
                secureTextEntry
                style={styles.input}
                theme={{ colors: { primary: '#007BFF' } }}
            />
            <Button 
                mode="contained" 
                onPress={login}
                style={styles.buttonContent}
                theme={{ colors: { primary: '#007BFF' } }} 
                 >
                Login
            </Button>
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
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        marginBottom: 20,
    },
    button: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
        
    },
    buttonContent: {
        width: '60%',
    },
});