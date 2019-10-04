import React, { useEffect, useState } from 'react'
import { withNavigation } from 'react-navigation'
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native'

import api from '../services/api'

function History({ name, navigation }) {

    const [reports, setReports] = useState([]);

    useEffect(() => {
        async function loadHistory() {
            const { data } = await api.get(`/historico/${name}`)

            setReports(data)
        }

        loadHistory()
    }, []);

    function handleNavigate(report) {
        navigation.navigate('Report', { report })
    }

    return (
        <View style={styles.container}>

            {reports.length > 0
                ? <FlatList
                    style={styles.list}
                    data={reports}
                    keyExtractor={report => report._id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Text style={styles.infoText}>Data do relatório:</Text>
                            <Text style={styles.dataText}>{item.dataRelatorio}</Text>

                            <TouchableOpacity onPress={() => handleNavigate(item)} style={styles.button}>
                                <Text style={styles.buttonText}>Visualizar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    list: {
        paddingHorizontal: 20,
    },
    listItem: {
        marginTop: 20,
        alignItems: 'stretch',
    },
    infoText: {
        fontWeight: 'bold',
        fontSize: 18
    },
    dataText: {
        fontSize: 18
    },
    button: {
        height: 32,
        backgroundColor: '#DC3545',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})

export default withNavigation(History)