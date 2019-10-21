import React, { useEffect, useState } from "react";
import { withNavigation } from "react-navigation";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import { Feather } from "@expo/vector-icons";

import api from "../services/api";

function History({ name, navigation }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    async function loadHistory() {
      const { data } = await api.get(`/historico/${name}`);
      setReports(data);
    }
    loadHistory();
  }, []);

  function handleNavigate(report) {
    navigation.navigate("Report", { report });
  }

  return (
    <View>
      {reports.length > 0 ? (
        <FlatList
          style={styles.list}
          data={reports}
          keyExtractor={report => report._id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Feather name="calendar" size={18} style={styles.icon}>
                <Text style={styles.infoText}> Data do relatório:</Text>
              </Feather>
              <Text style={styles.dateText}>{item.dataRelatorio}</Text>

              <Feather name="user" size={18} style={styles.icon}>
                <Text style={styles.infoText}> Nome Pesquisado:</Text>
              </Feather>
              <Text style={styles.dateText}>{item.alcunha}</Text>

              <TouchableOpacity
                onPress={() => handleNavigate(item)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Visualizar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <ActivityIndicator animating={true} size="large" color="#000" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20
  },
  listItem: {
    marginTop: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 1
  },
  infoText: {
    fontWeight: "bold",
    fontSize: 18
  },
  icon: {
    alignSelf: "center"
  },
  dateText: {
    fontSize: 18,
    alignSelf: "center"
  },
  button: {
    height: 32,
    backgroundColor: "#DC3545",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginTop: 10
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  }
});

export default withNavigation(History);
