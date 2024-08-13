import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Linking } from 'react-native';

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
                <Text style={{ fontSize: 16, marginVertical: 15 }}>Чтобы использовать приложение дальше вам надо включить блютуз</Text>
                <TouchableOpacity onPress={() => Linking.openURL('android.settings.BLUETOOTH_SETTINGS').catch(err => console.error('Не удалось открыть настройки Bluetooth', err))} style={styles.textButton}>
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
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    textButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'gray',
        backgroundColor: 'white',
        alignSelf: 'flex-end'
    },
    textButtonText: {
        color: 'black',
        fontSize: 18,
        textAlign: "center"
    },
});

export default BluetoothModal;