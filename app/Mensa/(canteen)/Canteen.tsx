import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { TypeCanteen } from "../../lib/definitions";
import { navigateToAddCanteen } from "../../nav/utils";
import CanteenResult from "@/components/canteenResult";
import { MD2Colors, Searchbar } from "react-native-paper";
import { useCanteen } from "@/context/CanteenContext";
import BreadCrumbCanteen from "@/components/breadcrumb/BreadCrumbCanteen";
import GlobalStyles from "@/app/GlobalStyles";


const Canteen = () => {
    const { data, loading, groups } = useCanteen();
    const [canteenName, setCanteenName] = useState<string>("");
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
        <View style={GlobalStyles.mainContainer}>
            <BreadCrumbCanteen />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>

                    {
                        loading
                            ?
                            <ActivityIndicator animating={true} color={MD2Colors.blue400} />
                            :
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

                                {
                                    groups.includes("Admin") && <View style={styles.searchContainer}>
                                        <TouchableOpacity
                                            style={styles.addButton}
                                            onPress={navigateToAddCanteen}
                                        >
                                            <Text style={styles.addButtonText}>Aggiungi mensa</Text>
                                        </TouchableOpacity>
                                    </View>
                                }

                                <View style={styles.containerTotalSearchCanteen}>
                                    <Text><Text style={{ color: "#005dff", fontWeight: 'bold', }}>{searchResults.length}</Text> mense trovate</Text>
                                </View>

                                <View style={styles.mensaList}>
                                    {searchResults.map((canteen, index) => (
                                        <CanteenResult key={index} canteen={canteen} groups={groups} />
                                    ))}
                                </View>
                            </>
                    }
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
    mensaList: {
        width: "100%",
        paddingHorizontal: 10,
    },
    scrollContainer: {
    },
    container: {
        flex: 1,
        alignItems: "center",
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

export default Canteen;
