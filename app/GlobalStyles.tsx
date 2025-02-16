import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding:20
    },
    scrollContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },

    breadcrumbItem: {
        fontSize: 16,
        color: '#007FFF',
        marginHorizontal: 5,
        textDecorationLine: 'underline',
    },
    breadcrumbSeparator: {
        color: '#666',
        marginHorizontal: 5,
    },
    breadcrumbActive: {
        color: '#666',
        textDecorationLine: 'none',
    },
});