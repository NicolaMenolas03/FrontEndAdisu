import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ConfirmationModalProps {
    visible: boolean;
    body: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function ConfirmationModal({ visible, body, onConfirm, onCancel }: ConfirmationModalProps) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{ body }</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onCancel}
                        >
                            <Text style={styles.cancelText}>Annulla</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.confirmButton]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.confirmText}>Conferma</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
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
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        borderRadius: 8,
        padding: 10,
        elevation: 2,
        marginHorizontal: 10,
        minWidth: 100,
    },
    confirmButton: {
        backgroundColor: '#007AFF',
    },
    cancelButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    confirmText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cancelText: {
        color: '#007AFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    }
});