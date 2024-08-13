import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const ConnectionErrorModal = ({ visible, device, onRetry, onClose }) => (
    <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={{ fontSize: 20, textAlign: "center", marginVertical: 15 }}>Не удалось подключиться к устройству {device ? device.name : ''}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                    <Text style={styles.retryButtonText}>Повторить</Text>
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
    retryButton: {
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginTop: 10
    },
    retryButtonText: {
        color: 'black',
        fontSize: 18,
        textAlign: "center"
    },
});

export default ConnectionErrorModal;