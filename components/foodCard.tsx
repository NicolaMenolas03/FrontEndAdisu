import { TypePasti } from "@/app/lib/definitions";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCart } from '../context/CartContext';
import Allergen from "./allergen";
import ImagePasto from "./imagePasto";

const allergens: { [key: string]: any } = {
    "Pesce": require('../assets/icons/icons8-gambero-94.png'),
    "Glutine": require('../assets/icons/icons8-grano-94.png'),
}


const FoodCard = ({ meal }: { meal: TypePasti}) => {
    const { addToCart } = useCart();
    
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
})

export default FoodCard;