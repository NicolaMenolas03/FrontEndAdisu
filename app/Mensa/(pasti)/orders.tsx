import { TypeBooking } from "@/app/lib/definitions";
import { useCRUD } from "@/hooks/useCRUD";
import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { red } from "react-native-reanimated/lib/typescript/Colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfirmationModal from '@/components/ConfirmationModal';
import ResultModal from "@/components/ResultModal";
import { format, parseISO } from "date-fns";
import ImagePasto from "@/components/imagePasto";

const { width } = Dimensions.get('window');

const statusColors: { [key: string]: string } = {
    'finished': '#4CAF50',  
    'in_progress': '#FFC107',    
    'confirmed': '#007FFF',  
    'created': '#4287f5'     
};




const Orders = () => {
    const { data, deleteItem } = useCRUD<TypeBooking>('/booking/');
    const [confirmationDelete, setConfirmationDelete] = React.useState(false);
    const [resultDelete, setResultDelete] = React.useState(false);
    const [deleteSuccess, setDeleteSuccess] = React.useState(false);

    const formatDate = (dateString: string) => {
        const date = parseISO(dateString);
        return format(date, 'dd/MM/yyyy HH:mm');
    };

    const deleteOrder = async ({ id }: { id: number }) => {
        try{
            await deleteItem(id);
            setDeleteSuccess(true);
        } catch (error) {
            setDeleteSuccess(false);
        }
        setResultDelete(true);
    }

    const renderBooking = ({ item }: { item: TypeBooking }) => {

        return (
            <View style={styles.bookingCard}>
                <View style={styles.topContainer}>
                    <Text style={styles.orderNumber}>#{item.id}</Text>
                    <Text style={[
                        styles.statusText,
                        { backgroundColor: statusColors[item.status.toLowerCase()] || '#000000', borderRadius: 5, padding: 3, color: 'white' }
                    ]}>

                        {item.status}

                    </Text>
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
                                <ImagePasto meal_type={value.meal_type} style={styles.mealImage} />
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={{ flex: 1 }}>
                        {item.status === 'created' &&
                            <TouchableOpacity onPress={() => setConfirmationDelete(true)}>

                                <Icon name="trash-can-outline" size={24} color="grey" selectionColor={"red"} />

                            </TouchableOpacity>
                        }
                    </View>
                    <ConfirmationModal
                        visible={confirmationDelete}
                        body="Sei sicuro di voler eliminare l'ordine?"
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
                    <Text style={styles.totalText}>€{item.total_price}</Text>
                </View>

            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>I tuoi ordini</Text>
            <FlatList
                data={data}
                renderItem={renderBooking}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    listContainer: {
        paddingBottom: 90, // Space for navbar
    },
    bookingCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
        width: width * 0.9,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
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
        width: '100%'
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
    }
});

export default Orders;