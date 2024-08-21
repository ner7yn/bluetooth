import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const DeviceItem = ({ device, onPress }) => (
    <TouchableOpacity
        style={styles.deviceItem}
        activeOpacity={0.6}
        onPress={onPress}
    >
        <Text style={styles.deviceName}>{device.name || 'Underfind'}</Text>
        <Text style={styles.deviceMac}>{device.mac || 'Underfind'}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    deviceItem: {
        width: '100%',
        height:75,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#666',
    },
    deviceName: {
        fontSize: 20,
        color: "#666"
    },
    deviceMac: {
        fontSize: 16,
        color: "#666",
        marginLeft: 10,
        marginTop: 5
    },
});

export default DeviceItem;