import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";

import Colors from "../Config/Colors";
import employeeDetailsApi from "../Api/employeeDetailsApi";
import employeeApi from "../Api/employeeApi";
import LogOut from "../Components/LogOut";

const handleBrowser = async () => {
  await WebBrowser.openBrowserAsync("https://www.coinbase.com/");
};

function EmployeeWallet() {
  const [DATA, setDATA] = useState();
  const [sigmaValue, setSigmaValue] = useState();
  const usdValue = 0.005;

  const loadData = async () => {
    const response1 = await employeeDetailsApi.getDetails();
    const response2 = await employeeApi.getHist();
    setSigmaValue(response1.data[0]["walletBalance"]);
    setDATA(response2.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const Item = ({ audioName, reward }) => (
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
          <MaterialCommunityIcons
            name="sigma-lower"
            size={24}
            color={Colors.black}
          />
          <Text style={styles.title}>{audioName}</Text>
        </View>
        <Text style={styles.title}>{reward + " SIG"}</Text>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
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
      flex: 1,
      backgroundColor: Colors.secondary,
    },
    cryptoContainer: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: Colors.primary,
      height: "60%",
      alignItems: "center",
    },
    token: {
      height: 150,
      width: 150,
    },
    heading: {
      fontSize: 30,
      fontWeight: "bold",
    },
    symbolContainer: {
      borderRadius: 75,
      backgroundColor: Colors.ternary,
      justifyContent: "center",
      alignItems: "center",
      margin: 20,
    },
    text: {
      fontSize: 18,
      color: Colors.white,
      fontWeight: "500",
    },
    valueContainer: {
      flexDirection: "row",
    },
    buttonContainer: {
      backgroundColor: Colors.white,
      width: "20%",
      padding: 10,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonValue: {
      fontSize: 16,
    },
    histContainer: {
      flexDirection: "row",
    },
    histReceived: {
      backgroundColor: Colors.ternary,
      color: Colors.white,
      width: "40%",
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    histValue: {
      fontSize: 20,
    },
    transValue: {
      margin: 10,
      fontSize: 16,
    },
  });

  let key = 1;

  return (
    <View style={styles.container}>
      <View style={styles.cryptoContainer}>
        <LogOut />
        <Text style={styles.heading}>Available Balance</Text>
        <View style={styles.symbolContainer}>
          <Image
            source={require("../Assets/sigma.png")}
            style={styles.token}
          ></Image>
        </View>
        <View style={styles.valueContainer}>
          <View style={{ marginRight: 10, alignItems: "flex-end" }}>
            <Text style={styles.text}>{sigmaValue}</Text>
            <Text style={styles.text}>${usdValue}</Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>SIGMA</Text>
            <Text style={styles.text}>USD</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", margin: 15 }}>
          <TouchableOpacity
            style={[styles.buttonContainer, { marginLeft: 10 }]}
            onPress={() => handleBrowser()}
          >
            <Text style={styles.buttonValue}>Sell</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ bottom: 25, alignItems: "center" }}>
        <View style={[styles.histContainer]}>
          <View style={[styles.histReceived]}>
            <Text
              style={[
                styles.histValue,
                {
                  color: Colors.white,
                },
              ]}
            >
              Received
            </Text>
          </View>
        </View>
      </View>
      <Text style={styles.transValue}>Transaction History</Text>
      <FlatList
        data={DATA}
        keyExtractor={() => key++}
        renderItem={(item) => (
          <Item
            audioName={item["item"]["audioName"]}
            reward={item["item"]["value"]}
          ></Item>
        )}
      />
    </View>
  );
}

export default EmployeeWallet;
