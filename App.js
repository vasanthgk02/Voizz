import { StyleSheet, Text, View } from "react-native";
import AuthNavigator from "./frontend/Navigation/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Wallet from "./frontend/Screen/WalletScreen";
import Profile from "./frontend/Screen/ProfileScreen";
import axios from "axios";
import NewEmployee from "./frontend/Screen/NewEmployeeScreen";
import courier_api from "./frontend/Api/courier_api";

export default function App() {
  return (
    <>
      <StatusBar style="light" backgroundColor="black" />
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
      {/* <NewEmployee /> */}
    </>
  );
}
