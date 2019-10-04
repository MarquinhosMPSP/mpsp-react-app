import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, StyleSheet, Platform, TouchableOpacity } from 'react-native'

export default function Report({ navigation }) {

    const report = navigation.getParam('report')

    function handleBack() {
        navigation.navigate('List')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleText}>Dados do relatório</Text>

            <View>
                {report
                    ? Object.entries(report).filter(i => i[0] !== '_id').map((field, index) => {
                        return (
                            <View key={index} style={styles.report}>
                                <Text style={styles.fieldText}>{field[0]}:</Text>
                                <Text style={styles.dataText}>{field[1]}</Text>
                            </View>
                        );
                    })
                    : <Text>Não há dados!</Text>}
                <TouchableOpacity onPress={handleBack} style={styles.button}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? 25 : 0,
        paddingHorizontal: 20,
    },
    titleText: {
        fontWeight: 'bold',
        marginTop: 15,
        fontSize: 24,
        alignSelf: 'center'
    },
    report: {
        marginTop: 20,
        alignItems: 'center'
    },
    fieldText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    dataText: {
        fontSize: 18
    },
    button: {
        height: 42,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
})