import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const ScenarioModal = ({ visible, onClose, scenario }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Image source={{ uri: scenario?.image }} style={styles.modalImage} />
                    <TouchableOpacity style={styles.useButton} onPress={() => { /* Действие при нажатии */ }}>
                        <Text style={styles.useButtonText}>Использовать</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center'
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        marginBottom: 50
    },
    modalImage: {
        width: 100,
        height: 100,
        marginVertical: 15
    },
    useButton: {
        width: '100%',
        height: 40,
        borderRadius: 20,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    useButtonText: {
        color: 'white',
        fontSize: 20
    }
});

export default ScenarioModal;