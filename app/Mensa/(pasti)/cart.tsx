import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useCart } from '../../../context/CartContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { router } from 'expo-router';
import MealCard from '@/components/mealCard';




const { width } = Dimensions.get('window');

export default function Cart() {
    const { selectedMeals, addToCart, removeFromCart } = useCart();
    const [unavailableMeals, setUnavailableMeals] = useState<number[]>([]);

    const navigateToPasti = (mensaId: string) => {
        router.push(`/Mensa/pasti?mensaId=${mensaId}`);
    };

    useEffect(() => {
        checkMealAvailability();
    }, []);

    const checkMealAvailability = async () => {
        try {
            const response = await axios.post('/daily_meals/check_meal_available/', {
                ids: selectedMeals
            });
            setUnavailableMeals(response.data.unavailable_meals);
        } catch (error) {
            console.error('Error checking meal availability:', error);
        }
    };
    console.log(selectedMeals);
    return (
        <View style={styles.container}>
            <View>

            

            </View>
            <Text style={styles.title}>Il tuo carrello</Text>
            
            <FlatList 
                data={Object.values(selectedMeals)}
                renderItem={({ item }) => (
                    <View style={styles.mealItem}>
                        
                        <MealCard
                        meal = {item.meal}
                        quantity = {item.quantity}
                        incrementQuantity={() => addToCart(item.meal)}
                        decrementQuantity={() => removeFromCart(item.meal.id)}

                        />
                        {unavailableMeals.includes(item.meal.id) && (
                            <Text style={styles.unavailable}>Non disponibile</Text>
                        )}
                    </View>

                )}
            />

            <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={() => {navigateToPasti("2")}}>
                <Text style={styles.confirmButtonText}>Conferma ordine</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white', // Make container background transparent
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    mealItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff', // Add white background to meal items only
    },
    unavailable: {
        color: 'red',
    },

    confirmButton: {
        backgroundColor: '#005dff',
        padding: 15,
        borderRadius: 30,
        width: width * 0.8, // 80% of screen width
        alignSelf: 'center',
        position: 'absolute',
        bottom: 50, // Adjust based on navbar height + margin
    },
    confirmButtonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    }
});