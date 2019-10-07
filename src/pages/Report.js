import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  AsyncStorage
} from "react-native";

import { Feather } from "@expo/vector-icons";

import logo from "../assets/unikor.png";

export default function Report({ navigation }) {
  const report = navigation.getParam("report");

  function handleBack() {
    navigation.navigate("List");
  }

  async function handleLogout() {
    await AsyncStorage.removeItem("nome");
    await AsyncStorage.removeItem("user");

    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topMenu}>
        <Image style={styles.logo} source={logo} />
        <Feather name="log-out" onPress={handleLogout} size={25}></Feather>
      </View>

      <Text style={styles.titleText}>Dados do relatório</Text>

      <View style={styles.body}>
        {report ? (
          Object.entries(report)
            .filter(i => i[0] !== "_id")
            .map((field, index) => {
              return (
                <View key={index} style={styles.report}>
                  <Text style={styles.fieldText}>{field[0]}:</Text>
                  <Text style={styles.dataText}>{field[1]}</Text>
                </View>
              );
            })
        ) : (
          <Text>Não há dados!</Text>
        )}
        <TouchableOpacity onPress={handleBack} style={styles.button}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  titleText: {
    fontWeight: "bold",
    marginTop: 15,
    fontSize: 24,
    alignSelf: "center"
  },
  body: {
    marginTop: 20,
    backgroundColor: "#fff",
    width: "80%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1
  },
  report: {
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#fff"
  },
  fieldText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  dataText: {
    fontSize: 18
  },
  button: {
    height: 42,
    backgroundColor: "#DC3545",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginTop: 30
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  logo: {
    height: 60,
    width: "30%",
    resizeMode: "center",
    alignSelf: "center"
  },
  topMenu: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: "#fff"
  }
});
