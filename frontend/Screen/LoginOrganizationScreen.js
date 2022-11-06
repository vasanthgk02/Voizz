import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";

import Colors from "../Config/Colors";
import organizationApi from "../Api/organizationApi";

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label("Username"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginOrganization({ navigation }) {
  const orgAuth = async (data) => {
    const response = await organizationApi.getOrganization(data);
    const res = response.data;
    if (res === "success") navigation.navigate("TabOrganization");
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
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>ORGANIZATION</Text>
        </View>
      </View>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values, { resetForm }) => {
          orgAuth({ username: values.username, password: values.password });
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        {({
          setFieldTouched,
          touched,
          handleChange,
          handleSubmit,
          errors,
          values,
        }) => (
          <>
            <View style={styles.container}>
              <View style={styles.input}>
                <Ionicons name="person" size={24} color={Colors.black} />
                <TextInput
                  onBlur={() => setFieldTouched("username")}
                  placeholder="Username"
                  placeholderTextColor={Colors.black}
                  onChangeText={handleChange("username")}
                  value={values.username}
                  style={{
                    marginLeft: 10,
                    fontSize: 18,
                    width: "100%",
                    height: "100%",
                  }}
                ></TextInput>
              </View>
              {touched.username ? (
                <Text style={{ color: Colors.ternary, fontWeight: "bold" }}>
                  {errors.username}
                </Text>
              ) : (
                <Text>{""}</Text>
              )}
              <View style={styles.input}>
                <FontAwesome
                  name="user-secret"
                  size={24}
                  color={Colors.black}
                />
                <TextInput
                  onBlur={() => setFieldTouched("password")}
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
                <Text>{""}</Text>
              )}
              <TouchableOpacity
                style={styles.buttonContainer}
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

const styles = StyleSheet.create({
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
  },
});

export default LoginOrganization;
