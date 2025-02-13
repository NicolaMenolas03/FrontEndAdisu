import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { TypeCanteen } from '@/app/lib/definitions';
import MensaForm, { MensaFormMethods } from '@/components/form/mensaForm';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { navigateToMensa } from '@/app/nav/utils';
import ResultModal from "@/components/ResultModal";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useCanteen } from '@/context/CanteenContext';

const ChangeMensa = () => {
    const { id } = useLocalSearchParams();
    const { getSingleItem, updateItem, deleteItem } = useCanteen();
    const [mensa, setMensa] = useState<TypeCanteen | null>(null);
    const formRef = useRef<MensaFormMethods>(null);
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
        return <Text>Caricamento...</Text>;
    }

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.breadcrumbContainer}>
                    <Icon
                        name="arrow-left"
                        size={28}
                        color="#007FFF"
                        style={styles.icon}
                        onPress={navigateToMensa}
                    />
                    <TouchableOpacity onPress={() => router.push("/(tabs)/landingPage")}>
                        <Text style={styles.breadcrumbItem}>Home</Text>
                    </TouchableOpacity>
                    <Text style={styles.breadcrumbSeparator}>/</Text>
                    <TouchableOpacity onPress={() => router.push("/Mensa/(mensa)/mensa")}>
                        <Text style={styles.breadcrumbItem}>Mense</Text>
                    </TouchableOpacity>
                    <Text style={styles.breadcrumbSeparator}>/</Text>
                    <Text style={[styles.breadcrumbItem, styles.breadcrumbActive]}>
                        Modifica Mensa
                    </Text>
                </View>
                <MensaForm
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
                        navigateToMensa();
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
    );
};

const styles = StyleSheet.create({
    icon: {
        marginRight: 10,
    },
    breadcrumbContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 5,
    },
    containerMensa: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 15,
        backgroundColor: 'white',
        width: '100%',
        justifyContent: 'flex-start',
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
    mainContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
        width: "100%",
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
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

export default ChangeMensa;