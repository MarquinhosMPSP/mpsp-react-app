import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, Platform, StyleSheet, AsyncStorage } from 'react-native'

import HistoryList from '../components/HistoryList'

export default function List() {

    const [name, setName] = useState('')
    const [user, setUser] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('nome').then(setName)
        AsyncStorage.getItem('user').then(setUser)
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titlePage}>Histórico de relatórios</Text>
            {name && user ? <HistoryList key={user} name={name} /> : null}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    titlePage: {
        fontWeight: 'bold',
        marginTop: 15,
        fontSize: 24,
        alignSelf: 'center'
    }
})