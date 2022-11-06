import React from "react";

import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import NewEmployee from "../Screen/NewEmployeeScreen";
import EmployeeListing from "../Screen/EmployeeListingScreen";
import Wallet from "../Screen/WalletScreen";
import Colors from "../Config/Colors";

function TabOrganizationNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 65,
          borderTopWidth: 3,
          borderTopColor: "#d0e4f2",
        },
        tabBarActiveBackgroundColor: Colors.primary,
        tabBarInactiveBackgroundColor: Colors.white,
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.primary,
      }}
    >
      <Tab.Screen
        name="EmployeeListing"
        component={EmployeeListing}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="persons" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NewEmployee"
        component={NewEmployee}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <View
              style={{
                backgroundColor: Colors.white,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("NewEmployee")}
                style={{
                  backgroundColor: Colors.primary,
                  bottom: 30,
                  height: 100,
                  width: 100,
                  borderRadius: 50,
                  borderColor: Colors.primary,
                  borderWidth: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign
                  name="pluscircle"
                  size={60}
                  color={Colors.secondary}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="wallet" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabOrganizationNavigator;
