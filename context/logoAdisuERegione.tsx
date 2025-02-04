import React from 'react';
import { Image, View, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const LogoAdisuERegione = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/LogoRegionePuglia.png')}
                style={styles.logo}
            />
            <Image
                source={require('@/assets/images/LogoAdisu.png')}
                style={styles.logo}
            />
            
        </View>
        {children}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: height * 0.04,
        width: '100%',
        height: height * 0.10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    logo: {
        width: width * 0.3,
        height: height * 0.1,
        resizeMode: 'contain'
    }
});

export default LogoAdisuERegione;