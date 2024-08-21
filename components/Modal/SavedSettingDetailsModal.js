// Modal/SavedSettingDetailsModal.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const SavedSettingDetailsModal = ({ visible, onClose, savedSetting, setSelectedIndex }) => {
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
                    <Text style={styles.savedSettingTitle}>{savedSetting?.title}</Text>
                    <TouchableOpacity style={styles.useSavedSettingButton} onPress={() => {
                        setSelectedIndex(savedSetting.level);
                        onClose();
                    }}>
                        <Text style={styles.useSavedSettingButtonText}>Использовать</Text>
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
    savedSettingTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 50
    },
    useSavedSettingButton: {
        width: '100%',
        height: 40,
        borderRadius: 20,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    useSavedSettingButtonText: {
        color: 'white',
        fontSize: 20
    }
});

export default SavedSettingDetailsModal;