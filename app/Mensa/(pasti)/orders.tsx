import { TypeBooking } from "@/app/lib/definitions";
import BookingCard from "@/components/bookingCard";
import { useCRUD } from "@/hooks/useCRUD";
import React from "react";
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Orders = () => {
    const { data, deleteItem } = useCRUD<TypeBooking>('/booking/');

    return (
        <View style={styles.container}>
            <Text style={styles.header}>I tuoi ordini</Text>
            <FlatList
                data={data}
                renderItem={({ item }) => <BookingCard item={item} deleteItem={deleteItem} />}
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
        paddingBottom: 90, 
    },
});

export default Orders;