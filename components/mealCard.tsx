import {TypePasti } from '@/app/lib/definitions';
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Allergen from './allergen';
import ImagePasto from './imagePasto';



const MealCard = ({ meal, quantity, incrementQuantity, decrementQuantity }: {meal: TypePasti, quantity : number, incrementQuantity : () => void,decrementQuantity : () => void }) => {
    
    return (
        <View style={styles.mealItem}>
            <ImagePasto meal={meal} style={styles.mealImage} />
            <Text style={styles.mealName}>{meal.name}</Text>
            <Allergen allergen={meal.allergens} />
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={incrementQuantity}>
                    <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={decrementQuantity}>
                    <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mealItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 10,
    },
    mealImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    mealName: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantityContainer: {
        alignItems: 'center',
    },
    quantityButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007FFF',
        paddingHorizontal: 10,
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginVertical: 5,
    },
});

export default MealCard;