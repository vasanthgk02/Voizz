import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

import Header from "../Components/Header";
import Colors from "../Config/Colors";

function Employee({ imageUrl, title, description }) {
  return (
    <>
      <Header />
      <View style={stylesModel.container}>
        <View style={stylesModel.profileContainer}>
          <Image style={stylesModel.profileImage} source={imageUrl} />
          <View style={stylesModel.descriptor}>
            <Text style={stylesModel.title}>{title}</Text>
            <Text style={stylesModel.description}>{description}</Text>
          </View>
        </View>
        <View style={stylesModel.uploadContainer}>
          <Entypo
            style={stylesModel.image}
            name="folder-music"
            size={100}
            color={Colors.primary}
          />
          <Button
            onPress={() => handlePress(title)}
            title="Upload Audio"
          ></Button>
        </View>
      </View>
    </>
  );
}

const stylesModel = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    padding: 20,
    flex: 1,
  },
  profileContainer: {
    alignItems: "center",
  },
  profileImage: {
    height: 200,
    width: 200,
    borderRadius: 5,
  },
  descriptor: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
  },
  description: {
    fontSize: 16,
  },
  uploadContainer: {
    padding: 10,
    alignItems: "center",
  },
  button: {
    display: "none",
  },
});

export default Employee;
