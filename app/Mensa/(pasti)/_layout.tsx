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
                    <Ionicons name="home-outline" size={24} color="#333" />
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.navButton}
                    onPress={() => navigateToCart()}
                >
                    <View style={styles.cartContainer}>
                        <Ionicons name="cart-outline" size={24} color="#333" />
                        {cartItems > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{cartItems}</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.navButton}
                    onPress={() => router.push('/orders')}
                >
                    <Ionicons name="list-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 60,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    navButton: {
        padding: 10,
    },
    cartContainer: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        right: -6,
        top: -6,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});