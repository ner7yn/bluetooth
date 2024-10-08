import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DisconnectModal = ({ visible, deviceName, onCancel, onDisconnect, navigation }) => {
  const handleNavigation = () => {
    onDisconnect();
    navigation.navigate('BluetoothDevices');
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={{ fontSize: 18, textAlign: "center" }}>Вы точно хотите отключиться от {deviceName}?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onCancel} style={styles.modalButton}>
              <Text style={{ fontSize: 16 }}>Отмена</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavigation} style={styles.modalButton}>
              <Text style={{ fontSize: 16 }}>Отключиться</Text>
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
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  modalContent: {
    maxWidth: "80%",
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});

export default DisconnectModal;