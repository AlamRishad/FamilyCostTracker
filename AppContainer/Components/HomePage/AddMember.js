import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/AntDesign";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

import LogoImage from "../../../assets/splash.png";
import ProfileIcon from "../../../assets/TopBar/profileIcon2.png";
const { width, height } = Dimensions.get("window");
const imageSize = width * 0.1;

function AddMemeber(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer}>
        <View style={styles.buttonInnerContainer}>
          <Icon name="plus" size={20} color="#fff" style={styles.iconStyle} />
          <Text style={styles.textStyle}>Add Member</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.buttonContainer2]}
      >
        <View style={styles.buttonInnerContainer}>
          <Icon2
            name="human-male"
            size={20}
            color="#fff"
            style={styles.iconStyle}
          />
          <Text style={styles.textStyle} numberOfLines={2} ellipsizeMode="tail">
            Child
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.buttonContainer2]}
      >
        <View style={styles.buttonInnerContainer}>
          <Icon2
            name="human-male"
            size={20}
            color="#fff"
            style={styles.iconStyle}
          />
          <Text style={styles.textStyle} numberOfLines={2} ellipsizeMode="tail">
            Others
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.buttonContainer2]}
      >
        <View style={styles.buttonInnerContainer}>
          <Icon2
            name="human-male"
            size={20}
            color="#fff"
            style={styles.iconStyle}
          />
          <Text style={styles.textStyle} numberOfLines={2} ellipsizeMode="tail">
            Mother
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonContainer, styles.buttonContainer2]}
      >
        <View style={styles.buttonInnerContainer}>
          <Icon2
            name="human-male"
            size={20}
            color="#fff"
            style={styles.iconStyle}
          />
          <Text style={styles.textStyle} numberOfLines={2} ellipsizeMode="tail">
            Father
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "2%",
    paddingTop: "2%",
    paddingLeft: "3.5%",
    paddingBottom: "2%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "row",
    flexWrap: "wrap", // This will allow the buttons to wrap to the next line
    justifyContent: "flex-start", // Aligns buttons to the start of the container

    alignItems: "center",
    width: "95%",
    marginLeft: "2.5%",
    backgroundColor: "white",
  },
  buttonContainer: {
    borderRadius: 15,
    backgroundColor: "#76C7A6",
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    width: width * 0.2,
    height: height * 0.09,
    margin: 3,
  },
  buttonContainer2: {
    backgroundColor: "#205578",
  },
  buttonInnerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    marginBottom: 2, // Adjust based on your design needs
  },
  textStyle: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default AddMemeber;
