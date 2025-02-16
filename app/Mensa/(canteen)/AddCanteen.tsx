import { TypeCanteen } from "@/app/lib/definitions";
import { useState, useRef } from "react";
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from "react-native";
import { navigateToCanteen } from "@/app/nav/utils";
import MensaForm, { MensaFormMethods } from "@/components/form/mensaForm";
import ResultModal from "@/components/ResultModal";
import { useCanteen } from "@/context/CanteenContext";
import BreadCrumbAddCanteen from "@/components/breadcrumb/BreadCrumbAddCanteen";
import GlobalStyles from "@/app/GlobalStyles";

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
        <View style={GlobalStyles.mainContainer}>
            <BreadCrumbAddCanteen/>
            <ScrollView style={GlobalStyles.scrollContainer}>
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
                            navigateToCanteen();
                        }
                    }} 
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default AddMensa;