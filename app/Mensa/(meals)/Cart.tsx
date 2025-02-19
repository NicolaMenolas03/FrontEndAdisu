import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useCart } from '../../../context/CartContext';
import { useEffect, useState } from 'react';;
import CartMealCard from '@/components/CartMealCard';
import { useCRUD } from '@/hooks/useCRUD';
import { TypeBooking, TypeDailyMeal } from '@/app/lib/definitions';
import { apiService } from '@/services/api';
import { format } from 'date-fns';
import ConfirmationModal from '@/components/ConfirmationModal';
import ResultModal from '@/components/ResultModal';
import TimePicker from '@/components/TimePicker';
import { navigateToOrders } from '@/app/nav/utils';
import BreadCrumbCart from '@/components/breadcrumb/BreadCrumbCart';
import GlobalStyles from '@/app/GlobalStyles';

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
            navigateToOrders()
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
        <View style={GlobalStyles.mainContainer}>
            <BreadCrumbCart/>
            <Text style={styles.title}>Il tuo carrello</Text>

            <FlatList
                data={mealList}
                renderItem={({ item }) => (
                    <View>

                        <CartMealCard
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
                    message="Confermi l'ordine?"
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
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
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