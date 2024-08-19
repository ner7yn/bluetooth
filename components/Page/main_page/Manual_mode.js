// ManualMode.js

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ManualControlModal from '../../Modal/ManualControlModal';
import ScenarioModal from '../../Modal/ScenarioModal';
import HoldModal from '../../Modal/HoldModal';
import SavedSettingsModal from '../../Modal/SavedSettingModal';
import SavedSettingDetailsModal from '../../Modal/SavedSettingDetailsModal'; // Обновленный импорт
import { colors, initialScenarios, STORAGE_KEY, SAVED_SETTINGS_KEY } from '../../../constants';

const ManualMode = ({ route }) => {
    const { device, manager } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [scenarioModalVisible, setScenarioModalVisible] = useState(false);
    const [holdModalVisible, setHoldModalVisible] = useState(false);
    const [savedSettingsModalVisible, setSavedSettingsModalVisible] = useState(false);
    const [savedSettingModalVisible, setSavedSettingModalVisible] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(device.level); // Инициализация с учетом device.level
    const [selectedScenario, setSelectedScenario] = useState(null);
    const [scenarios, setScenarios] = useState(initialScenarios);
    const [savedSettings, setSavedSettings] = useState([]);
    const [savedSettingTitle, setSavedSettingTitle] = useState('');
    const [selectedSavedSetting, setSelectedSavedSetting] = useState(null);

    useEffect(() => {
        loadScenarios();
        loadSavedSettings();
    }, []);

    useEffect(() => {
        // Обновление уровня устройства при изменении selectedIndex
        manager.updateDevice(device.id, { level: selectedIndex });
        console.log(manager)
    }, [selectedIndex]);

    const loadScenarios = async () => {
        try {
            const storedScenarios = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedScenarios) {
                setScenarios(JSON.parse(storedScenarios));
            } else {
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialScenarios));
            }
        } catch (error) {
            console.error('Failed to load scenarios', error);
        }
    };

    const saveScenarios = async (updatedScenarios) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedScenarios));
            setScenarios(updatedScenarios);
        } catch (error) {
            console.error('Failed to save scenarios', error);
        }
    };

    const loadSavedSettings = async () => {
        try {
            const storedSettings = await AsyncStorage.getItem(SAVED_SETTINGS_KEY);
            if (storedSettings) {
                setSavedSettings(JSON.parse(storedSettings));
            }
        } catch (error) {
            console.error('Failed to load saved settings', error);
        }
    };

    const saveSavedSettings = async (updatedSettings) => {
        try {
            await AsyncStorage.setItem(SAVED_SETTINGS_KEY, JSON.stringify(updatedSettings));
            setSavedSettings(updatedSettings);
        } catch (error) {
            console.error('Failed to save saved settings', error);
        }
    };

    const handleArrowPress = (direction) => {
        if (selectedScenario !== null && scenarios[selectedScenario]?.range) {
            const range = scenarios[selectedScenario].range;
            if (direction === 'left' && selectedIndex > range[0]) {
                setSelectedIndex(selectedIndex - 1);
            } else if (direction === 'right' && selectedIndex < range[1]) {
                setSelectedIndex(selectedIndex + 1);
            }
        } else {
            if (direction === 'left' && selectedIndex > 0) {
                setSelectedIndex(selectedIndex - 1);
            } else if (direction === 'right' && selectedIndex < colors.length - 1) {
                setSelectedIndex(selectedIndex + 1);
            }
        }
    };

    const handleScenarioPress = (index) => {
        setSelectedScenario(index);
        setSelectedIndex(scenarios[index].level); // Устанавливаем selectedIndex в level выбранного сценария
        setScenarioModalVisible(true);
    };

    const handleScenarioLongPress = (index) => {
        setSelectedScenario(index);
        setSelectedIndex(scenarios[index].level); // Устанавливаем selectedIndex в level выбранного сценария
        setHoldModalVisible(true);
    };

    const handleSaveButtonPress = () => {
        if (selectedScenario !== null) {
            const updatedScenarios = [...scenarios];
            updatedScenarios[selectedScenario].level = selectedIndex;
            saveScenarios(updatedScenarios);
        }
        setHoldModalVisible(false);
    };

    const handleSaveSetting = () => {
        if (savedSettingTitle.trim() === '') return;
        const newSetting = {
            title: savedSettingTitle,
            level: selectedIndex
        };
        const updatedSettings = [...savedSettings, newSetting];
        saveSavedSettings(updatedSettings);
        setSavedSettingsModalVisible(false);
        setSavedSettingTitle('');
    };

    const handleResetSetting = () => {
        setSavedSettingTitle('');
        setSelectedIndex(0);
        if (selectedSavedSetting !== null) {
            const updatedSettings = [...savedSettings];
            updatedSettings.splice(selectedSavedSetting, 1);
            saveSavedSettings(updatedSettings);
        }
        setSelectedSavedSetting(null);
    };

    const handleSavedSettingPress = (index) => {
        setSelectedSavedSetting(index);
        setSelectedIndex(savedSettings[index].level);
        setSavedSettingModalVisible(true);
    };

    const handleSavedSettingLongPress = (index) => {
        setSelectedSavedSetting(index);
        setSavedSettingTitle(savedSettings[index].title);
        setSelectedIndex(savedSettings[index].level);
        setSavedSettingsModalVisible(true);
    };

    const isInRange = (index, range) => {
        return index >= range[0] && index <= range[1];
    };

    return (
        <View style={styles.container}>
            <View style={styles.block}>
                <Text style={[styles.subTtitle, { marginTop: 10 }]}>Ручная настройка</Text>
                <Pressable style={styles.roundedButton} onPress={() => setModalVisible(true)}>
                </Pressable>
            </View>
            <View style={styles.block}>
                <Text style={[styles.subTtitle]}>Сценарии</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                    {scenarios.map((scenario, index) => (
                        <Pressable
                            key={index}
                            style={styles.scrollViewSquare}
                            onPress={() => handleScenarioPress(index)}
                            onLongPress={() => handleScenarioLongPress(index)}
                        />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.block}>
                <Text style={[styles.subTtitle]}>Сохранённые настройки</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
                    {savedSettings.map((setting, index) => (
                        <Pressable
                            key={index}
                            style={[styles.scrollViewSquare, { backgroundColor: 'black' }]}
                            onPress={() => handleSavedSettingPress(index)}
                            onLongPress={() => handleSavedSettingLongPress(index)}
                        >
                            <Text style={styles.savedSettingText}>{setting.title}</Text>
                        </Pressable>
                    ))}
                    {[...Array(6 - savedSettings.length)].map((_, index) => (
                        <Pressable key={index} style={styles.scrollViewSquare} onLongPress={() => {
                            setSelectedSavedSetting(null);
                            setSavedSettingsModalVisible(true);
                        }} />
                    ))}
                </ScrollView>
            </View>
            <ManualControlModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                selectedIndex={selectedIndex}
                handleArrowPress={handleArrowPress}
                colors={colors}
            />
            <ScenarioModal
                visible={scenarioModalVisible}
                onClose={() => setScenarioModalVisible(false)}
                scenario={scenarios[selectedScenario]}
            />
            <HoldModal
                visible={holdModalVisible}
                onClose={() => setHoldModalVisible(false)}
                scenario={scenarios[selectedScenario]}
                selectedIndex={selectedIndex}
                handleArrowPress={handleArrowPress}
                handleSaveButtonPress={handleSaveButtonPress}
                colors={colors}
                isInRange={isInRange}
            />
            <SavedSettingsModal
                visible={savedSettingsModalVisible}
                onClose={() => setSavedSettingsModalVisible(false)}
                selectedIndex={selectedIndex}
                handleArrowPress={handleArrowPress}
                handleSaveSetting={handleSaveSetting}
                handleResetSetting={handleResetSetting}
                savedSettingTitle={savedSettingTitle}
                setSavedSettingTitle={setSavedSettingTitle}
                colors={colors}
            />
            <SavedSettingDetailsModal // Обновленное использование
                visible={savedSettingModalVisible}
                onClose={() => setSavedSettingModalVisible(false)}
                savedSetting={savedSettings[selectedSavedSetting]}
                setSelectedIndex={(level) => setSelectedIndex(level)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#eee"
    },
    roundedButton: {
        width: "100%",
        height: 100,
        borderRadius: 6,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    subTtitle: {
        marginBottom: 20,
        fontSize: 22,
        textAlign: 'left',
        fontWeight: '500'
    },
    block: {
        width: "80%",
        height: "auto",
        marginBottom: 20
    },
    scrollViewContent: {
        flexDirection: 'row',
        gap: 5
    },
    scrollViewSquare: {
        width: 100,
        height: 100,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    savedSettingText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    }
});

export default ManualMode;