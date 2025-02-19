import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import { TypeMeal } from '@/app/lib/definitions';
import { navigateToChangeMeal } from '@/app/nav/utils';

const { width } = Dimensions.get('window');

const MealCard = ({ meal, groups }: { meal:TypeMeal, groups: string[] }) => {
    return (
        <View style={styles.card}>
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    {
                        groups.includes("Admin") && <Button
                            icon="pencil"
                            mode="text"
                            onPress={() => navigateToChangeMeal(meal.id.toString())}
                            style={styles.editButton}
                            contentStyle={styles.editButtonContent}
                            children={undefined}
                        />
                    }
                <Text style={styles.mealName}>{meal.name}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailText}>Tipo: {meal.type}</Text>
                    <Text style={styles.detailText}>Descrizione: {meal.description}</Text>
                    <Text style={styles.detailText}>Prezzo: €{meal.price}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editButton: {
        margin: 0,
        padding: 0,
        minWidth: 32,
        height: 32
    },
    editButtonContent: {
        margin: 0,
        padding: 0
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: width * 0.9,
    },
    contentContainer: {
        gap: 8,
    },
    mealName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#005dff',
    },
    detailsContainer: {
        marginTop: 4,
        gap: 4,
    },
    detailText: {
        fontSize: 14,
        color: '#666',
    },
});

export default MealCard;