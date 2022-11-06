import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Colors from "../Config/Colors";
import Header from "../Components/Header";

function WelcomeScreen({ navigation }) {
  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
      }),
    [navigation]
  );
  return (
    <>
      <Header />
      <View style={styles.welcomeScreen}>
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("LoginOrganization")}
          >
            <Text style={{ fontWeight: "500", fontSize: 18 }}>
              Organization
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("LoginEmployee")}
          >
            <Text style={{ fontWeight: "500", fontSize: 18 }}>Employee</Text>
          </TouchableOpacity>
          <Image
            source={require("../Assets/headphone_audio.jpg")}
            style={{ height: 360, width: 360, top: 60 }}
          ></Image>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  welcomeScreen: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  button: {
    alignItems: "center",
    backgroundColor: Colors.primary,
    width: "70%",
    borderRadius: 15,
    padding: 15,
    margin: 5,
  },
  body: {
    flex: 1,
    flexDirection: "column-reverse",
    alignItems: "center",
    marginBottom: 50,
  },
});

export default WelcomeScreen;
