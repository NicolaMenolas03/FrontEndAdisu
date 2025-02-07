import { TypeCanteen } from "@/app/lib/definitions";
import { useCRUD } from "@/hooks/useCRUD";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal } from "react-native";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { navigateToMensa } from "@/app/nav/utils";

const AddMensa = () => {
    const router = useRouter();
    const { createItem, loading } = useCRUD<TypeCanteen>("/canteen/");
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        cap: '',
        province: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        address: '',
        city: '',
        cap: '',
        province: ''
    });
    const [modalVisible, setModalVisible] = useState(false);

    const validate = () => {
        let tempErrors = {
            name: '',
            address: '',
            city: '',
            cap: '',
            province: ''
        };
        let isValid = true;

        // Name validation
        if (!formData.name.trim()) {
            tempErrors.name = 'Il nome è obbligatorio';
            isValid = false;
        }

        // Address validation
        if (!formData.address.trim()) {
            tempErrors.address = "L'indirizzo è obbligatorio";
            isValid = false;
        }

        // City validation
        if (!formData.city.trim()) {
            tempErrors.city = 'La città è obbligatoria';
            isValid = false;
        }

        // CAP validation
        if (!formData.cap.trim()) {
            tempErrors.cap = 'Il CAP è obbligatorio';
            isValid = false;
        } else if (!/^\d{5}$/.test(formData.cap)) {
            tempErrors.cap = 'Il CAP deve essere di 5 numeri';
            isValid = false;
        }

        // Province validation
        if (!formData.province.trim()) {
            tempErrors.province = 'La provincia è obbligatoria';
            isValid = false;
        } else if (formData.province.length !== 2) {
            tempErrors.province = 'La provincia deve essere di 2 caratteri';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (validate()) {
            try {
                await createItem({
                    name: formData.name,
                    address: formData.address,
                    city: formData.city,
                    postal_code: parseInt(formData.cap),
                    province: formData.province
                });
                setModalVisible(true); // Mostra il modal al successo
                // Resetta il form
                setFormData({
                    name: '',
                    address: '',
                    city: '',
                    cap: '',
                    province: ''
                });
            } catch (error) {
                console.error('Error creating mensa:', error);
            }
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
                <TouchableOpacity onPress={() => router.push("/(tabs)/landingPage")}>
                    <Text style={styles.breadcrumbItem}>Home</Text>
                </TouchableOpacity>
                <Text style={styles.breadcrumbSeparator}>/</Text>
                <TouchableOpacity onPress={() => router.push("/Mensa/(mensa)/mensa")}>
                    <Text style={styles.breadcrumbItem}>Mense</Text>
                </TouchableOpacity>
                <Text style={styles.breadcrumbSeparator}>/</Text>
                <Text style={[styles.breadcrumbItem, styles.breadcrumbActive]}>
                    Aggiunta Mensa
                </Text>
            </View>

            <Text style={styles.title}>Aggiunta Mensa</Text>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={[styles.input, errors.name ? styles.inputError : null]}
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}

                />
                {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Indirizzo</Text>
                <TextInput
                    style={[styles.input, errors.address ? styles.inputError : null]}
                    value={formData.address}
                    onChangeText={(text) => setFormData({ ...formData, address: text })}

                />
                {errors.address ? <Text style={styles.errorText}>{errors.address}</Text> : null}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Città</Text>
                <TextInput
                    style={[styles.input, errors.city ? styles.inputError : null]}
                    value={formData.city}
                    onChangeText={(text) => setFormData({ ...formData, city: text })}

                />
                {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>CAP</Text>
                <TextInput
                    style={[styles.input, errors.cap ? styles.inputError : null]}
                    value={formData.cap}
                    onChangeText={(text) => setFormData({ ...formData, cap: text })}

                />
                {errors.cap ? <Text style={styles.errorText}>{errors.cap}</Text> : null}
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Provincia</Text>
                <TextInput
                    style={[styles.input, errors.province ? styles.inputError : null]}
                    value={formData.province}
                    onChangeText={(text) => setFormData({ ...formData, province: text })}

                />
                {errors.province ? <Text style={styles.errorText}>{errors.province}</Text> : null}
            </View>
            {loading ? <Text>Loading...</Text> :
                <>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Aggiungi Mensa</Text>
                    </TouchableOpacity>
                </>}

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Successo!</Text>
                        <Text style={styles.modalText}>La mensa è stata aggiunta con successo.</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Chiudi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
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
    formGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#333333',
        fontWeight: '500',
    },
    icon: {
        paddingRight: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: '#FAFAFA',
        color: '#333333',
    },
    inputError: {
        borderColor: '#FF3B30',
        backgroundColor: '#FFF5F5',
    },
    errorText: {
        color: '#FF3B30',
        marginTop: 8,
        fontSize: 14,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#007bff'
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333'
    },
    modalButton: {
        backgroundColor: '#007bff',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
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