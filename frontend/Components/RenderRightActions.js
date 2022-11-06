import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../Config/Colors";

const renderRightActions = (progress, dragX) => {
  const trans = dragX.interpolate({
    inputRange: [0, 50, 100, 101],
    outputRange: [-20, 0, 0, 1],
  });
  return (
    <TouchableOpacity style={styles.leftAction}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.delete,
          width: 100,
          height: 60,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      >
        <AntDesign name="delete" size={24} color={Colors.black} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  leftAction: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default renderRightActions;
