import { TypeMeal } from "@/app/lib/definitions";
import { useState, useRef } from "react";
import { Text, TouchableOpacity, StyleSheet, ScrollView, View } from "react-native";
import { navigateToCanteen } from "@/app/nav/utils";
import MensaForm, { MensaFormMethods } from "@/components/form/mensaForm";
import ResultModal from "@/components/ResultModal";
import GlobalStyles from "@/app/GlobalStyles";
import Loading from "@/components/Loading";
import BreadCrumbAddMeal from "@/components/breadcrumb/BreadCrumbAddMeal";
import { useMeal } from "@/context/MealContext";

const AddMeal = () => {
    const { createItem, loading } = useMeal();
    const [modalVisible, setModalVisible] = useState(false);
    const [success, setSuccess] = useState(false);
    const formRef = useRef<MensaFormMethods>(null);

    const handleSubmit = async () => {
        const formData = formRef.current?.getFormData() as TypeMeal;
        if (!formData) return;
        try {
            await createItem(formData);
            setSuccess(true);
            setModalVisible(true);
        } catch (error) {
            console.error('Error creating pasti:', error);
            setSuccess(false);
            setModalVisible(true);
        }
    };

    return (
        <View style={GlobalStyles.mainContainer}>
            <BreadCrumbAddMeal/>
            <ScrollView style={GlobalStyles.scrollContainer}>


                <MensaForm
                    ref={formRef}
                />

                {loading ? (
                    <Loading/>
                ) : (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>Aggiungi Pasto</Text>
                    </TouchableOpacity>
                )}
                <ResultModal 
                    visible={modalVisible}
                    success={success} // Changed from false to success state
                    successMessage="Il pasto è stata aggiunta con successo."
                    errorMessage="Si è verificato un errore durante l'aggiunta del pasto."
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

export default AddMeal;