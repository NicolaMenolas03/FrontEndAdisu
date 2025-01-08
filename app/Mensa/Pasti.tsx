import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions, Modal } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useCRUD } from "@/hooks/useCRUD";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from 'expo-router';

type RootStackParamList = {
    Pasti: {
        mensaId: string;
        mensaName: string;
    };
};
interface Pasti {
    id: number;
    name: string;
    description: string;
    price: number;
    type: string;
    gluten: string;
    crustaceans: string;

}
type PastiScreenRouteProp = RouteProp<RootStackParamList, 'Pasti'>;
const { width } = Dimensions.get('window');
const iconSize = width * 0.08;



const FoodCard = ({ meal }: { meal: Pasti}) => {

    return (
        <View style={styles.card}>
            <Image
                source={require('../../assets/images/placeholder-food.png')}
                style={styles.foodImage}
            />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{meal.name}</Text>

                <View style={styles.allergenRow}>
                    {meal.gluten === "True" &&
                        <Image
                            source={require('../../assets/icons/icons8-grano-94.png')}
                            style={styles.allergenIcon}
                        />
                    }
                    {meal.crustaceans === "True" &&
                        <Image
                            source={require('../../assets/icons/icons8-gambero-94.png')}
                            style={styles.allergenIcon}
                        />
                    }
                </View>

                <Text style={styles.cardDescription}>{meal.description}</Text>

                <View style={styles.bottomRow}>
                    <Text style={styles.cardPrice}>€ {meal.price}</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const Pasti = () => {
    const route = useRoute<PastiScreenRouteProp>();
    const { mensaId, mensaName } = route.params;

    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const { data, error, loading } = useCRUD<Pasti>(`/daily_meals/${mensaId}/get_meals_by_id/`); // Note the Pasti[] type


    const navigateToMensa = () => {
        router.push(`/Mensa/Mensa`);
    };

    const searchMeals = () => {
        if (selectedCategory === 'all')
            return data;
        else
            return data.filter((meal) => meal.type === selectedCategory)
    }
    const filteredMeals = searchMeals();

    const categories = [
        {
            id: 'all',
            label: 'Tutto',
            img: require('../../assets/icons/icons8-cibo-fast-food-cibo-di-strada-10-94.png')
        },
        {
            id: 'first',
            label: 'Primi',
            img: require('../../assets/icons/icons8-spaghetti-94.png')
        },
        {
            id: 'second',
            label: 'Secondi',
            img: require('../../assets/icons/icons8-paleodieta-94.png')
        },
        {
            id: 'sweet',
            label: 'Dolci',
            img: require('../../assets/icons/icons8-dolce-94.png')
        }
    ];

    return (
        <View style={styles.container}>

            <View style={styles.containerMensa}>
                <Icon
                    name="arrow-left"
                    size={28}
                    color="#007FFF"
                    style={styles.icon}
                    onPress={navigateToMensa}
                />
                <Text>{mensaName}</Text>
            </View>

            {/* Categories Tabs */}
            <View style={styles.categoriesContainer}>
                {categories.map(category => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryTab,
                            selectedCategory === category.id && styles.selectedTab
                        ]}
                        onPress={() => setSelectedCategory(category.id)}
                    >
                        <Image
                            source={category.img}
                            style={styles.categoryIcon}
                        />
                        <Text style={[
                            styles.categoryText,
                            selectedCategory === category.id && styles.selectedText
                        ]}>
                            {category.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Meals List */}
            <ScrollView style={styles.scrollContainer}>
                {loading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <View style={styles.cardsContainer}>
                        {filteredMeals.map((meal) => (
                            <FoodCard key={meal.id} meal={meal} />
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cartBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    cartBadge: {
        position: 'absolute',
        top: -5,
        right: -10,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartContainer: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007FFF',
        borderRadius: 30,
        width: 60,
        height: 60,
        marginTop: -30, // Solleva il cerchio sopra la navbar
        borderWidth: 5,
        borderColor: '#f5f5f5',
    },
    navbar: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        paddingVertical: 10,
        backgroundColor: '#005dff',
        position: 'absolute',
        bottom: 0,
        borderRadius: 40

    },
    navButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerMensa: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    categoriesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    categoryTab: {
        padding: 10,
        borderRadius: 20,
        minWidth: 80,
        alignItems: 'center',
    },
    selectedTab: {
        backgroundColor: '#005dff',
    },
    categoryText: {
        fontSize: 12,
        color: '#333',
    },
    selectedText: {
        color: '#fff',
    },
    scrollContainer: {
        flex: 1,
    },
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
    loadingText: {
        textAlign: 'center',
        padding: 20,
    },
    icon: {
        marginRight: 10,
    },
    categoryIcon: {
        width: 28,
        height: 28,
        marginBottom: 5,
    },
    cartButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1,
    },
    badge: {
        position: 'absolute',
        right: -6,
        top: -6,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 12,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        fontSize: 20,
        paddingHorizontal: 10,
    },
    quantity: {
        fontSize: 16,
        paddingHorizontal: 10,
    },
    totalContainer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    checkoutButton: {
        backgroundColor: '#003366',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    checkoutButtonText: {
        color: 'white',
        fontSize: 16,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 16,
        color: '#333',
    },
});

export default Pasti;