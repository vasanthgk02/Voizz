import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../Config/Colors";
function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>VOIZZ</Text>
        <Text style={styles.tagLine}>Audio Emotion Detection System</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    height: 150,
    width: "100%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: "center",
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
  },
  tagLine: {
    fontWeight: "bold",
  },
});

export default Header;
