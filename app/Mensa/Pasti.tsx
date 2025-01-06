import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useCRUD } from "@/hooks/useCRUD";
import LogoAdisuERegione from '@/components/logoAdisuERegione';

type RootStackParamList = {
  Pasti: {
    mensaId: string;
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

const FoodCard = ({ meal }: { meal: Pasti }) => (
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

const Pasti = () => {
    
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const route = useRoute<PastiScreenRouteProp>();
    const { mensaId } = route.params;
    const { data, error, loading } = useCRUD<Pasti>(`/daily_meals/${mensaId}/get_meals_by_id/`); // Note the Pasti[] type

    console.log(data);

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
            <LogoAdisuERegione />
            
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
        lineHeight: 24,
        textAlign: 'center',
        includeFontPadding: false,
        textAlignVertical: 'center',
        marginTop: -2, 
    },
    loadingText: {
        textAlign: 'center',
        padding: 20,
    },
    categoryIcon: {
        width: 28,
        height: 28,
        marginBottom: 5,
    },
});

export default Pasti;