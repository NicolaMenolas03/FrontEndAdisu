import React, { useState, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        title: 'Servizio Mensa',
        description: 'Con questa app sarà possibile prenotare il tuo pasto in mensa, evitando code e assembramenti',
        image: require('@/assets/images/onb_mensa.svg')
    },
    {
        id: '2',
        title: 'Borsa di Studio',
        description: 'Con questa app sarà possibile richiedere la borsa di studio, e simulare il tuo punteggio',
        image: require('@/assets/images/onb_borsa.png')
    },
];

export default function OnboardingMensa() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const nextSlide = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true
            });
            setCurrentIndex(currentIndex + 1);
        }
    };

    const completeTutorial = () => {
        router.push('/login');
    };

    const getItemLayout = (data: any, index: number) => ({
        length: width,
        offset: width * index,
        index,
    });

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={({ item }) => (
                    <View style={[styles.slide, { width }]}>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                    </View>
                )}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                getItemLayout={getItemLayout}
                onScroll={(event) => {
                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(newIndex);
                }}
                scrollEventThrottle={16}
            />

            <View style={styles.pagination}>
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index ? styles.activeDot : styles.inactiveDot
                        ]}
                    />
                ))}
            </View>

            <TouchableOpacity 
                style={styles.circleButton}
                onPress={currentIndex === slides.length - 1 ? completeTutorial : nextSlide}
            >
                <Ionicons 
                    name={currentIndex === slides.length - 1 ? "checkmark" : "arrow-forward"} 
                    size={24} 
                    color="white" 
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    image: {
        width: width * 0.8,
        height: width * 0.8,
        resizeMode: 'contain',
        marginBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 100,
        width: '100%',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#007AFF',
    },
    inactiveDot: {
        backgroundColor: '#CCC',
    },
    circleButton: {
        position: 'absolute',
        bottom: 40,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});