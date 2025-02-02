import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const TimePicker = ({ onTimeSelect }: { onTimeSelect: (time: string) => void }) => {
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        onTimeSelect(time);
    };

    const getTimeSlots = () => {
        const date = new Date();

        if (date.getHours() <= 12) {
            return ["12:00", "13:00", "14:00", "15:00"];
        } else {
            return ["19:00", "20:00", "21:00"];
        }
    };

    const timeSlots = getTimeSlots();

    return (
        <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>Orario di ritiro:</Text>
            <View style={styles.pickerContainer}>
                <ScrollView
                    style={styles.timeScrollView}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={50}
                    decelerationRate="fast"
                >
                    {timeSlots.map((time) => (
                        <TouchableOpacity
                            key={time}
                            style={[
                                styles.timeSlot,
                                selectedTime === time && styles.selectedTimeSlot
                            ]}
                            onPress={() => handleTimeSelect(time)}
                        >
                            <Text style={[
                                styles.timeText,
                                selectedTime === time && styles.selectedTimeText
                            ]}>
                                {time}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    timeContainer: {
        width: '40%',
        marginBottom: 20,
    },
    pickerContainer: {
        height: 52,
        overflow: 'hidden',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    timeScrollView: {
        backgroundColor: 'white',
    },
    timeSlot: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedTimeSlot: {
        backgroundColor: '#007AFF',
    },
    timeLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    timeText: {
        fontSize: 16,
        color: '#333',
    },
    selectedTimeText: {
        color: '#fff',
    }
});

export default TimePicker;