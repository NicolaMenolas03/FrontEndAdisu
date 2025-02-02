import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useCRUD } from "@/hooks/useCRUD";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from 'expo-router';
import { TypePasti } from '../../lib/definitions';
import FoodCard from '@/components/foodCard';
import { useCart } from '@/context/CartContext';
import { navigateToHome, navigateToMensa } from '@/app/nav/utils';

type RootStackParamList = {
    Pasti: {
        mensaId: string;
    };
};

type PastiScreenRouteProp = RouteProp<RootStackParamList, 'Pasti'>;
const { width } = Dimensions.get('window');

const Pasti = () => {
    const { setCanteenId } = useCart();
    const route = useRoute<PastiScreenRouteProp>();
    const { mensaId } = route.params;
    setCanteenId(parseInt(mensaId));
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const { data, error, loading } = useCRUD<TypePasti>(`/daily_meals/${mensaId}/get_meals_by_id/`);

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
            img: require('../../../assets/icons/icons8-cibo-fast-food-cibo-di-strada-10-94.png')
        },
        {
            id: 'first',
            label: 'Primi',
            img: require('../../../assets/icons/icons8-spaghetti-94.png')
        },
        {
            id: 'second',
            label: 'Secondi',
            img: require('../../../assets/icons/icons8-paleodieta-94.png')
        },
        {
            id: 'sweet',
            label: 'Dolci',
            img: require('../../../assets/icons/icons8-dolce-94.png')
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
                <Text>
                    <TouchableOpacity 
                        onPress={navigateToHome} 
                        style={styles.breadcrumbItem}
                        activeOpacity={0.6}
                    >
                        <Text style={styles.breadcrumbItem}>Home</Text>
                    </TouchableOpacity>
                    <Text style={styles.breadcrumbSeparator}>/</Text>
                    <TouchableOpacity 
                        onPress={navigateToMensa} 
                        style={styles.breadcrumbItem}
                        activeOpacity={0.6}
                    >
                        <Text style={styles.breadcrumbItem}>Mensa</Text>
                    </TouchableOpacity>
                    <Text style={styles.breadcrumbSeparator}>/</Text>
                    <Text style={[styles.breadcrumbItem, styles.breadcrumbActive]}>Pasti</Text>
                </Text>
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
    breadcrumbItem:{
        fontSize: 16,
        color: '#007FFF',
        marginHorizontal: 5,
        textDecorationLine: 'underline',
    },
    breadcrumbActive: {
        color: '#666',
        textDecorationLine: 'none',
    },
    breadcrumbSeparator: {
        color: '#666',
        marginHorizontal: 5,
    },
    navButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 10,
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
        fontSize: 16,
        color: '#666',
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