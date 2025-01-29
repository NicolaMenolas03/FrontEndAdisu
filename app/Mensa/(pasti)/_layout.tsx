import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { router, Stack } from 'expo-router';
import { CartProvider, useCart } from '../../../context/CartContext';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <CartProvider>
            <LayoutContent>{children}</LayoutContent>
        </CartProvider>
    );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
    const { getTotalItems } = useCart();
    const cartItems = getTotalItems();
    const navigateToLeandingPage = () => {
            router.push(`/(tabs)/landingPage`);
        };

    const navigateToCart = () => {
            router.push(`/Mensa/(pasti)/cart`);
    };

    const navigateToOrders = () => {
            router.push(`/Mensa/(pasti)/orders`);
    };


    return (
        <View style={styles.container}>
             
            <View style={styles.content}>
            <Stack
                    screenOptions={{ headerShown: false }}
                    >
            </Stack>
                {children}
            </View>
            
            <View style={styles.navbar}>
                <TouchableOpacity 
                    style={styles.navButton}
                    onPress={() => navigateToLeandingPage()}
                >
                    <Ionicons name="home-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.navButton}
                    onPress={navigateToCart}
                >
                    <View style={styles.cartContainer}>
                        <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
                        {cartItems > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{cartItems}</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.navButton}
                    onPress={() => router.push('../orders')}
                >
                    <Ionicons name="list-outline" size={24} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        paddingBottom: 60, // Exact height of navbar without extra padding
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center', // Add this to center items vertically
        width: '90%',
        backgroundColor: '#005dff',
        borderRadius: 40,
        alignSelf: 'center',
        height: 60,
        marginHorizontal: 20,
        marginBottom: 10,
        position: 'absolute',
        bottom: 10,
    },
    navButton: {
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center', // Add this to center icons
        padding: 10,
        height: '100%', // Make buttons full height
    },
    cartContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    badge: {
        position: 'absolute',
        top: -8,
        right: -8,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    }
});