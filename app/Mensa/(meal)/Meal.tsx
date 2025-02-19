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
import { Searchbar } from "react-native-paper";
import BreadCrumbMeal from "@/components/breadcrumb/BreadCrumbMeal";
import GlobalStyles from "@/app/GlobalStyles";
import Loading from "@/components/Loading";
import { useMeal } from "@/context/MealContext";
import MealCard from "@/components/mealCard";


const Meal = () => {

    const { data, loading, groups } = useMeal(); // paramatri che rest useMeal
    const [mealName, setmealName] = useState<string>("");
    const [searchResults, setSearchResults] = useState<TypeMeal[]>([]);
    const mealList: TypeMeal[] = data; 
    
    useEffect(() => {
        if (data) {
            setSearchResults(data);
        }
    }, [data]);

    const filtermealList = (query: string) => {
        if (query) {
            const results = mealList.filter((meal) =>
                meal.name.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults(mealList);
        }
        setmealName(query);
    };

    return (
        <View style={GlobalStyles.mainContainer}>
            <BreadCrumbMeal />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>

                    {
                        loading
                            ?
                            <Loading/>
                            :
                            <>
                                <View style={styles.inputSection}>
                                    <View style={styles.inputContainer}>
                                        <Searchbar
                                            placeholder="Search"
                                            onChangeText={filtermealList}
                                            value={mealName}
                                            style={styles.input}
                                        />
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
        width: "100%",
        alignItems: "center",

    },
    input: {
        flex: 1,
        borderWidth: 0,
        backgroundColor: "transparent",
    },
});

export default Meal;
