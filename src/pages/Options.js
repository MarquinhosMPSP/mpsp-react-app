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

function Options({ navigation }) {
    const report = navigation.getParam("report");

    return(
        <View style={styles.container}>
        <TouchableOpacity
                style={styles.button}
        >
                <Text style={styles.buttonText}>Detran </Text>
        </TouchableOpacity>
      </View>
    )
}


  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  button: {
    height: 32,
    backgroundColor: "#DC3545",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginTop: 10
  }
});

export default withNavigation(Options);