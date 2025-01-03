import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Navbar = () => {
    return (
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.navButton}>
                <Icon name="home" size={24} color="white" />
                <Text style={styles.navText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
                <Icon name="newspaper" size={24} color="white" />
                <Text style={styles.navText}>News</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
                <Icon name="help-circle" size={24} color="white" />
                <Text style={styles.navText}>Assistenza</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton}>
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
        borderTopWidth: 1,
        borderTopColor: '#ddd',
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