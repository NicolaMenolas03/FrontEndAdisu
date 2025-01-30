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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


export default function Cart() {
    const [unavailableMeals, setUnavailableMeals] = useState<number[]>([]);
    const [selectedTime, setSelectedTime] = useState('10:00');
    const timeSlots = Array.from({ length: 12 }, (_, i) => {
        const hour = i + 11;
        return `${hour}:00`;
    });

    const { selectedMeals, addToCart, removeFromCart, canteen_id } = useCart();
    const { createItem, deleteItem} = useCRUD<TypeBooking>("/booking/");

    const mealList = Object.values(selectedMeals);
    
    const formatCollectionDate = (time: string) => {
        const today = new Date();
        const [hours] = time.split(':');
        today.setHours(parseInt(hours), 0, 0);
        return format(today, "yyyy-MM-dd'T'HH:mm:ss");
    };


  const navigateToMensa = () => {
          router.push(`/Mensa/mensa`);
      };

    const navigateToHome = () => {
        router.push(`/(tabs)/landingPage`);
    };

    const navigateToPasti = () => {
        router.push(`/Mensa/pasti?mensaId=${canteen_id}`);
    }

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
            <View style={styles.containerMensa}>
                <Icon
                    name="arrow-left"
                    size={28}
                    color="#007FFF"
                    style={styles.icon}
                    onPress={navigateToPasti}
                />
                <Text>
                    <TouchableOpacity 
                        onPress={navigateToHome} 
                        style={styles.breadcrumbItem}
                        activeOpacity={0.6}
                    >
                        <Text style={styles.breadcrumbItem}>Home</Text>
                    </TouchableOpacity>
                    <Text style={styles.breadcrumbSeparator}>/</Text>
                    <TouchableOpacity 
                        onPress={navigateToMensa} 
                        style={styles.breadcrumbItem}
                        activeOpacity={0.6}
                    >
                        <Text style={styles.breadcrumbItem}>Mensa</Text>
                    </TouchableOpacity>
                    <Text style={styles.breadcrumbSeparator}>/</Text>
                    <TouchableOpacity 
                        onPress={navigateToPasti} 
                        style={styles.breadcrumbItem}
                        activeOpacity={0.6}
                    >
                        <Text style={styles.breadcrumbItem}>Pasti</Text>
                    </TouchableOpacity>
                    <Text style={styles.breadcrumbSeparator}>/</Text>
                    <Text style={[styles.breadcrumbItem, styles.breadcrumbActive]}>Carrello</Text>
                </Text>
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
    containerMensa: {
        marginLeft: -5,
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 6,
    },

    breadcrumbItem:{
        fontSize: 16,
        color: '#007FFF',
        marginHorizontal: 5,
        textDecorationLine: 'underline',
    },
    breadcrumbActive: {
        color: '#666',
        textDecorationLine: 'none',
    },
    breadcrumbSeparator: {
        color: '#666',
        marginHorizontal: 5,
    },
    
    icon: {
        marginRight: 10,
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