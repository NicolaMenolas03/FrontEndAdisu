import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const LogoAdisu = () => {
    return (
        
            <Image
                source={require('@/assets/images/LogoAdisu.png')}
                style={styles.headerImage}
            />
        
    );
}

const styles = StyleSheet.create({
  
    headerImage: {
        marginBottom: 20,
        resizeMode: 'contain',
        width: '50%', // 50% of screen width
        height: '25%', // 25% of screen height
    },
});

export default LogoAdisu;