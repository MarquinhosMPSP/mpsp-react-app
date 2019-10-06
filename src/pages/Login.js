import React, { useState, useEffect } from "react";
import {
  View,
  AsyncStorage,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  ImageBackground,
  Alert
} from "react-native";

import logo from "../assets/unikor-white.png";
import banner from "../assets/banner-min.png";

import api from "../services/api";

export default function Login({ navigation }) {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("user").then(user => {
      if (user) {
        navigation.navigate("List");
      }
    });
  }, []);

  useEffect(() => {
    setDisabled(!(cpf.length > 0 && senha.length > 0));
  }, [cpf, senha]);

  async function handleSubmit() {
    setLoading(true);
    api
      .post("/autenticar", { cpf, senha })
      .then(async response => {
        const { _id, nome } = response.data;
        await AsyncStorage.setItem("user", _id);
        await AsyncStorage.setItem("nome", nome);
        setLoading(false);
        navigation.navigate("List");
      })
      .catch(err => {
        if (err.response.status == "404") {
          setLoading(false);
          Alert.alert("Autenticação", err.response.data.message);
        }
      });
  }

  return (
    <ImageBackground source={banner} style={styles.background}>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        {loading ? (
          <ActivityIndicator animating={true} size="large" color="#fff" />
        ) : (
          <View style={styles.form}>
            <Image style={styles.logo} source={logo} />

            <Text style={styles.subTitle}>Relatórios integrados</Text>

            <Text style={styles.label}>SEU CPF *</Text>
            <TextInput
              style={styles.input}
              placeholder="Seu CPF"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={cpf}
              onChangeText={setCpf}
              autoFocus={true}
            />

            <Text style={styles.label}>SUA SENHA *</Text>
            <TextInput
              style={styles.input}
              placeholder="Sua senha"
              autoCorrect={false}
              value={senha}
              onChangeText={setSenha}
              autoCompleteType="password"
              secureTextEntry={true}
            />

            <TouchableOpacity
              disabled={disabled}
              onPress={handleSubmit}
              style={disabled ? styles.disabled : styles.button}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginBottom: 0
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "#fff",
    color: "#444",
    fontSize: 16,
    borderRadius: 2,
    marginBottom: 20
  },
  button: {
    height: 42,
    backgroundColor: "#DC3545",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  disabled: {
    height: 42,
    backgroundColor: "rgba(220,53,69,.45)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  buttonText: {
    color: "#fff",
    fontSize: 16
  },
  logo: {
    height: 100,
    resizeMode: "contain",
    alignSelf: "center"
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
    marginBottom: 30
  }
});
