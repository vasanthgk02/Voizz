import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import Constants from "expo-constants";

import ActivityIndicator from "../Components/ActivityIndicator";
import Colors from "../Config/Colors";
import employeeListingsApi from "../Api/employeeListingsApi";
import Item from "../Components/Item";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function EmployeeListing({ navigation }) {
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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadListing = async () => {
    setLoading(true);
    const response = await employeeListingsApi.getEmployeeListings();
    setData(response.data);
    wait(2000).then(() => setLoading(false));
  };

  useEffect(() => {
    loadListing();
  }, []);

  const handleDelete = (id) => {
    setData((data) => {
      data.filter(data.id != id);
    });
  };

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
          <View style={styles.container}>
            <View style={styles.flatList}>
              <FlatList
                data={data}
                keyExtractor={(item) => item["_id"]}
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={loadListing}
                  />
                }
                renderItem={({ item }) => (
                  <Item
                    onPress={() => handleDelete(item["_id"])}
                    id={item["_id"]}
                    imageUrl={item["url"]}
                    title={item["name"]}
                    description={item["description"]}
                    email={item["email"]}
                    phoneNo={item["phoneNo"]}
                  />
                )}
              />
            </View>
          </View>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  controller: {
    top: 20,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  button: {
    width: "100%",
    height: 100,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  heading: {
    color: Colors.white,
    height: 100,
    fontSize: 30,
    fontWeight: "bold",
    backgroundColor: Colors.primary,
    textAlign: "center",
    textAlignVertical: "center",
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
  },
  flatList: {
    flex: 1,
    marginTop: 10,
    marginButtom: 10,
  },
});

export default EmployeeListing;
