import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';

const BluetoothModal = ({ visible, onClose }) => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>Bluetooth выключен.</Text>
                <Text style={{ fontSize: 16 }}>Чтобы использовать приложение дальше вам надо включить блютуз</Text>
                <TouchableOpacity onPress={() => startActivityAsync(ActivityAction.BLUETOOTH_SETTINGS)} style={styles.textButton}>
                    <Text style={styles.textButtonText}>Настройки Bluetooth</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    modalContent: {
        maxWidth: "85%",
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
        elevation: 5,
        gap:10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textButton: {
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#888',
        backgroundColor: 'white',
        alignSelf: 'flex-end'
    },
    textButtonText: {
        color: '#444',
        fontSize: 16,
        textAlign: "center"
    },
});

export default BluetoothModal;