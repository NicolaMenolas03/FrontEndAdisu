import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { TypeCanteen } from '@/app/lib/definitions';
import CanteenForm, { CanteenFormMethods } from '@/components/form/CanteenForm';
import { navigateToCanteen } from '@/app/nav/utils';
import ResultModal from "@/components/ResultModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useCanteen } from '@/context/CanteenContext';
import BreadCrumbChangeCanteen from '@/components/breadcrumb/BreadCrumbChangeCanteen';
import GlobalStyles from '@/app/GlobalStyles';
import Loading from '@/components/Loading';

const ChangeCanteen = () => {
    const { id } = useLocalSearchParams();
    const { getSingleItem, updateItem, deleteItem } = useCanteen();
    const [mensa, setMensa] = useState<TypeCanteen | null>(null);
    const formRef = useRef<CanteenFormMethods>(null);
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
                setMensa(data);
            }
        } catch (error) {
            console.error('Error loading mensa:', error);
        }
    };

    const handleUpdate = async () => {
        const formData = formRef.current?.getFormData();
        if (!formData) return;

        try {
            await updateItem(Number(id), formData);
            setSuccess(true);
            setResultModalVisible(true);
        } catch (error) {
            console.error('Error updating mensa:', error);
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
            console.error('Error deleting mensa:', error);
            setSuccess(false);
            setResultModalVisible(true);
        }
        setConfirmDeleteVisible(false);
    };

    if (!mensa) {
        return <Loading />;
    }

    return (
        <View style={GlobalStyles.mainContainer}>
            <BreadCrumbChangeCanteen />
            <ScrollView style={GlobalStyles.scrollContainer}>
                <CanteenForm
                    ref={formRef}
                    name={mensa.name}
                    address={mensa.address}
                    city={mensa.city}
                    cap={mensa.postal_code.toString()}
                    province={mensa.province} />

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
                            navigateToCanteen();
                        }
                    }}
                />

                <ConfirmationModal
                    visible={confirmDeleteVisible}
                    message="Sei sicuro di voler eliminare questa mensa?"
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

export default ChangeCanteen;