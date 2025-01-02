import React from 'react';
import { Text, View, StyleSheet ,TouchableOpacity ,Image ,} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import LogoAdisu from '@/components/logoAdisu';
import { authService } from '@/services/api';

export default function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [usernameError, setUsernameError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);

    const login = async () => {
        let response = await authService.login({username: username, password: password});
        if(response.status == 200) {
            window.location.href = 'landingPage';
        } else {
            setUsernameError(!!response.response.data.username);
            setPasswordError(!!response.response.data.password);
        }
    }   


    return (
        <View style={styles.container}>
             
            <LogoAdisu/>

            <Text style= {styles.title}>Login</Text>
            
            <TextInput 
                id="username"
                placeholder="Username" 
                maxLength={30}
                style={[styles.input, usernameError && styles.errorInput]}
                onChangeText={(text) => setUsername(text)}
            />
    
            <TextInput 
                id="password"
                placeholder="Password"   
                maxLength={30}
                secureTextEntry={true}
                style={[styles.input, passwordError && styles.errorInput]}
                onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity>
                <Text>Password dimenticata ? </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={login} style={styles.LoginButton}>   
            Login
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                window.location.href = 'Registration';
              }} >  
                <Text style= {styles.Registrati}>Non hai un account ? <u>Registrati</u></Text>
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
        textIndent: '-152px',
        textAlign: 'left',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 40,
    },
    input : {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1, 
        margin: 10,
        padding: 10,
        borderRadius: 5,
        width: 300,
        
    },
    LoginButton: {
        backgroundColor: '#007FFF',
        padding: 10,
        borderRadius: 5,
        width: 300,
        alignItems: 'center',
        marginTop: 10,
        color: 'white',
        fontFamily: 'Roboto',
    },
    Registrati: {
        marginTop: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 13,


    },
    errorInput: {
        borderColor: 'red',
        borderWidth: 1,
    },
});
