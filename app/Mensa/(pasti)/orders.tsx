import { TypeBooking } from "@/app/lib/definitions";
import { useCRUD } from "@/hooks/useCRUD";
import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { red } from "react-native-reanimated/lib/typescript/Colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ConfirmationModal from '@/components/ConfirmationModal';
import ResultModal from "@/components/ResultModal";

const { width } = Dimensions.get('window');

const statusColors: { [key: string]: string } = {
    'finished': '#4CAF50',  // Green
    'in_progress': '#FFC107',    // Yellow
    'confirmed': '#007FFF',  // Blue
    'created': '#000000'     // Black
};




const Orders = () => {
    const { data, deleteItem } = useCRUD<TypeBooking>('/booking/');
    const [confirmationDelete, setConfirmationDelete] = React.useState(false);
    const [resultDelete, setResultDelete] = React.useState(false);
    const [deleteSuccess, setDeleteSuccess] = React.useState(false);

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
                        { color: statusColors[item.status.toLowerCase()] || '#000000' }
                    ]}>

                        {item.status}

                    </Text>
                </View>
                <View style={styles.middleContainer}>
                    <Text style={styles.bookingText}>Data creazione: {item.booking_date}</Text>
                    <Text style={styles.bookingText}>Ritiro: {item.collection_date}</Text>
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