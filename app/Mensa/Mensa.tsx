import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Title } from "react-native-paper";
import { useCRUD } from "@/hooks/useCRUD";
import { router } from "expo-router";

interface Mensa {
    id: number;
    name: string;
    address: string;
    city: string;
    province: string;
}

const Mensa = () => {
    const { data, error, loading, createItem, deleteItem, updateItem } = useCRUD<Mensa>("/canteen/");
    const [mensaName, setMensaName] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [searchResults, setSearchResults] = useState<Mensa[]>([]);

    const mensaList: Mensa[] = data;

    useEffect(() => {
        if (data) {
            setSearchResults(data);
        }
    }, [data]);

    const filterMensaList = (query: string) => {
        if (query) {
            const results = mensaList.filter((mensa) =>
                mensa.name.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults(mensaList);
        }
        setMensaName(query);
    };

    const navigateToPasti = (mensaId: string, mensaName: string) => {
        router.push(`/Mensa/Pasti?mensaId=${mensaId}&mensaName=${mensaName}`);
    };

    return (
        <View style={styles.mainContainer}>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.boxTitle}>
                        <Title style={styles.title}>Mensa</Title>
                    </View>

                    {loading ? <Text>Loading...</Text> : <>
                    <View style={styles.inputSection}>
                        <View
                            style={[
                                styles.inputContainer,
                                isFocused && styles.inputContainerFocused,
                            ]}
                        >
                            <Icon
                                name="magnify"
                                size={30}
                                color="#007FFF"
                                style={styles.icon}
                            />
                            <TextInput
                                value={mensaName}
                                onChangeText={filterMensaList}
                                placeholder="Inserisci il nome della mensa"
                                placeholderTextColor="#cccccc"
                                style={styles.input}
                            />
                        </View>
                    </View>
                        
                    {/* Search Button */}
                    <View style={styles.containerTotalSearchCanteen}>
                        <Text><Text style={{ color: "#005dff", fontWeight: 'bold', }}>{searchResults.length}</Text> mense trovate</Text>

                    </View>

                    {/* Mensa List */}
                    <View style={styles.mensaList}>
                        {searchResults.map((mensa, index) => (
                            <View key={index} style={styles.mensaItem}>
                                <Icon
                                    name="google-maps"
                                    size={24}
                                    color="#005dff"
                                    style={styles.iconMaps}
                                />
                                <View style={styles.mensaInfo}>
                                    <Text style={styles.mensaName}>{mensa.name}</Text>
                                    <Text>{mensa.address}</Text>
                                    <Text>
                                        {mensa.city}, {mensa.province}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.goButton}
                                    onPress={() => navigateToPasti(mensa.id.toString(), mensa.name)}
                                >
                                    <Text style={styles.buttonText}><Icon
                                        name="arrow-right"
                                        size={20}
                                        color="wihte"
                                    /></Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    </>}
                </View>
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    containerTotalSearchCanteen: {
        alignItems: "flex-start",
        width: "90%",
    },
    containerMensaList: {
        width: "90%",  // Match width with search container
        alignItems: "center",
        backgroundColor: "#ffffff",
        alignSelf: "center",  // Center the container
    },
    mainContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
        width: "100%",
    },
    searchContainer: {
        width: "90%",
        alignSelf: "center",
        marginVertical: 10,
    },
    mensaList: {
        width: "100%",  // Take full width of parent
        paddingHorizontal: 10,
    },
    mensaItem: {
        width: "100%",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    mensaInfo: {
        flex: 1,
    },
    goButton: {
        backgroundColor: '#005dff',
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: "#ffffff",
        paddingBottom: 40, // Space for the fixed navbar
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

    inputContainerFocused: {
        borderColor: "#007FFF",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "100%",
        marginBottom: 20,
    },
    PugliaLogo: {
        width: wp("20%"),
        height: hp("10%"),
        resizeMode: "contain",
    },
    icon: {
        paddingRight: 10,
    },
    iconMaps: {
        paddingRight: 10,
        top: 0,
    },
    headerImage: {
        width: wp("20%"),
        height: hp("10%"),
        resizeMode: "contain",
    },
    inputSection: {
        width: "100%",
        alignItems: "center",
        paddingBottom: 20,
    },
    input: {
        flex: 1,
        backgroundColor: 'transparent',
        borderWidth: 0,  
    },
    searchButton: {
        backgroundColor: "#007FFF",
        width: "30%",
        padding: 10,
        borderRadius: 20,
    },
    searchButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    mensaName: {
        fontWeight: "bold",
    },
    itemText: {
        padding: 10,
        fontSize: 15,
    },
    suggestionList: {
        maxHeight: hp("60%"), // Altezza ridotta per maggiore minimalismo
        width: "80%", // Larghezza maggiore per adattarsi al design moderno
        borderWidth: 0, // Rimosso bordo per un aspetto più pulito
        borderRadius: 8, // Angoli leggermente arrotondati
        backgroundColor: "#ffffff", // Colore di sfondo chiaro e moderno
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, // Ridotta l'opacità dell'ombra
        shadowRadius: 4, // Maggiore raggio dell'ombra per un effetto più soft
        elevation: 1, // Minore elevazione per semplicità
        marginBottom: 20, // Minore margine per compattezza
        padding: 8, // Aggiunto padding per spaziatura interna
    },

    suggestionItem: {
        padding: 4,
        borderBottomWidth: 0,
    },
    boxTitle: {
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
});

export default Mensa;
