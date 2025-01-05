import { router } from 'expo-router';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface NavbarProps {
    namePage: string;
}

const Navbar = ({namePage}:NavbarProps) => {

    return (
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.navButton} onPress={()=>router.push("/(tabs)/landingPage")}>
                <Icon name="home" size={30} color={namePage==='landingPage'?'white':'#6fa3ff'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={()=>router.push("/News")}>
                <Icon name="newspaper" size={30} color="#6fa3ff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={()=>router.push("/Assistenza")}>
                <Icon name="help-circle" size={30} color="#6fa3ff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={()=>router.push("/Profilo")}>
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