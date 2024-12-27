import React from 'react';
import { Text, View, StyleSheet ,TouchableOpacity ,Image} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default function Login() {
    return (
        <View style={styles.container}>
             
             <Image
                source={require('@/assets/images/LogoAdisu.png')}
                style={styles.headerImage}
            />

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
                window.location.href = 'landingPage.tsx';
              }} style={styles.LoginButton}>   

            Login
            </TouchableOpacity>
            <TouchableOpacity> {/* aggiungere il link alla pagina di registrazione*/}
                <Text style= {styles.Registrati}>Non hai un account ? Registrati</Text>
            </TouchableOpacity>
        </View>
        
        
    );
}

const styles = StyleSheet.create({
    
 
    headerImage: {
        alignSelf: 'center',
        marginBottom: 20,
        resizeMode: "contain",
        width: 200, // 50% of screen width
        height: 200, // 20% of screen height
        
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
        

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
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

    title: {
        textIndent: '-152px',
        textAlign: 'left',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 40,
    },

    Registrati: {
        marginTop: 20,
        color: '#007FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
});
