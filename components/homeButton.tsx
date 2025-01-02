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
        width: wp('15%'), // 25% of screen width
        height: wp('15%'), // 25% of screen width to make it square
        backgroundColor: '#007FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,
    },
    icon: {
        marginBottom: 5,
    },
    iconText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default HomeButton;