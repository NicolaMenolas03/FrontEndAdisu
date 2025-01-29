import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useCart } from '../../../context/CartContext';
import { useEffect, useState } from 'react';;
import MealCard from '@/components/mealCard';
import { useCRUD } from '@/hooks/useCRUD';
import { TypeBooking, TypePastiGioralieri } from '@/app/lib/definitions';
import { apiService } from '@/services/api';
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns';
import { router } from 'expo-router';


export default function Cart() {
    const [unavailableMeals, setUnavailableMeals] = useState<number[]>([]);
    const [selectedTime, setSelectedTime] = useState('10:00');
    const timeSlots = Array.from({ length: 12 }, (_, i) => {
        const hour = i + 11;
        return `${hour}:00`;
    });

    const { selectedMeals, addToCart, removeFromCart, canteen_id } = useCart();
    const { createItem } = useCRUD<TypeBooking>("/booking/");

    const mealList = Object.values(selectedMeals);
    
    const formatCollectionDate = (time: string) => {
        const today = new Date();
        const [hours] = time.split(':');
        today.setHours(parseInt(hours), 0, 0);
        return format(today, "yyyy-MM-dd'T'HH:mm:ss");
    };

    const confirmOrder = async () => {
        let response = await createItem({
            "collection_date": formatCollectionDate(selectedTime),
            "items": mealList.map((item) => ({ "meal": item.meal.id, "quantity": item.quantity })), 
            "canteen_id": canteen_id,
        })
        if (response) {
            router.push(`/Mensa/(pasti)/orders?id=${response.id}`);
        }
    };

    useEffect(() => {
        checkMealAvailability();
    }, []);
    
    const checkMealAvailability = async () => {
        try {
            const response = await apiService.post<TypePastiGioralieri[]>('daily_meals/check_meal_available/', {
                ids: mealList.map((item) => item.meal.id),
            });
            setUnavailableMeals(response.data.map((item) => item.id));
        } catch (error) {
            console.error('Error checking meal availability:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View>
            </View>
            <Text style={styles.title}>Il tuo carrello</Text>
            
            <FlatList 
                data={mealList}
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

            <View style={styles.bottomContainer}>
                <Picker
                    selectedValue={selectedTime}
                    style={styles.timePicker}
                    onValueChange={(itemValue) => setSelectedTime(itemValue)}
                >
                    {timeSlots.map((time) => (
                        <Picker.Item key={time} label={time} value={time} />
                    ))}
                </Picker>

                <TouchableOpacity 
                    style={styles.confirmButton} 
                    onPress={() => {confirmOrder()}}>
                    <Text style={styles.confirmButtonText}>Conferma ordine</Text>
                </TouchableOpacity>
            </View>
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
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        width: '55%',
    },
    confirmButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    timePicker: {
        width: '40%',
        height: 50,
        borderRadius: 8,
    },
});