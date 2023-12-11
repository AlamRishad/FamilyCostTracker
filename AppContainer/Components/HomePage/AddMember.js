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

import LogoImage from "../../../assets/splash.png";
import ProfileIcon from "../../../assets/TopBar/profileIcon2.png";
const { width, height } = Dimensions.get("window");
const imageSize = width * 0.1;

function AddMemeber(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity  style={styles.button}>
    <Text style={styles.text}>New</Text>
  </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height:height * 0.1,
    width:"95%",
    marginLeft:"2.5%",
    backgroundColor:"white",
    
   
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20, // Adjust border radius to match your design
    backgroundColor: '#205578', // This is the color you provided
    shadowColor: 'rgba(0, 0, 0, 0.1)', // Simple shadow
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1,
    elevation: 3, // Elevation for Android
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14 // Adjust font size to match your design
  }
 
 
});

export default AddMemeber;