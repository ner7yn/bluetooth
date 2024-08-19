// Modal/SavedSettingsModal.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const SavedSettingsModal = ({ 
    visible, 
    onClose, 
    selectedIndex, 
    handleArrowPress, 
    handleSaveSetting, 
    handleResetSetting, 
    savedSettingTitle, 
    setSavedSettingTitle, 
    colors 
}) => {
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
                    <View style={styles.stepCounter}>
                        {colors.map((_, index) => (
                            <Text key={index} style={[styles.stepText, index === selectedIndex ? styles.highlightedText : null]}>
                                {index}
                            </Text>
                        ))}
                    </View>
                    <View style={styles.gradientBox}>
                        {colors.map((color, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.square,
                                    { backgroundColor: color },
                                    index === selectedIndex ? styles.highlightedSquare : null,
                                ]}
                            />
                        ))}
                    </View>

                    <View style={styles.arrowButtons}>
                        <View style={styles.arrowButtonContainer}>
                            <Text style={styles.arrowButtonLabel}>ниже</Text>
                            <TouchableOpacity onPress={() => handleArrowPress('left')}>
                                <AntDesign name="leftcircle" size={35} color="gray" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.arrowButtonContainer}>
                            <TouchableOpacity onPress={() => handleArrowPress('right')}>
                                <AntDesign name="rightcircle" size={35} color="gray" />
                            </TouchableOpacity>
                            <Text style={styles.arrowButtonLabel}>выше</Text>
                        </View>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите название"
                        value={savedSettingTitle}
                        onChangeText={setSavedSettingTitle}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.resetButton} onPress={handleResetSetting}>
                            <Text style={styles.resetButtonText}>Сброс</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveSetting}>
                            <Text style={styles.saveButtonText}>Сохранить</Text>
                        </TouchableOpacity>
                    </View>
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
    gradientBox: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 20
    },
    square: {
        width: 30,
        height: 30,
    },
    highlightedSquare: {
        width: 34,
        height: 34,
    },
    stepCounter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    stepText: {
        fontSize: 0,
        width: 34,
        textAlign: 'center',
        fontWeight: "bold",
        marginBottom: 2
    },
    highlightedText: {
        fontSize: 22,
        width: 34,
    },
    arrowButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20
    },
    arrowButtonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 6
    },
    arrowButtonLabel: {
        fontSize: 22,
        fontWeight: '500',
        height: 38
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    resetButton: {
        width: '48%',
        height: 40,
        borderRadius: 20,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    resetButtonText: {
        color: 'white',
        fontSize: 20
    },
    saveButton: {
        width: '48%',
        height: 40,
        borderRadius: 20,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center'
    },
    saveButtonText: {
        color: 'white',
        fontSize: 20
    }
});

export default SavedSettingsModal;