import { TypeRating } from "@/app/lib/definitions";
import { useCRUD } from "@/hooks/useCRUD";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';


const RatingSection = ({ meal_id, mensa_id }: { meal_id: string, mensa_id: string }) => {
    const { data, createItem } = useCRUD<TypeRating>('/rating/');
    const current_rating = data.find((rating) => rating.meal_id === parseInt(meal_id) && rating.canteen_id === parseInt(mensa_id));
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (current_rating) {
            setRating(current_rating.scale);
        }
    }, [current_rating]);

    return (
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
                        createItem({ scale: rating, meal_id: parseInt(meal_id), canteen_id: parseInt(mensa_id)});
                    }}
                >
                    <Text style={styles.submitButtonText}>Valuta</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default RatingSection;