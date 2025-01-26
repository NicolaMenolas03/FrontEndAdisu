import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack'; // Importa il tipo di navigazione per lo stack
import landingPage from '@/app/(tabs)/landingPage';

type RootStackParamList = {
    landingPage: undefined;
    Profilo: undefined;
    Assistenza: undefined;
    News: undefined;
};

interface NavbarProps {
    namePage: string;
}

const Navbar = ({namePage}:NavbarProps) => {

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
                <Icon name="home" size={30} color={namePage==='landingPage'?'white':'#6fa3ff'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={navigateToNews}>
                <Icon name="newspaper" size={30} color="#6fa3ff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={navigateToAssistenza}>
                <Icon name="help-circle" size={30} color="#6fa3ff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={navigateToProfilo}>
                <Icon name="account" size={30} color="#6fa3ff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        paddingVertical: 10,
        backgroundColor: '#005dff',
        position: 'absolute',
        bottom: 0,
        borderRadius: 40
    },
    navButton: {
        backgroundColor: '',
        borderRadius: 50,
        alignItems: 'center',
        padding:10,
    },
    navText: {
        color: 'white',
        marginTop: 5,
    },
});

export default Navbar;