import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../Config/Colors";

function Ruler() {
  return (
    <View style={styles.container}>
      <View style={styles.hr} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  hr: {
    height: 1,
    width: "80%",
    backgroundColor: Colors.black,
  },
});

export default Ruler;
