import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, AsyncStorage } from 'react-native'

import ReportList from '../components/ReportList'

import api from '../services/api'

export default function List() {

    const [reports, setReports] = useState([])
    const [name, setName] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('nome').then(nome => {
            setReports(getReports(nome));
        })
    }, [])

    async function getReports(nome) {
        response = await api.get(`/historico/${nome}`)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ReportList />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})