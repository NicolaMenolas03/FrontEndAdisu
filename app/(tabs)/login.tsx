import React from 'react';
import { Text, View, StyleSheet ,TouchableOpacity ,Image ,} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import LogoAdisu from '@/components/logoAdisu';

export default function Login() {
    return (
        <View style={styles.container}>
             
            <LogoAdisu/>

            <Text style= {styles.title}>Login</Text>
            
            <TextInput 
                placeholder="Email" 
                maxLength={30}
                style={styles.input}
            
            />

            <TextInput 

                placeholder="Password"   
                maxLength={30}
                secureTextEntry={true}
                style={styles.input}
            />
            <TouchableOpacity>
                <Text>Password dimenticata ? </Text>
            </TouchableOpacity>
            <TouchableOpacity   onPress={() => {
                window.location.href = 'landingPage';
              }} style={styles.LoginButton}>   

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
});
