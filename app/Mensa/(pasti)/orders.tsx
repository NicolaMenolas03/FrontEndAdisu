import { TypeBooking } from "@/app/lib/definitions";
import { useCRUD } from "@/hooks/useCRUD";
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { red } from "react-native-reanimated/lib/typescript/Colors";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const statusColors: { [key: string]: string } = {
    'finished': '#4CAF50',  // Green
    'in_progress': '#FFC107',    // Yellow
    'confirmed': '#007FFF',  // Blue
    'created': '#000000'     // Black
};




const Orders = () => {
    const { data , deleteItem } = useCRUD<TypeBooking>('/booking/');

    const deleteOrder  = async ({ id }: { id: number }) => {
        let response = await deleteItem(id);
        
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
                            <TouchableOpacity onPress={() => deleteOrder({ id: item.id })}>
                                
                                <Icon name="trash-can-outline" size={24} color="grey" selectionColor={"red"}/>
                                
                            </TouchableOpacity>
                        }
                    </View>
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