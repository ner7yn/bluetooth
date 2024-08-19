import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-native-paper";
import AutoMode from "./Auto_mode";
import ManualMode from "./Manual_mode";
import { View, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation, route }) => {
    
    return (
        <View style={styles.container}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <View key={index} style={[styles.tabItem, isFocused && styles.focusedTabItem]}>
                        <Text
                            onPress={onPress}
                            style={[styles.tabLabel, isFocused && styles.focusedTabLabel]}
                        >
                            {label}
                        </Text>
                        {isFocused && <View style={styles.underline} />}
                    </View>
                );
            })}
        </View>
    );
};

export default function AppMain({ route }) {
    const { device,manager } = route.params;


    return (
        <Provider>
            <Tab.Navigator
                initialRouteName="Библиотека звуков"
                tabBar={(props) => <CustomTabBar {...props} route={route} />}
                screenOptions={{
                    headerShown: false, // Скрываем заголовок
                }}
            >
                <Tab.Screen
                    name="Авто режим"
                    component={AutoMode}
                    initialParams={{ device,manager }}
                    options={{
                        tabBarLabel: 'Авто режим',
                    }}
                />
                <Tab.Screen
                    name="Ручной режим"
                    component={ManualMode}
                    initialParams={{ device,manager }}
                    options={{
                        tabBarLabel: 'Ручной режим',
                    }}
                />
            </Tab.Navigator>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        // paddingBottom: 20,
        // paddingTop: ,
        height: 55,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 1,
        paddingBottom: 1
    },
    focusedTabItem: {
        borderTopWidth: 1,
        borderTopColor: '#6f9c3d',
        paddingTop: 0
    },
    tabLabel: {
        fontSize: 22,
        color: '#5c5c5c',
        fontWeight: 'semibold'
    },
    focusedTabLabel: {
        color: '#6f9c3d',
    },
    underline: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#6f9c3d',
    },
});