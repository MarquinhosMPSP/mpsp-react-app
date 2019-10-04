import React, { useState, useEffect } from 'react'
import { View, AsyncStorage, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native'

import api from '../services/api'

export default function Login({ navigation }) {

    const [cpf, setCpf] = useState('')
    const [senha, setSenha] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){
                navigation.navigate('List')
            }
        })
    }, [])

    async function handleSubmit() {
        const response = await api.post('/autenticar', {
            cpf, senha
        })        

        const { _id, nome } = response.data

        await AsyncStorage.setItem('user', _id)        
        await AsyncStorage.setItem('nome', nome) 
        
        navigation.navigate('ListHistory')
    }

    return <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.form}>
            <Text style={styles.label}>SEU CPF *</Text>
            <TextInput
                style={styles.input}
                placeholder="Seu CPF"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={cpf}
                onChangeText={setCpf}
            />

            <Text style={styles.label}>SUA SENHA *</Text>
            <TextInput
                style={styles.input}
                placeholder="Sua senha"
                autoCapitalize="words"
                autoCorrect={false}
                value={senha}
                onChangeText={setSenha}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginBottom: 0
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        height: 42,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
})