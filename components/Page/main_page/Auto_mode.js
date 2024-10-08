import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ProgressBar, Provider as PaperProvider } from 'react-native-paper';

const AutoMode = ({ route }) => {
    const { device, manager } = route.params;
    const buttonValues = [1, 3, 5, 6, 8, 9];
    const [progress, setProgress] = useState(manager.devices[device.id].level);

    useEffect(() => {
        const getProgress = () => {
            const updatedDevice = manager.getDeviceById(device.id);
            return updatedDevice.level / 9; // Вычисляем прогресс в зависимости от level
        };

        setProgress(getProgress());
    }, [device.id, manager]);

    const handleButtonPress = (index) => {
        const newLevel = buttonValues[index];
        setProgress(newLevel / 9); // Обновляем прогресс
        manager.updateDevice(device.id, { level: newLevel }); // Обновляем device через manager
        route.params.device = { ...device, level: newLevel }; // Обновляем device в route.params
        console.log(`New level: ${newLevel}`); // Добавляем лог для проверки

        // Проверяем, изменился ли level в manager
        const updatedDevice = manager.getDeviceById(device.id);
        console.log(`Updated device level in manager: ${updatedDevice.level}`);
    };

    return (
        <PaperProvider>
            <View style={styles.container}>
                <Text style={styles.title}>Ценность мобильности</Text>
                <View style={styles.progressBarContainer}>
                    <ProgressBar progress={progress} style={styles.progressBar} color='green'/>
                </View>
                <View style={styles.card}>
                    <View style={styles.buttonRow}>
                        {buttonValues.slice(0, 3).map((value, index) => (
                            <Pressable
                                key={index}
                                style={styles.button}
                                onPress={() => handleButtonPress(index)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.buttonText}>{index + 1}</Text>
                            </Pressable>
                        ))}
                    </View>
                    <View style={styles.buttonRow}>
                        {buttonValues.slice(3, 6).map((value, index) => (
                            <Pressable
                                key={index + 3}
                                style={styles.button}
                                onPress={() => handleButtonPress(index + 3)}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.buttonText}>{index + 4}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "white"
    },
    title: {
        fontSize: 26,
        marginTop: "20%",
        textAlign: "center",
        marginBottom: 20,
        fontWeight: 'semibold'
    },
    progressBarContainer: {
        width: '80%',
        marginBottom: 20
    },
    progressBar: {
        height: 10,
        borderRadius: 5
    },
    card: {
        width: '90%',
        padding: 20,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10
    },
    button: {
        width: '30%',
        aspectRatio: 4 / 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 5
    },
    buttonText: {
        fontSize: 35,
        color: 'green'
    }
});

export default AutoMode;