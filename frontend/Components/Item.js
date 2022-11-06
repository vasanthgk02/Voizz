import React, { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { Entypo } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import Ruler from "./Ruler";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Colors from "../Config/Colors";
import renderRightActions from "./RenderRightActions";
import fileUploadApi from "../Api/fileUploadApi";
import sendReward from "../Api/sendReward";

const handleSendReward = async (name, email, sigma) => {
  if (sigma.length == 0) {
    Alert.alert("Voizz says", "Tokens cannot be zero", [
      {
        text: "Ok",
        style: "cancel",
      },
    ]);
    return;
  }
  const response = await sendReward.updateReward({
    name: name,
    email: email,
    reward: parseInt(sigma),
  });
  console.log(response.data);
};

function Item({ title, description, imageUrl, email }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState("Upload Audio To View Result");
  const [audioName, setAudioName] = useState("");
  const [sigma, setSigma] = useState("");

  const handlePress = async (dir) => {
    const file = await DocumentPicker.getDocumentAsync();
    if (file.type == "success") {
      setAudioName(file.name);
      const response = await fileUploadApi.fileUpload(file.uri);
      const result =
        response.body.toUpperCase().substring(0, 1) +
        response.body.substring(1);
      setValue(result);
    }
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          setValue("Upload Audio To View Result");
        }}
      >
        <ScrollView style={stylesModel.container}>
          <View
            style={[
              {
                backgroundColor: Colors.secondary,
                flexDirection: "row-reverse",
                padding: 20,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                setModalVisible(!modalVisible);
                setValue("Upload Audio To View Result");
              }}
            >
              <AntDesign name="closecircle" size={30} color="black" />
            </TouchableOpacity>
          </View>
          <View style={stylesModel.container}>
            <View style={stylesModel.profileContainer}>
              {imageUrl && (
                <Image
                  style={stylesModel.profileImage}
                  source={{ uri: imageUrl }}
                />
              )}
              {!imageUrl && (
                <View
                  style={[
                    stylesModel.profileImage,
                    { justifyContent: "center", alignItems: "center" },
                  ]}
                >
                  <Fontisto name="camera" size={80} color={Colors.black} />
                </View>
              )}
              <View style={stylesModel.descriptor}>
                <Text style={stylesModel.title}>{title}</Text>
                <Text style={stylesModel.description}>{description}</Text>
              </View>
            </View>
            <View style={stylesModel.uploadContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Entypo
                  style={stylesModel.image}
                  name="folder-music"
                  size={60}
                  color={Colors.primary}
                />
                <TouchableOpacity
                  onPress={() => handlePress(title, email)}
                  style={{
                    backgroundColor: Colors.primary,
                    padding: 10,
                    height: 50,
                    borderRadius: 5,
                    marginLeft: 20,
                  }}
                >
                  <Text style={{ fontSize: 16, color: Colors.white }}>
                    Upload Audio
                  </Text>
                </TouchableOpacity>
              </View>
              {value === "Upload Audio To View Result" ? (
                <></>
              ) : (
                <View style={{ flexDirection: "row", margin: 10 }}>
                  <MaterialIcons name="audiotrack" size={24} color="black" />
                  <Text style={[{ fontSize: 16 }]}>{audioName}</Text>
                </View>
              )}
              <Text style={stylesModel.result}>
                {value === "Upload Audio To View Result"
                  ? value
                  : "Analysis : " + value}
              </Text>
              {value !== "Upload Audio To View Result" ? (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    backgroundColor: "white",
                    borderRadius: 10,
                  }}
                >
                  <TextInput
                    placeholder="Enter the tokens to be sent"
                    style={stylesModel.reward}
                    onChangeText={setSigma}
                    value={sigma}
                  />
                  <TouchableOpacity
                    onPress={() => handleSendReward(title, email, sigma)}
                  >
                    <MaterialCommunityIcons
                      name="send-circle"
                      size={50}
                      color={Colors.primary}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <View />
              )}
            </View>
          </View>
        </ScrollView>
      </Modal>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
          <View
            style={{
              alignItems: "center",
              paddingBottom: 10,
            }}
          >
            <View style={styles.container}>
              {imageUrl && (
                <Image style={styles.image} source={{ uri: imageUrl }}></Image>
              )}
              {!imageUrl && (
                <View
                  style={[
                    styles.image,
                    { justifyContent: "center", alignItems: "center" },
                  ]}
                >
                  <Fontisto name="camera" size={40} color={Colors.black} />
                </View>
              )}
              <View style={styles.descriptor}>
                <Text style={styles.name}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Swipeable>
      <Ruler />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "90%",
    height: 80,
    borderRadius: 20,
  },
  descriptor: {
    justifyContent: "center",
    marginLeft: 10,
  },
  description: {
    fontSize: 14,
    paddingTop: 5,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    fontSize: 20,
  },
});

const stylesModel = StyleSheet.create({
  button: {
    display: "none",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  descriptor: {
    alignItems: "center",
  },
  description: {
    fontSize: 16,
  },
  profileContainer: {
    alignItems: "center",
  },
  profileImage: {
    height: 250,
    width: 250,
    borderRadius: 125,
  },
  title: {
    fontSize: 24,
  },
  uploadContainer: {
    padding: 10,
    alignItems: "center",
  },
  result: {
    marginTop: 10,
    fontSize: 20,
  },
  reward: {
    padding: 10,
    borderRadius: 10,
    fontSize: 15,
    backgroundColor: Colors.white,
    color: Colors.black,
  },
});

export default Item;
