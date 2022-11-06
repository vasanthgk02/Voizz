import { Alert, Text, TouchableOpacity, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../Config/Colors";

const LogOut = () => {
  const navigation = useNavigation();
  const showAlert = () => {
    Alert.alert("Voizz says ", "Are you sure to logout ?", [
      {
        text: "Yes",
        onPress: () => navigation.navigate("WelcomeScreen"),
      },
      {
        text: "No",
        onPress: () => {},
      },
    ]);
  };
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 10,
        height: 50,
        backgroundColor: Colors.ternary,
        width: "100%",
      }}
    >
      <TouchableOpacity style={{ flexDirection: "row" }} onPress={showAlert}>
        <Entypo name="log-out" size={24} color="black" />
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogOut;
