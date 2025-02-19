import { useState, forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, HelperText, Checkbox, SegmentedButtons } from 'react-native-paper';

export type MealFormMethods = {
    getFormData: () => FormData | null;
    validateForm: () => boolean;
};

const ALLERGENS_OPTIONS = [
    { id: 'lattosio', label: 'Lattosio' },
    { id: 'glutine', label: 'Glutine' },
    { id: 'crostacei', label: 'Crostacei' },
    { id: 'fruttaSecca', label: 'Frutta secca' },
    { id: 'uova', label: 'Uova' },
    { id: 'pesce', label: 'Pesce' },
    { id: 'soia', label: 'Soia' },
];

const TYPE_OPTIONS = [
    { value: 'first', label: 'Primo' },
    { value: 'second', label: 'Secondo' },
    { value: 'sweet', label: 'Dolce' }
];

type FormData = {
    name: string;
    description: string;
    price: number;
    type: string;
    allergens?: string[];
}

type Props = {
    name?: string;
    description?: string;
    price?: string;
    type?: string;
    allergens?: string;
}

const MealForm = forwardRef<MealFormMethods, Props>(({ name = '', description = '', price = '', type = '', allergens = ' ' }, ref) => {
    const [formData, setFormData] = useState({
        name: name,
        description: description,
        price: price,
        type: type,
        allergens: allergens ? allergens.split(',') : []
    });
    const [errors, setErrors] = useState({
        name: false,
        description: false,
        price: false,
        type: false,
        allergens: false
    });

    const validateForm = () => {
        const newErrors = {
            name: formData.name.trim() === '',
            description: formData.description.trim() === '',
            price: formData.price.trim() === '' || isNaN(parseFloat(formData.price)),
            type: formData.type === '',
            allergens: false
        };

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handlePriceChange = (text: string) => {
        const numericValue = text
            .replace(/[^0-9.,]/g, '') // Permette solo numeri, punto e virgola
            .replace(',', '.') // Converte la virgola in punto per standardizzare
            .replace(/(\..*)\./g, '$1') // Evita più di un punto decimale
            .match(/^\d*(\.\d{0,2})?/g)?.[0] || ''; // Permette solo due decimali

        setFormData({ ...formData, price: numericValue });
    };

    useImperativeHandle(ref, () => ({
        getFormData: () => {
            if (!validateForm()) return null;
            return {
                name: formData.name.trim(),
                description: formData.description.trim(),
                price: parseFloat(formData.price.trim()),
                type: formData.type.trim(),
            };
        },
        validateForm
    }));

    return (
        <View>
            <View style={styles.formGroup}>
                <TextInput
                    mode="outlined"
                    label="Nome pasto *"
                    placeholder="Nome"
                    value={formData.name}
                    onChangeText={(text) => {
                        setFormData({ ...formData, name: text });
                        setErrors({ ...errors, name: false });
                    }}
                    error={errors.name}
                />
                <HelperText type="error" visible={errors.name}>
                    Il nome del pasto è obbligatorio
                </HelperText>
            </View>

            <View style={styles.formGroup}>
                <TextInput
                    mode="outlined"
                    label="Descrizione pasto *"
                    placeholder="Descrizione"
                    value={formData.description}
                    onChangeText={(text) => {
                        setFormData({ ...formData, description: text });
                        setErrors({ ...errors, description: false });
                    }}
                    error={errors.description}
                />
                <HelperText type="error" visible={errors.description}>
                    La descrizione è obbligatorio
                </HelperText>
            </View>

            <View style={styles.formGroup}>
                <TextInput
                    mode="outlined"
                    label="Prezzo del pasto*"
                    placeholder="Prezzo"
                    value={formData.price}
                    onChangeText={handlePriceChange}
                    error={errors.price}
                    keyboardType="numeric"
                />
                <HelperText type="error" visible={errors.price}>
                    Inserisci un prezzo valido
                </HelperText>
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.typeTitle}>Tipo di pasto *</Text>
                <SegmentedButtons
                    value={formData.type}
                    onValueChange={(value) => {
                        setFormData({ ...formData, type: value });
                        setErrors({ ...errors, type: false });
                    }}
                    buttons={TYPE_OPTIONS.map((option) => ({
                        value: option.value,
                        label: option.label,
                        style: styles.segmentButton,
                    }))}
                    style={styles.segmentedButtons}
                />
                <HelperText type="error" visible={errors.type}>
                    Seleziona un tipo di pasto
                </HelperText>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.allergenTitle}>Allergeni (opzionale)</Text>
                <View style={styles.allergensContainer}>
                    {ALLERGENS_OPTIONS.map((allergen) => (
                        <View key={allergen.id} style={styles.checkboxContainer}>
                            <Checkbox.Android
                                status={
                                    formData.allergens.includes(allergen.id)
                                        ? 'checked'
                                        : 'unchecked'
                                }
                                onPress={() => {
                                    setFormData(prev => ({
                                        ...prev,
                                        allergens: prev.allergens.includes(allergen.id)
                                            ? prev.allergens.filter(a => a !== allergen.id)
                                            : [...prev.allergens, allergen.id]
                                    }));
                                }}
                            />
                            <Text style={styles.checkboxLabel}>{allergen.label}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )
});


const styles = StyleSheet.create({
    formGroup: {
        marginBottom: 24,
    },
    allergenTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
        marginBottom: 12,
    },
    allergensContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        backgroundColor: '#FAFAFA',
        borderRadius: 8,
        padding: 12,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',  // Two columns layout
        marginVertical: 4,
    },
    checkboxLabel: {
        fontSize: 14,
        color: '#333333',
        marginLeft: 8,
    },
    typeTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
        marginBottom: 12,
    },
    segmentedButtons: {
        flexDirection: 'row',
        backgroundColor: '#FAFAFA',
        borderRadius: 8,
    },
    segmentButton: {
        flex: 1,
        borderColor: '#E0E0E0',
    },
});

export default MealForm;