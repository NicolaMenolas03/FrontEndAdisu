import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useCart } from '../../../context/CartContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { router } from 'expo-router';
import MealCard from '@/components/mealCard';



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

                <Text>
                    <TouchableOpacity onPress={() => {navigateToPasti("2")}}>
                        Pasti
                    </TouchableOpacity>
                </Text>

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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
    },
    unavailable: {
        color: 'red',
    }
});