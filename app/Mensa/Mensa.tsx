import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Keyboard,
    FlatList,
} from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Navbar from "../../components/Navbar"; // Update the path to the correct location
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Title } from "react-native-paper";

interface Mensa {
    nome: string;
    indirizzo: string;
    citta: string;
    provincia: string;
}

const Mensa = () => {
    const [mensaName, setMensaName] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [searchResults, setSearchResults] = useState<Mensa[]>([]);
    const [filteredMensaList, setFilteredMensaList] = useState<Mensa[]>([]);

    const mensaList: Mensa[] = [
        {
            nome: "Mensa Centrale",
            indirizzo: "Via Centrale 1",
            citta: "Bari",
            provincia: "BA",
        },
        {
            nome: "Mensa Sud",
            indirizzo: "Via Sud 2",
            citta: "Bari",
            provincia: "BA",
        },
        {
            nome: "Mensa Nord",
            indirizzo: "Via Nord 3",
            citta: "Bari",
            provincia: "BA",
        },
        {
            nome: "Mensa Est",
            indirizzo: "Via Est 4",
            citta: "Bari",
            provincia: "BA",
        },
        {
            nome: "Mensa Ovest",
            indirizzo: "Via Ovest 5",
            citta: "Bari",
            provincia: "BA",
        },
    ];

    const searchMensa = () => {
        if (mensaName.trim()) {
            const results = mensaList.filter((mensa) =>
                mensa.nome.toLowerCase().includes(mensaName.toLowerCase())
            );
            setSearchResults(results);
            Keyboard.dismiss();
        }
    };

    const filterMensaList = (query: string) => {
        if (query) {
            const results = mensaList.filter((mensa) =>
                mensa.nome.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults(mensaList);
        }
        setMensaName(query);
    };

    return (
        <View style={styles.mainContainer}>
            
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    {/* Header */}
            <View style={styles.header}>
                <Image
                    source={require("@/assets/images/LogoRegionePuglia.png")}
                    style={styles.PugliaLogo}
                />
                <Image
                    source={require("@/assets/images/LogoAdisu.png")}
                    style={styles.headerImage}
                />
            </View>
            <view style={styles.boxTitle}>
            <Title style={styles.title}>Mensa</Title> 
            </view>
            
                    {/* Input Section */}
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

                    {/* Mensa List */}
                    <View style={styles.mensaList}>
                        {searchResults.map((mensa, index) => (
                            <View key={index} style={styles.mensaItem}>
                                <Text style={styles.mensaName}>{mensa.nome}</Text>
                                <Text>{mensa.indirizzo}</Text>
                                <Text>
                                    {mensa.citta}, {mensa.provincia}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>

            {/* Navbar */}
            <Navbar namePage="landingPage"/>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
        width: "100%",
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
        width: "90%",
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
        marginRight: 10,
    },
    headerImage: {
        width: wp("20%"),
        height: hp("10%"),
        resizeMode: "contain",
    },
    inputSection: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    },
    input: {
        flex: 1,
        height: "100%",
        marginLeft: 10,
        borderWidth: 0,
        borderColor: "transparent",
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
    mensaList: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
        height: hp("50%"),
    },
    mensaItem: {
        width: "80%",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        textAlign: "center",
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
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
