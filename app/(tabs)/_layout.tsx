import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const Navbar = () => {
    return (
        <View style={styles.navbar}>
            <Link href="/" style={styles.link}>
                <Text style={styles.linkText}>Home</Text>
            </Link>
            <Link href="../about" style={styles.link}>
                <Text style={styles.linkText}>About</Text>
            </Link>
            <Link href="../contact" style={styles.link}>
                <Text style={styles.linkText}>Contact</Text>
            </Link>
        </View>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#333',
    },
    link: {
        padding: 10,
    },
    linkText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default Navbar;