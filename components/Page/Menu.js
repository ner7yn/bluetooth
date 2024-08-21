import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';


const Menu = () => {
    const [securityOpen, setSecurityOpen] = useState(false);
    const [privacyOpen, setPrivacyOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setSecurityOpen(!securityOpen)} activeOpacity={1}>
                <View style={styles.block}>
                {securityOpen ? <Octicons name="chevron-down" size={18} color="#333" style={styles.icon} /> :<Octicons name="chevron-right" size={18} color="#333" style={styles.icon} /> }
                    <Text style={styles.title}>Безопасность</Text>
                </View>
                {securityOpen && <Text style={styles.text}>Текст о безопасности</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPrivacyOpen(!privacyOpen)} activeOpacity={1}>
                <View style={styles.block}>
                {privacyOpen ? <Octicons name="chevron-down" size={18} color="#333" style={styles.icon} /> :<Octicons name="chevron-right" size={18} color="#333" style={styles.icon} /> }
                    <Text style={styles.title}>Правила конфиденциальности</Text>
                </View>
                {privacyOpen && <Text style={styles.text}>Текст о правилах конфиденциальности</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setAboutOpen(!aboutOpen)} activeOpacity={1}>
                <View style={styles.block}>
                {aboutOpen ? <Octicons name="chevron-down" size={18} color="#333" style={styles.icon} /> :<Octicons name="chevron-right" size={18} color="#333" style={styles.icon} /> }
                    <Text style={styles.title}>О приложении</Text>
                </View>
                {aboutOpen && <Text style={styles.text}>Текст о приложении</Text>}
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 10,
        backgroundColor: "white",
        gap: 8
    }, title: {
        fontSize: 22,
        color:"#333"
    }, text: {
        paddingLeft: 28,
        fontSize: 18,
        color:"#555"
    }, block: {
        flexDirection: 'row', // Устанавливаем направление flex-контейнера в строку
        alignItems: 'center',
    }, icon: {
        width:20,
        height:20
    }
})

export default Menu;