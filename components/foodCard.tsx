import { TypePasti } from "@/app/lib/definitions";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCart } from '../context/CartContext';
import Allergen from "./allergen";
import ImagePasto from "./imagePasto";
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

const allergens: { [key: string]: any } = {
    "Pesce": require('../assets/icons/icons8-gambero-94.png'),
    "Glutine": require('../assets/icons/icons8-grano-94.png'),
}


const FoodCard = ({ meal }: { meal: TypePasti}) => {
    const { addToCart } = useCart();
    const [rating, setRating] = useState(0);
    
    const handleAddToCart = () => {
        addToCart(meal);
    };

    return (
        <View style={styles.card}>
           <ImagePasto meal={meal} style={styles.foodImage} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{meal.name}</Text>

                <Allergen allergen={meal.allergens} />

                <Text style={styles.cardDescription}>{meal.description}</Text>

                <View style={styles.bottomRow}>
                    <Text style={styles.cardPrice}>€ {meal.price}</Text>
                    <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* Add Rating Section */}
                <View style={styles.ratingContainer}>
                    <View style={styles.ratingSection}>
                        <View style={styles.starsContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    onPress={() => setRating(star)}
                                >
                                    <Icon
                                        name={star <= rating ? 'star' : 'star-border'}
                                        size={24}
                                        color={star <= rating ? '#FFD700' : '#888'}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity 
                            style={[
                                styles.submitButton,
                                rating > 0 && styles.submitButtonActive
                            ]}
                            disabled={rating === 0}
                            onPress={() => {
                                // Add your review submission logic here
                                console.log('Rating submitted:', rating);
                            }}
                        >
                            <Text style={styles.submitButtonText}>Valuta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardsContainer: {
        padding: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    foodImage: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardContent: {
        padding: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    allergenRow: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
    },
    allergenIcon: {
        width: 20,
        height: 20,
    },
    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#005dff',
    },
    addButton: {
        backgroundColor: '#005dff',
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        display: 'flex',
    },
    addButtonText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 28,
        textAlign: 'center',
        textAlignVertical: 'center',
        includeFontPadding: false,
        marginTop: -2, // Fine-tune vertical alignment
    },
    ratingContainer: {
        marginTop: 12,
        marginBottom: 8,
    },
    ratingSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    starsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    submitButton: {
        backgroundColor: '#E8E8E8',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        opacity: 0.5,
    },
    submitButtonActive: {
        backgroundColor: '#4CAF50',
        opacity: 1,
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
})

export default FoodCard;