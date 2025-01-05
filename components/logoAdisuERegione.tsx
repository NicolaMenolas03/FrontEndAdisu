import { Image, View, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const LogoAdisuERegione = () => {
    return (
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
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: height * 0.15,
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