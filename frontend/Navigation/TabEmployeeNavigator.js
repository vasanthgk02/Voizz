import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../Config/Colors";
import Profile from "../Screen/ProfileScreen";
import EmployeeWallet from "../Screen/WalletScreenEmployee";

function TabEmployeeNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 60 },
        tabBarActiveBackgroundColor: Colors.primary,
        tabBarInactiveBackgroundColor: Colors.white,
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.primary,
      }}
    >
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="EmployeeWallet"
        component={EmployeeWallet}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="wallet" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default TabEmployeeNavigator;
