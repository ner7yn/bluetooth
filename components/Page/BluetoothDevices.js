import React, { useEffect, useState } from 'react';
import { View, ScrollView, PermissionsAndroid, Platform, Alert, StyleSheet } from 'react-native';
import BleManagerMock from '../../BleManagerMock';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceItem from '../DeviceItem';
import BluetoothModal from '../Modal/BluetoothModal';
import ConnectionErrorModal from '../Modal/ConnectionErrorModal';

const BluetoothDevices = ({ navigation }) => {
    const [manager] = useState(new BleManagerMock());
    const [devices, setDevices] = useState([]);
    const [scanning, setScanning] = useState(false);
    const [bluetoothEnabled, setBluetoothEnabled] = useState(null);
    const [connecting, setConnecting] = useState(false);
    const [connectionError, setConnectionError] = useState(false);
    const [failedDevice, setFailedDevice] = useState(null);
    const [bluetoothModalVisible, setBluetoothModalVisible] = useState(false);

    useEffect(() => {
        const checkBluetoothStateInterval = setInterval(() => {
            checkBluetoothState();
        }, 5000);

        checkBluetoothState();

        const subscription = manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                setBluetoothEnabled(true);
                startScan();
            } else {
                setBluetoothEnabled(false);
                setBluetoothModalVisible(true);
            }
        }, true);

        loadLastConnectedDevice();

        return () => {
            clearInterval(checkBluetoothStateInterval);
            if (subscription) {
                subscription.remove();
            }
            manager.destroy();
        };
    }, []);

    const checkBluetoothState = () => {
        manager.state()
            .then(state => {
                setBluetoothEnabled(state === 'PoweredOn');
                if (state !== 'PoweredOn') {
                    setBluetoothModalVisible(true);
                } else {
                    setBluetoothModalVisible(false);
                }
            })
            .catch(error => console.error(error));
    };

    const requestBluetoothPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                {
                    title: "Разрешение на Bluetooth",
                    message: "Это приложение требует доступа к Bluetooth.",
                    buttonNeutral: "Спросить позже",
                    buttonNegative: "Отмена",
                    buttonPositive: "ОК"
                }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                Alert.alert("Доступ запрещен", "Вам нужно предоставить разрешение на Bluetooth, чтобы использовать эту функцию.");
            }
        }
    };

    const startScan = () => {
        setScanning(true);
        manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.error(error);
                setScanning(false);
                return;
            }

            if (device && !devices.some(d => d.id === device.id)) {
                setDevices(prevDevices => [...prevDevices, device]);
            }
        });
    };

    const stopScan = () => {
        setScanning(false);
        manager.stopDeviceScan();
    };

    const connectToDevice = (device) => {
        setConnecting(true);
        manager.stopDeviceScan();

        setTimeout(() => {
            setConnecting(false);
            if (Math.random() > 0.5) {
                saveLastConnectedDevice(device);
                navigation.navigate('AppMain', { device });
            } else {
                setFailedDevice(device);
                setConnectionError(true);
            }
        }, 2000);
    };

    const saveLastConnectedDevice = async (device) => {
        try {
            const deviceJson = JSON.stringify(device);
            await AsyncStorage.setItem('lastConnectedDevice', deviceJson);
        } catch (e) {
            console.error('Failed to save last connected device', e);
        }
    };

    const loadLastConnectedDevice = async () => {
        try {
            const deviceJson = await AsyncStorage.getItem('lastConnectedDevice');
            if (deviceJson !== null) {
                const device = JSON.parse(deviceJson);
            }
        } catch (e) {
            console.error('Failed to load last connected device', e);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.deviceList}>
                    {devices.map((device) => (
                        <DeviceItem
                            key={device.id}
                            device={device}
                            onPress={() => connectToDevice(device)}
                        />
                    ))}
                </View>
            </ScrollView>
            <Spinner
                visible={connecting}
                textContent={''}
                textStyle={styles.spinnerTextStyle}
                color="black"
                overlayColor="rgba(255, 255, 255, 0.5)"
            />
            <ConnectionErrorModal
                visible={connectionError}
                device={failedDevice}
                onRetry={() => {
                    setConnectionError(false);
                    connectToDevice(failedDevice);
                }}
                onClose={() => setConnectionError(false)}
            />
            <BluetoothModal
                visible={bluetoothModalVisible}
                onClose={() => setBluetoothModalVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    deviceList: {
        width: '100%',
        alignItems: 'center',
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
});

export default BluetoothDevices;