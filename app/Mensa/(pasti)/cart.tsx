import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useCart } from '../../../context/CartContext';
import { useEffect, useState } from 'react';;
import MealCard from '@/components/mealCard';
import { useCRUD } from '@/hooks/useCRUD';
import { TypeBooking, TypeDailyMeal } from '@/app/lib/definitions';
import { apiService } from '@/services/api';
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns';
import { router } from 'expo-router';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ConfirmationModal from '@/components/ConfirmationModal';
import ResultModal from '@/components/ResultModal';
import TimePicker from '@/components/TimePicker';
import { navigateToHome, navigateToMensa, navigateToPasti } from '@/app/nav/utils';

export default function Cart() {
    const { selectedMeals, addToCart, removeFromCart, clearCart, canteen_id, totalPrice } = useCart();
    const { createItem } = useCRUD<TypeBooking>("/booking/");
    const [unavailableMeals, setUnavailableMeals] = useState<number[]>([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [showResultModalTimer, setShowResultModalTimer] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const mealList = Object.values(selectedMeals);

    const str_canteen_id = String(canteen_id || '');

    const formatCollectionDate = (time: string) => {
        const today = new Date();
        const [hours] = time.split(':');
        today.setHours(parseInt(hours), 0, 0);
        return format(today, "yyyy-MM-dd'T'HH:mm:ss");
    };

    const checkTime = () => {
        if (selectedTime === '') {
            setShowResultModalTimer(true);
        } else {
            setShowConfirmModal(true);
        }
    }

    const handleConfirmOrder = async () => {
        try {
            await createItem({
                "collection_date": formatCollectionDate(selectedTime),
                "items": mealList.map((item) => ({ "meal": item.meal.id, "quantity": item.quantity })),
                "canteen_id": canteen_id,
            });
            setOrderSuccess(true);
            setShowResultModal(true);
            clearCart();
        } catch (error) {
            setOrderSuccess(false);
            setShowResultModal(true);
        }
    };

    const handleResultClose = () => {
        setShowResultModal(false);
        if (orderSuccess) {
            router.push('/Mensa/(pasti)/orders');
        }
    };

    const checkMealAvailability = async () => {
        try {
            const response = await apiService.post<TypeDailyMeal[]>('daily_meals/check_meal_available/', {
                ids: mealList.map((item) => item.meal.id),
            });
            setUnavailableMeals(response.data.map((item) => item.id));
        } catch (error) {
            console.error('Error checking meal availability:', error);
        }
    };

    useEffect(() => {
        checkMealAvailability();
    }, []);

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
                    onPress={() => {navigateToPasti(str_canteen_id)}}
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
                        onPress={() => {navigateToPasti(str_canteen_id)}}
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
                    <View>

                        <MealCard
                            meal={item.meal}
                            quantity={item.quantity}
                            incrementQuantity={() => addToCart(item.meal)}
                            decrementQuantity={() => removeFromCart(item.meal.id)}
                        />
                        {unavailableMeals.includes(item.meal.id) && (
                            <Text style={styles.unavailable}>Non disponibile</Text>
                        )}
                    </View>

                )}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>Totale:</Text>
                <Text style={styles.totalPrice}>€ {totalPrice.toFixed(2)}</Text>
            </View>

            <View style={styles.bottomContainer}>
                <TimePicker onTimeSelect={setSelectedTime} />

                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={mealList.length > 0 ? () => checkTime() : () => { }}>
                    <Text style={styles.confirmButtonText}>Conferma ordine</Text>
                </TouchableOpacity>

                <ConfirmationModal
                    visible={showConfirmModal}
                    body="Confermi l'ordine?"
                    onConfirm={() => {
                        setShowConfirmModal(false);
                        handleConfirmOrder();
                    }}
                    onCancel={() => setShowConfirmModal(false)}
                />

                <ResultModal
                    successMessage='Ordine effettuato con successo'
                    errorMessage="Errore durante l'invio dell'ordine"
                    visible={showResultModal}
                    success={orderSuccess}
                    onClose={handleResultClose}
                />

                <ResultModal
                    successMessage=''
                    errorMessage="Seleziona un orario di ritiro"
                    visible={showResultModalTimer}
                    success={false}
                    onClose={() => setShowResultModalTimer(false)}
                />
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

    breadcrumbItem: {
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
    totalContainer: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007AFF',
    }
});