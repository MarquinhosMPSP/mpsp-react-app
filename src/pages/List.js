import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  AsyncStorage,
  Image,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  Platform,
  View
} from "react-native";

import logo from "../assets/unikor.png";
import { Feather } from "@expo/vector-icons";

import HistoryList from "../components/HistoryList";

export default function List({ navigation }) {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("nome").then(setName);
    AsyncStorage.getItem("user").then(setUser);
  }, []);

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

      <Text style={styles.titlePage}>Histórico de relatórios</Text>
      <ScrollView style={styles.history}>
        {name && user ? <HistoryList key={user} name={name} /> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  titlePage: {
    fontWeight: "bold",
    marginTop: 15,
    fontSize: 24,
    alignSelf: "center"
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
  },
  history: {
    marginBottom: 20
  }
});
