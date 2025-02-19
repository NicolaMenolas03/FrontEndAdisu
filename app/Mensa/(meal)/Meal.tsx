import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { TypeMeal } from "../../lib/definitions";
import { navigateToAddMeal } from "../../nav/utils";
import { TextInput } from "react-native-paper";
import BreadCrumbMeal from "@/components/breadcrumb/BreadCrumbMeal";
import GlobalStyles from "@/app/GlobalStyles";
import Loading from "@/components/Loading";
import { useMeal } from "@/context/MealContext";
import MealCard from "@/components/MealCard";
import { Picker } from "@react-native-picker/picker";

const Meal = () => {
    const { data, loading, groups } = useMeal();
    const [mealName, setMealName] = useState<string>("");
    const [mealDescription, setMealDescription] = useState<string>("");
    const [mealType, setMealType] = useState<string>("all");
    const [searchResults, setSearchResults] = useState<TypeMeal[]>([]);
    const mealList: TypeMeal[] = data;

    useEffect(() => {
        if (data) {
            setSearchResults(data);
        }
    }, [data]);

    const filterMealList = (
        name: string = mealName,
        description: string = mealDescription,
        type: string = mealType
    ) => {
        let results = mealList;

        if (name) {
            results = results.filter((meal) =>
                meal.name.toLowerCase().includes(name.toLowerCase())
            );
        }

        if (description) {
            results = results.filter((meal) =>
                meal.description.toLowerCase().includes(description.toLowerCase())
            );
        }

        if (type && type !== 'all') {
            results = results.filter((meal) =>
                meal.type.toLowerCase() === type.toLowerCase()
            );
        }

        setSearchResults(results);
    };

    useEffect(() => {
        filterMealList(mealName, mealDescription, mealType);
    }, [mealName, mealDescription, mealType, data]);

    return (
        <View style={GlobalStyles.mainContainer}>
            <BreadCrumbMeal />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <View style={styles.inputSection}>
                                <View style={styles.inputRow}>
                                    <TextInput
                                        placeholder="Nome"
                                        onChangeText={(text) => setMealName(text)}
                                        value={mealName}
                                        style={[styles.input, styles.inputField, styles.halfWidth]}
                                    />
                                    <TextInput
                                        placeholder="Descrizione"
                                        onChangeText={(text) => setMealDescription(text)}
                                        value={mealDescription}
                                        style={[styles.input, styles.inputField, styles.halfWidth]}
                                    />
                                </View>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={mealType}
                                        onValueChange={(itemValue) => setMealType(itemValue)}
                                        style={styles.picker}
                                    >
                                        <Picker.Item label="Tutti" value="all" />
                                        <Picker.Item label="Primi" value="first" />
                                        <Picker.Item label="Secondi" value="second" />
                                        <Picker.Item label="Dolci" value="sweet" />
                                    </Picker>
                                </View>
                            </View>

                            {
                                groups.includes("Admin") && <View style={styles.searchContainer}>
                                    <TouchableOpacity
                                        style={styles.addButton}
                                        onPress={navigateToAddMeal}
                                    >
                                        <Text style={styles.addButtonText}>Aggiungi Pasto</Text>
                                    </TouchableOpacity>
                                </View>
                            }

                            <View style={styles.containerTotalSearchmeal}>
                                <Text><Text style={{ color: "#005dff", fontWeight: 'bold', }}>{searchResults.length}</Text> pasti trovate</Text>
                            </View>

                            <View style={styles.mealList}>
                                {searchResults.map((meal) => (
                                    <MealCard key={meal.id} meal={meal} groups={groups} />
                                ))}
                            </View>
                        </>
                    )}
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
    containerTotalSearchmeal: {
        alignItems: "flex-start",
        width: "90%",
    },
    mealList: {
        width: "100%",
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
        width: "90%",
        gap: 10,
        marginBottom: 20,
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    inputField: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 8,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        height: 40,
    },
    halfWidth: {
        flex: 1,
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginVertical: 5,
    },
    picker: {
        height: 50,
    },
    input: {
        fontSize: 14,
    },
});

export default Meal;
