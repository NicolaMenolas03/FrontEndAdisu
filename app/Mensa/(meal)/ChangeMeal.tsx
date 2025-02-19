import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { TypeMeal } from '@/app/lib/definitions';
import { navigateToAddMeal, navigateToCanteen, navigateToMeal } from '@/app/nav/utils';
import ResultModal from "@/components/ResultModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import GlobalStyles from '@/app/GlobalStyles';
import Loading from '@/components/Loading';
import BreadCrumbChangeMeal from '@/components/breadcrumb/BreadCrumbChangeMeal';
import { useMeal } from '@/context/MealContext';
import MealForm, { MealFormMethods } from '@/components/form/MealForm';

const ChangeMeal = () => {
    const { id } = useLocalSearchParams();
    const { getSingleItem, updateItem, deleteItem } = useMeal();
    const [meal, setMeal] = useState<TypeMeal | null>(null);
    const formRef = useRef<MealFormMethods>(null);
    const [resultModalVisible, setResultModalVisible] = useState(false);
    const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        loadMensa();
    }, []);

    const loadMensa = async () => {
        try {
            const data = await getSingleItem(Number(id));
            if (data !== undefined) {
                setMeal(data);
            }
        } catch (error) {
            console.error('Error loading pasti:', error);
        }
    };

    const handleUpdate = async () => {
        const formData = formRef.current?.getFormData() as unknown as TypeMeal;
        if (!formData) return;

        try {
            console.log('formData:', formData);
            await updateItem(Number(id), formData);
            setSuccess(true);
            setResultModalVisible(true);
        } catch (error) {
            console.error('Error updating pasti:', error);
            setSuccess(false);
            setResultModalVisible(true);
        }
    };

    const handleDelete = () => {
        setConfirmDeleteVisible(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteItem(Number(id));
            setSuccess(true);
            setResultModalVisible(true);
        } catch (error) {
            console.error('Error deleting pasto:', error);
            setSuccess(false);
            setResultModalVisible(true);
        }
        setConfirmDeleteVisible(false);
    };

    if (!meal) {
        return <Loading />;
    }

    return (
        <View style={GlobalStyles.mainContainer}>
            <BreadCrumbChangeMeal />
            <ScrollView style={GlobalStyles.scrollContainer}>
                <MealForm
                ref={formRef}
                name={meal.name}
                description={meal.description}
                price={meal.price.toString()}
                type={meal.type}
                />
                

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.deleteButton]}
                        onPress={handleDelete}
                    >
                        <Text style={styles.buttonText}>Elimina</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.saveButton]}
                        onPress={handleUpdate}
                    >
                        <Text style={styles.buttonText}>Salva</Text>
                    </TouchableOpacity>
                </View>
                <ResultModal
                    visible={resultModalVisible}
                    success={success}
                    successMessage={success ?
                        "Operazione completata con successo" :
                        "Si è verificato un errore durante l'operazione"}
                    errorMessage="Si è verificato un errore"
                    onClose={() => {
                        setResultModalVisible(false);
                        if (success) {
                            navigateToMeal();
                        }
                    }}
                />

                <ConfirmationModal
                    visible={confirmDeleteVisible}
                    message="Sei sicuro di voler eliminare questo pasto?"
                    onConfirm={confirmDelete}
                    onCancel={() => setConfirmDeleteVisible(false)}
                />
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 16,
        gap: 16
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center'
    },
    deleteButton: {
        backgroundColor: '#dc3545'
    },
    saveButton: {
        backgroundColor: '#28a745'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default ChangeMeal;