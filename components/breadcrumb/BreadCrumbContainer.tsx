import { router } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const BreadcrumbContainer = ({children}: {children:React.ReactNode}) => {
    return(
        <View style={styles.breadcrumbContainer}>
            <Icon
                name="arrow-left"
                size={28}
                color="#007FFF"
                style={styles.icon}
                onPress={() => router.back()}
            />
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    breadcrumbContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    icon: {
        marginRight: 10,
    },
})

export default BreadcrumbContainer;