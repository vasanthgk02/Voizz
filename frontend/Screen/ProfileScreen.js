import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Colors from "../Config/Colors";
import employeeDetailsApi from "../Api/employeeDetailsApi";
import ActivityIndicator from "../Components/ActivityIndicator";
import { MaterialIcons } from "@expo/vector-icons";
import ProgressBar from "../Components/ProgressBar";
import { Fontisto } from "@expo/vector-icons";
import employeeApi from "../Api/employeeApi";

const Item = ({ title, result }) => (
  <>
    <View style={{ alignItems: "center" }}>
      <View
        style={[
          styles.item,
          {
            backgroundColor: Colors.list,
            width: "90%",
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={[styles.title, { flexDirection: "row" }]}>
          <MaterialIcons name="audiotrack" size={24} color="black" />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={[styles.title]}> | {result}</Text>
      </View>
    </View>
  </>
);

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const point = (result) => {
  switch (result) {
    case "Ps":
      return 8;
    case "Happy":
      return 7;
    case "Calm":
      return 6;
    case "Neutral":
      return 5;
    case "Sad":
      return 4;
    case "Fear":
      return 3;
    case "Disgust":
      return 2;
    case "Angry":
      return 1;
    default:
      return 0;
  }
};

function Profile({ navigation }) {
  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
        Alert.alert("Voizz says?", "Going back will logout!", [
          {
            text: "Logout",
            style: "destructive",
            onPress: () => {
              navigation.dispatch(e.data.action);
            },
          },
          { text: "Don't leave", style: "cancel", onPress: () => {} },
        ]);
      }),
    [navigation]
  );

  const [imageUrl, setImageUrl] = useState();
  const [name, setName] = useState();
  const [DATA, setDATA] = useState([]);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadListing = async () => {
    setLoading(true);
    const response = await employeeDetailsApi.getDetails();
    const data = response.data[0];
    setImageUrl(data["url"]);
    setName(data["name"]);
    setDATA(data["audioHistory"]);

    wait(2000).then(() => {
      let percentage = 0;
      for (var i = 0; i < DATA.length; i++) {
        percentage += point(DATA[i]["result"]);
      }
      setValue(() => {
        // return DATA.length != 0 ? (percentage / (8 * DATA.length)) * 100 : 0;
        return 63;
      });
      setLoading(false);
    });
  };

  useEffect(() => {
    loadListing();
  }, [value]);

  let key = 1;

  return (
    <>
      {loading ? (
        <View style={{ flex: 1, backgroundColor: Colors.secondary }}>
          <ActivityIndicator
            visible={true}
            source={require("../Assets/profileLoading.json")}
          />
        </View>
      ) : (
        <>
          <View
            style={{
              backgroundColor: Colors.secondary,
              height: "50%",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "15%",
              }}
            >
              <ProgressBar value={value} />
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={[
                  styles.container,
                  { justifyContent: "center", marginTop: "5%" },
                ]}
              >
                {imageUrl && (
                  <Image
                    style={styles.image}
                    source={{ uri: imageUrl }}
                  ></Image>
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
                  <Text style={styles.name}>{name}</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.heading}>Audio files history : </Text>
          <FlatList
            data={DATA}
            keyExtractor={() => key++}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={loadListing} />
            }
            renderItem={(item) => (
              <Item
                title={item["item"]["audioName"]}
                result={item["item"]["result"]}
              ></Item>
            )}
          />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  imageBlur: {
    height: 400,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    height: 300,
    width: 300,
    borderRadius: 150,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 20,
  },
  item: {
    marginBottom: 3,
    flexDirection: "row",
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    marginRight: 5,
  },
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

export default Profile;
