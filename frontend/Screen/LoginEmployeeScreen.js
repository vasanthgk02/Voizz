import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";

import Colors from "../Config/Colors";
import employeeApi from "../Api/employeeApi";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

function LoginEmployee({ navigation }) {
  const empAuth = async (data) => {
    const response = await employeeApi.getEmployee(data);
    const res = response.data;
    if (res === "success") navigation.navigate("TabEmployee");
    else
      Alert.alert("Voizz says", "Invalid username and/or password", [
        {
          text: "Try Again",
        },
      ]);
  };

  return (
    <>
      <View style={{ backgroundColor: Colors.secondary }}>
        <View
          style={{
            height: 150,
            width: "100%",
            borderBottomLeftRadius: 150,
            borderBottomRightRadius: 150,
            backgroundColor: Colors.primary,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>EMPLOYEE</Text>
        </View>
      </View>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { resetForm }) => {
          empAuth({ email: values.email, password: values.password });
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          errors,
          values,
          setFieldTouched,
          touched,
        }) => (
          <>
            <View style={stylesModal.container}>
              <View style={stylesModal.input}>
                <MaterialIcons name="email" size={24} color={Colors.black} />
                <TextInput
                  placeholder="Email"
                  onBlur={() => setFieldTouched("email")}
                  placeholderTextColor={Colors.black}
                  onChangeText={handleChange("email")}
                  value={values.email}
                  style={{
                    marginLeft: 10,
                    fontSize: 18,
                    width: "100%",
                    height: "100%",
                  }}
                ></TextInput>
              </View>
              {touched.email ? (
                <Text style={{ color: Colors.ternary, fontWeight: "bold" }}>
                  {errors.email}
                </Text>
              ) : (
                <Text> {""}</Text>
              )}
              <View style={stylesModal.input}>
                <FontAwesome
                  name="user-secret"
                  size={24}
                  color={Colors.black}
                />
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={Colors.black}
                  secureTextEntry={true}
                  onChangeText={handleChange("password")}
                  value={values.password}
                  caretHidden={true}
                  style={{
                    marginLeft: 10,
                    fontSize: 18,
                    width: "100%",
                    height: "100%",
                  }}
                ></TextInput>
              </View>
              {touched.password ? (
                <Text style={{ color: Colors.ternary, fontWeight: "bold" }}>
                  {errors.password}
                </Text>
              ) : (
                <Text>{""} </Text>
              )}
              <TouchableOpacity
                style={stylesModal.buttonContainer}
                onPress={() => {
                  handleSubmit();
                  setFieldTouched("");
                }}
              >
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 18,
                    textAlign: "center",
                  }}
                >
                  Login
                </Text>
                <MaterialCommunityIcons
                  name="login"
                  size={24}
                  color={Colors.black}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </>
  );
}

const stylesModal = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    padding: 20,
    alignItems: "center",
  },
  input: {
    flexDirection: "row",
    fontSize: 16,
    borderRadius: 15,
    height: 60,
    alignItems: "center",
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: Colors.secondary,
    width: "90%",
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  buttonContainer: {
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: Colors.primary,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
    width: "40%",
  },
});

export default LoginEmployee;
