import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginEmployee from "../Screen/LoginEmployeeScreen";
import LoginOrganization from "../Screen/LoginOrganizationScreen";
import TabOrganizationNavigator from "./TabOrganizationNavigator";
import TabEmployeeNavigator from "./TabEmployeeNavigator";
import WelcomeScreen from "../Screen/WelcomeScreen";
import LoadingScreen from "../Screen/LoadingScreen";

const Stack = createStackNavigator();
const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginEmployee" component={LoginEmployee} />
      <Stack.Screen name="LoginOrganization" component={LoginOrganization} />
      <Stack.Screen
        name="TabOrganization"
        component={TabOrganizationNavigator}
        options={{ presentation: "transparentModal" }}
      />
      <Stack.Screen
        name="TabEmployee"
        component={TabEmployeeNavigator}
        options={{ presentation: "transparentModal" }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
