import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Icon from "react-native-vector-icons/Ionicons";

import Colors from "../Config/Colors";

const data = [
  {
    title: "Now organize more easier !",
    image: require("../Assets/1.jpg"),
    bg: Colors.secondary,
  },
  {
    title: "Make employees happier !",
    image: require("../Assets/2.jpg"),
    bg: Colors.secondary,
  },
  {
    title: "Lets' get started !!",
    image: require("../Assets/3.jpg"),
    bg: Colors.secondary,
  },
];

const _renderItem = ({ item }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: item.bg,
      }}
    >
      <SafeAreaView style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
      </SafeAreaView>
    </View>
  );
};

const _renderNextButton = () => {
  return (
    <View style={styles.buttonCircle}>
      <AntDesign name="arrowright" size={24} color={Colors.white} />
    </View>
  );
};

const _renderDoneButton = () => {
  return (
    <View style={styles.buttonCircle}>
      <Icon name="md-checkmark" color={Colors.white} size={24} />
    </View>
  );
};

const LoadingScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <AppIntroSlider
        data={data}
        keyExtractor={(item) => item.title}
        renderItem={_renderItem}
        activeDotStyle={{ backgroundColor: Colors.primary }}
        onDone={() => {
          navigation.navigate("WelcomeScreen");
        }}
        renderDoneButton={_renderDoneButton}
        renderNextButton={_renderNextButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 96,
  },
  image: {
    width: "100%",
    marginTop: 32,
    resizeMode: "contain",
  },
  title: {
    fontSize: 30,
    color: Colors.black,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonCircle: {
    width: 44,
    height: 44,
    backgroundColor: Colors.ternary,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
