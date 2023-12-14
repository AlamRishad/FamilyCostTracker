import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";

import LogoImage from "../../../assets/splash.png";
const { width, height } = Dimensions.get("window");
const imageSize = width * 0.1;

function BackBar(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.5}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: height * 0.1,
    width: "100%",
    backgroundColor: "#205578",
    // borderBottomWidth: 2,
    // borderBottomColor: "#D8D8D8",
    // borderBottomEndRadius: 10,
    // borderBottomStartRadius: 10,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 7,
  },
  imageStyle: {
    width: width * 0.15,
    height: height * 0.075,
    marginLeft: width * 0.01,
  },
  imageStyle2: {
    width: width * 0.1,
    height: height * 0.05,
    marginRight: width * 0.06,
    borderRadius: 21,
  },
  button: {
    height: height * 0.06,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: width * 0.02,
    marginLeft: width * 0.04,
  },
  buttonDesign: {
    resizeMode: "contain",
  },
  button2: {
    flexDirection: "row",
    height: height * 0.06,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: width * 0.03,
  },

  labelText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  labelText2: {
    fontSize: 8,
    color: "white",
    fontWeight: "bold",
  },
});

export default BackBar;
