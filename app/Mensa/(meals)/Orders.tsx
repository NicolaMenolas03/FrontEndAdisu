import GlobalStyles from "@/app/GlobalStyles";
import { TypeBooking } from "@/app/lib/definitions";
import BookingCard from "@/components/bookingCard";
import BreadCrumbOrder from "@/components/breadcrumb/BreadCrumbOrder";
import { useCRUD } from "@/hooks/useCRUD";
import React from "react";
import { View, Text, FlatList, StyleSheet } from 'react-native';

const Orders = () => {
    const { data, deleteItem } = useCRUD<TypeBooking>('/booking/');

    return (
        <View style={GlobalStyles.mainContainer}>
            <BreadCrumbOrder/>
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
    listContainer: {
        paddingBottom: 90, 
    },
});

export default Orders;