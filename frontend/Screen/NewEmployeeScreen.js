import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { Formik } from "formik";
import * as Yup from "yup";

import Colors from "../Config/Colors";
import newEmployeeApi from "../Api/newEmployeeApi";
import courier_api from "../Api/courier_api";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  phoneNo: Yup.string().required().min(10).max(10).label("Phone number"),
});

const loadData = async (data) => {
  await newEmployeeApi.putEmployee(data);
  console.log(data);
  Alert.alert("VOIZZ", "Data uploaded successfully");
};

function NewEmployee() {
  let [image, setImage] = useState(false);

  const fetchImage = async () => {
    const imageUrl = await ImagePicker.launchImageLibraryAsync();
    return imageUrl != false ? setImage(imageUrl["uri"]) : "";
  };

  const handleSave = ({ name, email, password, phoneNo }) => {
    console.log(image);
    const newData = {
      _id: Math.floor(Math.random() * 100) + 1,
      name: name,
      phoneNo: phoneNo,
      email: email,
      password: password,
      walletBalance: 0,
      audioHistory: [],
      description: "New User",
      url: image,
    };
    loadData(newData);
    setImage(false);
    courier_api.sendEmail(email, name, password);
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{ name: "", email: "", password: "", phoneNo: "" }}
        onSubmit={(values, { resetForm }) => {
          handleSave({
            name: values.name,
            email: values.email,
            password: values.password,
            phoneNo: values.phoneNo,
          });
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleSubmit,
          setFieldTouched,
          touched,
          errors,
          values,
        }) => (
          <View style={styles.profileContainer}>
            {image != false ? (
              <TouchableOpacity onPress={fetchImage}>
                <Image style={styles.profileImage} source={{ uri: image }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={fetchImage}
                style={styles.profileImage}
              >
                <Fontisto name="camera" size={80} color={Colors.black} />
              </TouchableOpacity>
            )}
            <View style={styles.input}>
              <MaterialIcons name="person" size={24} color={Colors.black} />
              <TextInput
                placeholder="Name"
                placeholderTextColor={Colors.black}
                onChangeText={handleChange("name")}
                onBlur={() => setFieldTouched("name")}
                value={values.name}
                style={{ marginLeft: 10, width: "100%", height: "100%" }}
              ></TextInput>
            </View>
            {touched.name ? (
              <Text style={{ color: "red", fontWeight: "bold" }}>
                {errors.name}
              </Text>
            ) : (
              <Text>{""}</Text>
            )}
            <View style={styles.input}>
              <FontAwesome name="phone" size={24} color={Colors.black} />
              <TextInput
                placeholder="(+91) India"
                placeholderTextColor={Colors.black}
                onChangeText={handleChange("phoneNo")}
                onBlur={() => setFieldTouched("phoneNo")}
                value={values.phoneNo}
                style={{ marginLeft: 10, width: "100%", height: "100%" }}
              ></TextInput>
            </View>
            {touched.phoneNo ? (
              <Text style={{ color: "red", fontWeight: "bold" }}>
                {errors.phoneNo}
              </Text>
            ) : (
              <Text>{""}</Text>
            )}
            <View style={styles.input}>
              <MaterialIcons name="email" size={24} color={Colors.black} />
              <TextInput
                onBlur={() => setFieldTouched("email")}
                placeholder="Email"
                placeholderTextColor={Colors.black}
                onChangeText={handleChange("email")}
                value={values.email}
                style={{ marginLeft: 10, width: "100%", height: "100%" }}
              ></TextInput>
            </View>
            {touched.email ? (
              <Text style={{ color: "red", fontWeight: "bold" }}>
                {errors.email}
              </Text>
            ) : (
              <Text>{""}</Text>
            )}
            <View style={styles.input}>
              <FontAwesome name="user-secret" size={24} color={Colors.black} />
              <TextInput
                placeholder="Password"
                placeholderTextColor={Colors.black}
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                value={values.password}
                onBlur={() => {
                  () => setFieldTouched("password");
                }}
                caretHidden={true}
                style={{ marginLeft: 10, width: "100%", height: "100%" }}
              ></TextInput>
            </View>
            {touched.password ? (
              <Text style={{ color: "red", fontWeight: "bold" }}>
                {errors.password}
              </Text>
            ) : (
              <Text>{""}</Text>
            )}
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                handleSubmit();
              }}
            >
              <Entypo name="upload" size={50} color={Colors.black} />
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 50,
    backgroundColor: Colors.secondary,
    padding: 20,
    flex: 1,
  },
  profileContainer: {
    alignItems: "center",
  },
  profileImage: {
    height: 200,
    width: 200,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  descriptor: {
    alignItems: "center",
    padding: 20,
  },
  input: {
    flexDirection: "row",
    fontSize: 16,
    borderRadius: 15,
    height: 60,
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: Colors.secondary,
    width: "90%",
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
  },
  buttonContainer: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    // padding: 10,
    // marginTop: 20,
    borderRadius: 10,
  },
});

export default NewEmployee;
