import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Importa il tipo di navigazione per lo stack

type RootStackParamList = {
    landingPage: undefined;
    Profilo: undefined;
    Assistenza: undefined;
    News: undefined;
};



const Navbar = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const navigateToHome = () => {
    navigation.navigate('landingPage');}

    
    const navigateToNews = () => {
        navigation.navigate('landingPage');}

    const navigateToAssistenza = () => {
        navigation.navigate('landingPage');}

    const navigateToProfilo = () => {
        navigation.navigate('landingPage');}
    

    return (
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.navButton} onPress={navigateToHome}>
                <Icon name="home" size={24} color="white" />
                <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={navigateToNews}>
                <Icon name="newspaper" size={24} color="white" />
                <Text style={styles.navText}>News</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={navigateToAssistenza}>
                <Icon name="help-circle" size={24} color="white" />
                <Text style={styles.navText}>Assistenza</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={navigateToProfilo}>
                <Icon name="account" size={24} color="white" />
                <Text style={styles.navText}>Profilo</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 10,
        backgroundColor: '#007FFF',
        position: 'absolute',
        bottom: 0,
    },
    navButton: {
        alignItems: 'center',
    },
    navText: {
        color: 'white',
        marginTop: 5,
    },
});

export default Navbar;