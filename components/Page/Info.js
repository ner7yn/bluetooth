import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Info = ({ route }) => {
  const { device } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Информация о подключенном устройстве</Text>
      <Text>Имя устройства: {device.name}</Text>
      <Text>Mac адрес устройства: {device.mac}</Text>
      <Text>Статус подключения: {device.connected ? 'Подключено' : 'Не подключено'}</Text>
      <Text>Уровень заряда батареи: {device.batteryLevel}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white"
  },
  title: {
    fontSize: 20,
    textAlign:"center"
  }
});

export default Info;