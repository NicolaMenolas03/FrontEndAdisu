import { TypeCanteen } from "@/app/lib/definitions";
import { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { navigateToHome, navigateToMensa } from "@/app/nav/utils";
import MensaForm, { MensaFormMethods } from "@/components/form/mensaForm";
import ResultModal from "@/components/ResultModal";
import { useCanteen } from "@/context/CanteenContext";

const AddMensa = () => {
    const { createItem, loading } = useCanteen();
    const [modalVisible, setModalVisible] = useState(false);
    const [success, setSuccess] = useState(false);
    const formRef = useRef<MensaFormMethods>(null);

    const handleSubmit = async () => {
        const formData = formRef.current?.getFormData() as TypeCanteen;
        if (!formData) return;
        try {
            await createItem(formData);
            setSuccess(true);
            setModalVisible(true);
        } catch (error) {
            console.error('Error creating mensa:', error);
            setSuccess(false);
            setModalVisible(true);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.breadcrumbContainer}>
                <Icon
                    name="arrow-left"
                    size={28}
                    color="#007FFF"
                    style={styles.icon}
                    onPress={navigateToMensa}
                />
                <TouchableOpacity onPress={navigateToHome}>
                    <Text style={styles.breadcrumbItem}>Home</Text>
                </TouchableOpacity>
                <Text style={styles.breadcrumbSeparator}>/</Text>
                <TouchableOpacity onPress={navigateToMensa}>
                    <Text style={styles.breadcrumbItem}>Mense</Text>
                </TouchableOpacity>
                <Text style={styles.breadcrumbSeparator}>/</Text>
                <Text style={[styles.breadcrumbItem, styles.breadcrumbActive]}>
                    Aggiunta Mensa
                </Text>
            </View>

            <MensaForm
                ref={formRef}
            />

            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Aggiungi Mensa</Text>
                </TouchableOpacity>
            )}
            <ResultModal 
                visible={modalVisible}
                success={success} // Changed from false to success state
                successMessage="La mensa è stata aggiunta con successo."
                errorMessage="Si è verificato un errore durante l'aggiunta della mensa."
                onClose={() => {
                    setModalVisible(false);
                    if (success) {
                        navigateToMensa();
                    }
                }} 
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    icon: {
        marginRight: 5,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    breadcrumbContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 5,
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
});

export default AddMensa;