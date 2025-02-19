import { useState, forwardRef, useImperativeHandle } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, HelperText } from 'react-native-paper';

export type CanteenFormMethods = {
    getFormData: () => FormData | null;
    validateForm: () => boolean;
};

type FormData = {
    name: string;
    address: string;
    city: string;
    postal_code: number;
    province: string;
}

type Props = {
    name?: string;
    address?: string;
    city?: string;
    cap?: string;
    province?: string;
}

const CanteenForm = forwardRef<CanteenFormMethods, Props>(({name = '', address = '', city = '', cap = '', province = ''}, ref) => {
    const [formData, setFormData] = useState({
        name: name,
        address: address,
        city: city,
        cap: cap,
        province: province
    });
    const [errors, setErrors] = useState({
        name: false,
        address: false,
        city: false,
        cap: false,
        province: false
    });

    const validateForm = () => {
        const newErrors = {
            name: formData.name.trim() === '',
            address: formData.address.trim() === '',
            city: formData.city.trim() === '',
            cap: !/^\d{5}$/.test(formData.cap),
            province: formData.province.trim() === ''
        };
        
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleCapChange = (text: string) => {
        const numericValue = text.replace(/[^0-9]/g, '').slice(0, 5);
        setFormData({ ...formData, cap: numericValue });
    };

    useImperativeHandle(ref, () => ({
        getFormData: () => {
            if (!validateForm()) return null;
            return {
                name: formData.name.trim(),
                address: formData.address.trim(),
                city: formData.city.trim(),
                postal_code: parseInt(formData.cap),
                province: formData.province.trim()
            };
        },
        validateForm
    }));

    return(
        <View>
            <View style={styles.formGroup}>
                <TextInput
                    mode="outlined"
                    label="Nome mensa *"
                    placeholder="Nome"
                    value={formData.name}
                    onChangeText={(text) => {
                        setFormData({ ...formData, name: text });
                        setErrors({ ...errors, name: false });
                    }}
                    error={errors.name}
                />
                <HelperText type="error" visible={errors.name}>
                    Il nome della mensa è obbligatorio
                </HelperText>
            </View>

            <View style={styles.formGroup}>
                <TextInput
                    mode="outlined"
                    label="Indirizzo mensa *"
                    placeholder="Indirizzo"
                    value={formData.address}
                    onChangeText={(text) => {
                        setFormData({ ...formData, address: text });
                        setErrors({ ...errors, address: false });
                    }}
                    error={errors.address}
                />
                <HelperText type="error" visible={errors.address}>
                    L'indirizzo è obbligatorio
                </HelperText>
            </View>

            <View style={styles.formGroup}>
                <TextInput
                    mode="outlined"
                    label="Città *"
                    placeholder="Città"
                    value={formData.city}
                    onChangeText={(text) => {
                        setFormData({ ...formData, city: text });
                        setErrors({ ...errors, city: false });
                    }}
                    error={errors.city}
                />
                <HelperText type="error" visible={errors.city}>
                    La città è obbligatoria
                </HelperText>
            </View>

            <View style={styles.formGroup}>
                <TextInput
                    mode="outlined"
                    label="CAP *"
                    placeholder="CAP (5 numeri)"
                    value={formData.cap}
                    onChangeText={handleCapChange}
                    error={errors.cap}
                    keyboardType="numeric"
                    maxLength={5}
                />
                <HelperText type="error" visible={errors.cap}>
                    Inserisci un CAP valido (5 numeri)
                </HelperText>
            </View>

            <View style={styles.formGroup}>
                <TextInput
                    mode="outlined"
                    label="Provincia *"
                    placeholder="Provincia"
                    value={formData.province}
                    onChangeText={(text) => {
                        setFormData({ ...formData, province: text });
                        setErrors({ ...errors, province: false });
                    }}
                    error={errors.province}
                    maxLength={2}
                />
                <HelperText type="error" visible={errors.province}>
                    La provincia è obbligatoria
                </HelperText>
            </View>
        </View>
    )
});


const styles = StyleSheet.create({
    formGroup: {
        marginBottom: 24,
    },
});

export default CanteenForm;