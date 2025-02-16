import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions} from 'react-native';
import { useCRUD } from "@/hooks/useCRUD";
import { TypeMeal } from '../../lib/definitions';
import FoodCard from '@/components/foodCard';
import { useCart } from '@/context/CartContext';
import { useLocalSearchParams } from 'expo-router';
import BreadCrumbDealyMeals from '@/components/breadcrumb/BreadCrumbDailyMeals';
import GlobalStyles from '@/app/GlobalStyles';

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


const Pasti = () => {
    const { setCanteenId } = useCart();
    const { id } = useLocalSearchParams();
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const { data, loading } = useCRUD<TypeMeal>(`/daily_meals/${id}/get_meals_by_id/`);
    const searchMeals = () => {
        if (selectedCategory === 'all')
            return data;
        else
            return data.filter((meal) => meal.type === selectedCategory)
    }
    const filteredMeals = searchMeals();

    useEffect(() => {
        setCanteenId(Number(id));
    }, [id]);

    return (
        <View style={GlobalStyles.mainContainer}>
            <BreadCrumbDealyMeals/>
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

            <ScrollView style={styles.scrollContainer}>
                {loading ? (
                    <Text style={styles.loadingText}>Loading...</Text>
                ) : (
                    <View style={styles.cardsContainer}>
                        {filteredMeals.map((meal) => (
                            <FoodCard key={meal.id} meal={meal} canteen_id={id.toString()} />
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 10,
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
});

export default Pasti;