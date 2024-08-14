import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BluetoothDevices from './components/Page/BluetoothDevices';
import MenuScreen from './components/Page/Menu';
import Info from './components/Page/Info';
import HeaderButtons from './components/HeaderButtons';
import DisconnectModal from './components/Modal/DisconnectModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  const [lastConnectedDevice, setLastConnectedDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [disconnectModalVisible, setDisconnectModalVisible] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [settingsVisible, setSettingsVisible] = useState(false);

  useEffect(() => {
    const fetchLastConnectedDevice = async () => {
      const deviceJson = await AsyncStorage.getItem('lastConnectedDevice');
      if (deviceJson !== null) {
        const device = JSON.parse(deviceJson);
        setLastConnectedDevice(device);
      }
      setLoading(false);
    };
    fetchLastConnectedDevice();
  }, []);

  const saveLastConnectedDevice = async (device) => {
    try {
      const deviceJson = JSON.stringify(device);
      await AsyncStorage.setItem('lastConnectedDevice', deviceJson);
    } catch (e) {
      console.error('Failed to save last connected device', e);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const handleDisconnect = () => {
    setDisconnectModalVisible(false);
    saveLastConnectedDevice(null);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={lastConnectedDevice ? "Info" : "BluetoothDevices"}>
        <Stack.Screen
          name="BluetoothDevices"
          component={BluetoothDevices}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: 'Устройства Bluetooth',
            headerTitleAlign: 'center',
            headerTintColor: '#555',
            headerTitleStyle:{fontSize:20},
            headerLeft: () => (
              <HeaderButtons.MenuButton navigation={navigation} />
            ),
            headerRight: () => (
              <HeaderButtons.SettingsButton
                navigation={navigation}
                settingsVisible={settingsVisible}
                setSettingsVisible={setSettingsVisible}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Menu"
          component={MenuScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitle: '',
            headerLeft: () => (
              <HeaderButtons.BackButton navigation={navigation} />
            ),
          })}
        />
        <Stack.Screen
          name="Info"
          component={Info}
          options={({ navigation, route }) => ({
            headerShown: true,
            headerTitle: '',
            headerTitleAlign: 'center',
            headerTintColor: '#111',
            headerLeft: () => (
              <HeaderButtons.MenuButton navigation={navigation} />
            ),
            headerRight: () => (
              <>
              <DisconnectModal
              visible={disconnectModalVisible}
              deviceName={deviceName}
              onCancel={() => setDisconnectModalVisible(false)}
              onDisconnect={handleDisconnect}
              navigation={navigation}
            />
              <HeaderButtons.DeviceInfoButtons
                navigation={navigation}
                route={route}
                lastConnectedDevice={lastConnectedDevice}
                setDisconnectModalVisible={setDisconnectModalVisible}
                setDeviceName={setDeviceName}
              />
            </>
            ),
          })}
          initialParams={{ device: lastConnectedDevice }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay:{
    flex:1,
    width:600,
    height:1000
  }
});

export default App;