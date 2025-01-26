import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

interface propsHomeButton {
    text: string,
    iconName: string,
    onPress: () => void,
}

const HomeButton = ({ text, iconName,onPress }: propsHomeButton) => {
    return (
        <TouchableOpacity style={stylesButton.iconButton} onPress={onPress}> 
            <Icon name={iconName} size={30} color="white" style={stylesButton.icon} />
            <Text style={stylesButton.iconText}>{text}</Text>
        </TouchableOpacity>
    );
}

const stylesButton = StyleSheet.create({
    iconButton: {
        width: wp('25%%'), // 25% of screen width
        height: wp('25%'), // 25% of screen width to make it square
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        elevation: 4,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    icon: {
        marginTop: 14,
        marginBottom: 5,
        color: '#007fff',
    },
    iconText: {
        padding: 3,
        margin:3,
        color: '#007fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default HomeButton;