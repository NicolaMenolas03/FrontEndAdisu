import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useCRUD } from "@/hooks/useCRUD";
import { TypeCanteen } from "../../lib/definitions";
import { navigateToAddMensa, navigateToHome } from "../../nav/utils";
import CanteenResult from "@/components/canteenResult";
import { MD2Colors, Searchbar } from "react-native-paper";


const Mensa = () => {
    const { data, loading } = useCRUD<TypeCanteen>("/canteen/");
    const [canteenName, setCanteenName] = useState("");
    const [searchResults, setSearchResults] = useState<TypeCanteen[]>([]);
    const canteenList: TypeCanteen[] = data;

    useEffect(() => {
        if (data) {
            setSearchResults(data);
        }
    }, [data]);

    const filterCanteenList = (query: string) => {
        if (query) {
            const results = canteenList.filter((canteen) =>
                canteen.name.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults(canteenList);
        }
        setCanteenName(query);
    };

    return (
        <View style={styles.mainContainer}>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.containerMensa}>
                        <Icon
                            name="arrow-left"
                            size={28}
                            color="#007FFF"
                            style={styles.icon}
                            onPress={navigateToHome}
                        />
                        <Text>
                            <TouchableOpacity
                                onPress={navigateToHome}
                                style={styles.breadcrumbItem}
                                activeOpacity={0.6}
                            >
                                <Text style={styles.breadcrumbItem}>Home</Text>
                            </TouchableOpacity>
                            <Text style={styles.breadcrumbSeparator}>/</Text>
                            <Text style={[styles.breadcrumbItem, styles.breadcrumbActive]}>Mensa</Text>
                        </Text>

                    </View>

                    {loading ? <ActivityIndicator animating={true} color={MD2Colors.blue400} /> :
                        <>
                            <View style={styles.inputSection}>
                                <View style={styles.inputContainer}>
                                    <Searchbar
                                        placeholder="Search"
                                        onChangeText={filterCanteenList}
                                        value={canteenName}
                                        style={styles.input}
                                    />
                                </View>
                            </View>

                            <View style={styles.searchContainer}>
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={navigateToAddMensa}
                                >
                                    <Text style={styles.addButtonText}>Aggiungi mensa</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Total Search Results */}
                            <View style={styles.containerTotalSearchCanteen}>
                                <Text><Text style={{ color: "#005dff", fontWeight: 'bold', }}>{searchResults.length}</Text> mense trovate</Text>
                            </View>

                            {/* Mensa List */}
                            <View style={styles.mensaList}>
                                {searchResults.map((canteen, index) => (
                                    <CanteenResult key={index} canteen={canteen} />
                                ))}
                            </View>
                        </>}
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        width: '100%',
        paddingHorizontal: 16,
        paddingBottom: 10,
    },
    addButton: {
        backgroundColor: '#007FFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    containerTotalSearchCanteen: {
        alignItems: "flex-start",
        width: "90%",
    },
    containerMensa: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 15,
        backgroundColor: 'white',
        width: '100%',
        justifyContent: 'flex-start',
    },
    breadcrumbItem: {
        fontSize: 16,
        color: '#007FFF',
        marginHorizontal: 5,
        textDecorationLine: 'underline',
    },
    breadcrumbActive: {
        color: '#666',
        textDecorationLine: 'none',
    },
    breadcrumbSeparator: {
        color: '#666',
        marginHorizontal: 5,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
        width: "100%",
    },
    mensaList: {
        width: "100%",
        paddingHorizontal: 10,
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: "#ffffff",
        paddingBottom: 40,
    },
    container: {
        flex: 1,
        alignItems: "center",
        padding: 20,
        width: "100%",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 60,
        borderColor: "#cccccc",
        borderWidth: 1,
        marginBottom: 10,
        padding: 20,
        borderRadius: 20,
    },
    icon: {
        paddingRight: 10,
    },
    inputSection: {
        width: "100%",
        alignItems: "center",

    },
    input: {
        flex: 1,
        borderWidth: 0,
        backgroundColor: "transparent",
    },
});

export default Mensa;
