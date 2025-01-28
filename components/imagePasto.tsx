 
 
 
import { TypePasti } from '@/app/lib/definitions';
import React from 'react';
import { StyleSheet, Image, StyleProp, ImageStyle } from 'react-native';

const img: { [key: string]: any } = {
    "first": require('../assets/images/16e29b6bc926727c49956cb32f27188d.jpg'),
    "second": require('../assets/images/videogame-meat-icon-pack_23-2149840107.jpg'),
    "sweet": require('../assets/images/3d-rendering-coffee-shop-icon_23-2149878997.jpeg'),
}

const ImagePasto = ({  meal, style } : {meal:TypePasti, style?: StyleProp<ImageStyle> }) => {
    return (
        <Image
            source={img[meal.type]}
            style={style}
        />
    );
};



export default ImagePasto;
