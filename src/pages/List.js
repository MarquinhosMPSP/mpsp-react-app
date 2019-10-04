import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, Platform, StyleSheet, AsyncStorage, Image, ScrollView, TouchableHighlight } from 'react-native'

import logo from '../assets/unikor.png'

import HistoryList from '../components/HistoryList'

export default function List({ navigation }) {

    const [name, setName] = useState('')
    const [user, setUser] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('nome').then(setName)
        AsyncStorage.getItem('user').then(setUser)
    }, [])

    async function handleLogout() {
        await AsyncStorage.removeItem('nome')
        await AsyncStorage.removeItem('user')

        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableHighlight onPress={handleLogout}>
                <Image style={styles.logo} source={logo} />
            </TouchableHighlight>

            <Text style={styles.titlePage}>Histórico de relatórios</Text>
            <ScrollView>
                {name && user ? <HistoryList style={styles.list} key={user} name={name} /> : null}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        paddingBottom: Platform.OS === 'android' ? 25 : 0,
    },
    titlePage: {
        fontWeight: 'bold',
        marginTop: 15,
        fontSize: 24,
        alignSelf: 'center'
    },
    logo: {
        marginTop: 20,
        height: 60,
        resizeMode: "contain",
        alignSelf: "center"
    },
})