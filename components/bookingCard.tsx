import { TypeBooking } from "@/app/lib/definitions";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from "react-native";
import ImagePasto from "./imagePasto";
import ConfirmationModal from "./ConfirmationModal";
import ResultModal from "./ResultModal";
import { useState, useRef } from "react";
import { format, parseISO } from "date-fns";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';

const { width } = Dimensions.get('window');

const statusColors: { [key: string]: string } = {
    'completo': '#4CAF50',
    'in corso': '#FFC107',
    'confermato': '#007FFF',
    'creato': '#4287f5'
};

const BookingCard = ({ item, deleteItem }: { item: TypeBooking, deleteItem: (id: number) => void }) => {
    const [confirmationDelete, setConfirmationDelete] = useState(false);
    const [resultDelete, setResultDelete] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const flipAnimation = useRef(new Animated.Value(0)).current;

    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, 'dd/MM/yyyy HH:mm');
    };

    const deleteOrder = ({ id }: { id: number }) => {
        try {
            deleteItem(id);
            setResultDelete(true);
            setDeleteSuccess(true);
        } catch (error) {
            setDeleteSuccess(false);
            setResultDelete(true);
        }
    };

    const flipCard = () => {
        Animated.spring(flipAnimation, {
            toValue: isFlipped ? 0 : 1,
            friction: 8,
            tension: 10,
            useNativeDriver: true,
        }).start(() => {
            setIsFlipped(!isFlipped);
        });
    };

    const frontInterpolate = flipAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });

    const backInterpolate = flipAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '360deg']
    });

    const frontAnimatedStyle = {
        transform: [{ rotateY: frontInterpolate }],
        opacity: flipAnimation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0, 0]
        })
    };

    const backAnimatedStyle = {
        transform: [{ rotateY: backInterpolate }],
        opacity: flipAnimation.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1]
        })
    };

    return (
        <View style={styles.container}>
            <View style={styles.cardContainer}>
                <Animated.View style={[styles.bookingCard, frontAnimatedStyle]}>
                    <View style={styles.topContainer}>
                        <Text style={styles.orderNumber}>#{item.id}</Text>
                        <View style={styles.statusContainer}>
                            <Text style={[
                                styles.statusText,
                                { backgroundColor: statusColors[item.status.toLowerCase()] || '#000000', borderRadius: 5, padding: 3, color: 'white' }
                            ]}>
                                {item.status}
                            </Text>
                            {item.status.toLocaleLowerCase() === 'confermato' && (
                                <TouchableOpacity onPress={flipCard} style={styles.qrIcon}>
                                    <Icon name="qrcode" size={24} color="#007FFF" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    <View style={styles.middleContainer}>
                        <Text style={styles.bookingText}>Data creazione: {formatDate(item.booking_date)}</Text>
                        <Text style={styles.bookingText}>Ritiro: {formatDate(item.collection_date)}</Text>
                        <Text style={styles.bookingText}>Mensa: {item.canteen.name}</Text>

                        <View style={styles.mealsContainer}>
                            {item.items?.map((value, index) => (
                                <View
                                    key={value.meal}
                                    style={[
                                        styles.mealImageWrapper,
                                        { left: index * 50 }
                                    ]}
                                >
                                    <ImagePasto meal_type={value.meal_type || ""} style={styles.mealImage} />
                                </View>
                            ))}
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={{ flex: 1 }}>
                            {item.status === 'Creato' &&
                                <TouchableOpacity onPress={() => setConfirmationDelete(true)}>
                                    <Icon name="trash-can-outline" size={24} color="grey" />
                                </TouchableOpacity>
                            }
                        </View>
                        <Text style={styles.totalText}>€{item.total_price}</Text>
                    </View>
                </Animated.View>

                <Animated.View style={[styles.bookingCard, styles.cardBack, backAnimatedStyle]}>
                    <TouchableOpacity onPress={flipCard} style={styles.backButton}>
                        <Icon name="arrow-left" size={24} color="#007FFF" />
                    </TouchableOpacity>
                    <Image
                        source={require('../assets/images/qr_code_test.png')}
                        style={styles.qrImage}
                        resizeMode="contain"
                    />
                </Animated.View>
            </View>

            <ConfirmationModal
                visible={confirmationDelete}
                message="Sei sicuro di voler eliminare l'ordine?"
                onConfirm={() => {
                    setConfirmationDelete(false);
                    deleteOrder({ id: item.id })
                }}
                onCancel={() => setConfirmationDelete(false)}
            />
            <ResultModal
                visible={resultDelete}
                successMessage='Ordine eliminato con successo'
                errorMessage="Errore durante l'eliminazione dell'ordine"
                success={deleteSuccess}
                onClose={() => setResultDelete(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width * 0.9,
        alignSelf: 'center',
        marginBottom: 20,
    },
    cardContainer: {
        height: 270,
        position: 'relative',
    },
    bookingCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        width: '100%',
        height: '100%',
        position: 'absolute',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardBack: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    middleContainer: {
        marginBottom: 15,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    orderNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#005dff',
    },
    statusText: {
        fontSize: 16,
        fontWeight: '600',
    },
    bookingText: {
        fontSize: 16,
        color: '#666',
        marginVertical: 2,
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#005dff',
    },
    qrIcon: {
        padding: 5,
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
    },
    qrImage: {
        width: 200,
        height: 200,
    },
    mealsContainer: {
        flexDirection: 'row',
        marginTop: 10,
        height: 80,
        position: 'relative',
    },
    mealImageWrapper: {
        position: 'absolute',
        width: 70,
        height: 70,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: 'white',
    },
    mealImage: {
        width: '100%',
        height: '100%',
    },
});

export default BookingCard;