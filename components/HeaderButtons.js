import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';

const MenuButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={{ marginLeft: 20 }}>
    <Octicons name="three-bars" size={24} color="#666" />
  </TouchableOpacity>
);

const BackButton = ({ navigation }) => (
  <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 25 }}>
    <Octicons name="chevron-right" size={30} color="#666" />
  </TouchableOpacity>
);

const SettingsButton = ({settingsVisible, setSettingsVisible }) => {
  const openBluetoothSettings = () => {
    startActivityAsync(ActivityAction.BLUETOOTH_SETTINGS);
    setSettingsVisible(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setSettingsVisible(!settingsVisible)} style={{ marginRight: 20 }}>
        <Entypo name="dots-three-vertical" size={24} color="#666" />
      </TouchableOpacity>
      {settingsVisible && (
        <View style={styles.settingsPopup}>
          <TouchableOpacity onPress={openBluetoothSettings} style={styles.textButton}>
            <Text style={styles.settingsText}>Настройки Bluetooth</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const DeviceInfoButtons = ({ navigation, route, lastConnectedDevice, setDisconnectModalVisible, setDeviceName }) => {
  const device = route.params?.device || lastConnectedDevice;
  const connected = device?.connected;
  const deviceName = device?.name;
  const batteryLevel = device?.batteryLevel || 0;

  const getBatteryIcon = (batteryLevel) => {
    if (batteryLevel >= 75) return 'battery-4';
    if (batteryLevel >= 50) return 'battery-3';
    if (batteryLevel >= 25) return 'battery-2';
    return 'battery-1';
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
      <FontAwesome name={getBatteryIcon(batteryLevel)} size={24} color="#666" style={{ marginRight: 20 }} />
      <MaterialCommunityIcons name={connected ? 'bluetooth' : 'bluetooth-off'} size={24} color={connected ? 'green' : '#666'} style={{ marginRight: 20 }} />
      <TouchableOpacity onPress={() => {
        setDeviceName(deviceName);
        setDisconnectModalVisible(true);
      }}>
        <AntDesign name="disconnect" size={24} color="#666" style={{ marginRight: 20 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  settingsPopup: {
    position: 'absolute',
    top: 30,
    right: 10,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    elevation: 5,
  },
  settingsText: {
    fontSize: 15,
    color:"#555"
  },
});

export default {
  MenuButton,
  BackButton,
  SettingsButton,
  DeviceInfoButtons,
};