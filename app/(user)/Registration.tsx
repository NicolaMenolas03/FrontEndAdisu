import React from "react";
import { View, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Modal, } from "react-native";
import { TextInput, Text, Title, HelperText } from "react-native-paper";
import LogoAdisu from "@/components/LogoAdisu";
import { authService } from "@/services/api";
import { useRouter } from "expo-router";
const { width } = Dimensions.get("window");

export default function Registration() {
    const [name, setName] = React.useState("");
    const [surname, setSurname] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [errors, setErrors] = React.useState({ password: "" });
    const router = useRouter();
    const [isModalVisible, setModalVisible] = React.useState(false);

    const handleHomePress = () => {
        setModalVisible(true);
    };

    const confirmExit = async () => {
        setModalVisible(false);
        router.push("./Login");
    };

    const register = async () => {
        let response = await authService.register({
            first_name: name, last_name: surname, username: username, email: email, password: password, password2: password2,
        });

        if (response.status === 201) {
            handleHomePress();
        } else {
            if (password !== password2) {
                setErrors({ password: "Le password non corrispondono" });
            }
            else if (response.status === 400) {
                setErrors({ password: "La password inserita non rispetta i criteri di sicurezza richiesti. Assicurati che la tua password contenga una combinazione di lettere maiuscole, lettere minuscole, numeri e simboli speciali, e che sia di lunghezza adeguata." });
            }
        }
    };

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <LogoAdisu />
                <Title style={styles.title}>Registrati</Title>
                <TextInput
                    label="Name"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={(text) => setName(text)}
                    theme={{ colors: { primary: "#007BFF" } }}
                />
                <TextInput
                    label="Surname"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={(text) => setSurname(text)}
                    theme={{ colors: { primary: "#007BFF" } }}
                />
                <TextInput
                    label="Username"
                    mode="outlined"
                    style={styles.input}
                    onChangeText={(text) => setUsername(text)}
                    theme={{ colors: { primary: "#007BFF" } }}
                />
                <TextInput
                    label="Email"
                    mode="outlined"
                    keyboardType="email-address"
                    style={styles.input}
                    onChangeText={(text) => setEmail(text)}
                    theme={{ colors: { primary: "#007BFF" } }}
                />
                <TextInput
                    label="Password"
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)}
                    theme={{ colors: { primary: "#007BFF" } }}
                />
                {errors.password ? (
                    <HelperText style={styles.errorText} type="error">{errors.password}</HelperText>
                ) : null}
                <TextInput
                    label="Confirm Password"
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={(text) => setPassword2(text)}
                    theme={{ colors: { primary: "#007BFF" } }}
                />
                <TouchableOpacity onPress={register} style={styles.RegisterButton}>
                    <Text style={styles.RegisterButtonText}>Registrati</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push("./Login")}>
                    <Text style={styles.Login}>
                        Non hai un account ?{" "}
                        <Text style={{ textDecorationLine: "underline" }}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isModalVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            Registrazione avvenuta con successo!
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.boxTextModalButton} onPress={confirmExit}>
                                <Text style={styles.buttonTextModal}>Accedi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#FFFFFF",
    },
    innerContainer: {
        width: "100%",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: "#333",
        fontWeight: "bold",
    },
    input: {
        width: width * 0.8, // Use width from Dimensions for responsive width
        margin: 10,
        backgroundColor: "#fff",
    },
    RegisterButton: {
        backgroundColor: "#007FFF",
        padding: 10,
        borderRadius: 10,
        width: 300,
        alignItems: "center",
        marginTop: 10,
    },
    RegisterButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    Login: {
        marginTop: 20,
        color: "black",
        fontWeight: "bold",
        fontSize: 13,
        backgroundColor: "#FFFFFF",
        marginBottom: 100,
    },
    errorText: {
        color: "red",
        margin: 10,
    },

    //Finestra modale 
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    modalText: {
        color: "green",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    boxTextModalButton: {
        backgroundColor: "#007FFF",
        padding: 10,
        borderRadius: 10,
        width: 100,
        alignItems: "center",
        marginTop: 10,
        marginLeft: 10,
    },
    buttonTextModal: {
        marginLeft: 15,
        marginRight: 15,
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
});
