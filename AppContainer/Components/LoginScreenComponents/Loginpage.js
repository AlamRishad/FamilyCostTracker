import React, { useState, useEffect, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Keyboard,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import LogoImage from "../../../assets/splash.png";
import { login } from "../../API/login";
const Loginpage = () => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const scrollViewRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordX, setPasswordX] = useState(0);
  const [passwordY, setPasswordY] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();
  const handleForgotPress = async () => {
    navigation.navigate("ForgotPasswordScreen");
  };
  const handleRegister = async () => {
    navigation.navigate("RegisterScreen");
  };

  const handleLoginPress = async () => {
    navigation.navigate("MainApp", { userId: email });
    // const result = await login(email, password);
    // if (result.success) {
    //   console.log("Response Body:", result.body);
    //   const userId = result.body.userId;
    //   console.log(userId + "login page");
    //   navigation.navigate("MainApp", { userId: userId });
    // } else {
    //   setErrorMessage(result.message);
    // }
  };

  const passwordInputRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        if (passwordInputRef.current) {
          passwordInputRef.current.measure(
            (x, y, width, height, pageX, pageY) => {
              const bottomOfField = pageY + height;
              const topOfKeyboard = e.endCoordinates.screenY;
              const gap = bottomOfField - topOfKeyboard + 20; // Add some extra space (20 pixels) above the keyboard

              if (gap > 0) {
                scrollViewRef.current.scrollTo({
                  x: 0,
                  y: gap,
                  animated: true,
                });
              }
            }
          );
        }
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        scrollViewRef.current.scrollTo({
          x: 0,
          y: 0,
          animated: true,
        });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { minHeight: windowHeight * (keyboardStatus ? 1.3 : 1) },
        ]}
        ref={scrollViewRef}
      >
        <View style={styles.icons}>
          {/* Uncomment if you are using the Image component */}
          <Image
            source={LogoImage}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            setPasswordX(layout.x);
            setPasswordY(layout.y);
          }}
          style={styles.input}
          placeholder="Enter your password "
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          onFocus={() => {
            scrollViewRef.current.scrollTo({
              x: passwordX,
              y: passwordY,
              animated: true,
            });
          }}
          // secureTextEntry={true}
        />
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity onPress={handleLoginPress}>
          <View style={styles.loginBtn}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPress}>
          <View style={styles.forgotButton}>
            <Text style={styles.buttonText2}>Forgot Password?</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}>
          <View style={styles.forgotPassBtn}>
            <Text style={styles.forgotButtonText}>Register</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    // minHeight: windowHeight,
    alignItems: "center",
    paddingTop: windowHeight * 0.1,
    backgroundColor: "white",
  },
  icons: {
    marginBottom: windowHeight * 0.038,
  },
  imageStyle: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.25,
    marginLeft: windowWidth * 0.01,
  },
  logo: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: windowHeight * 0.025,
    //fontFamily: "HindSiliguri-Regular",
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    marginTop: -15,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    height: windowHeight * 0.075,
    // padding: windowWidth * 0.01,
    paddingLeft: 15,
    width: windowWidth * 0.85,
    backgroundColor: "#EFF3FB",
    borderColor: "#205578",
    borderRadius: 21,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: windowHeight * 0.02,
    // fontVariant: ["tabular-nums"],
  },
  loginBtn: {
    marginTop: windowHeight * 0.02,
    width: windowWidth * 0.85,
    backgroundColor: "#205578",
    padding: windowWidth * 0.045,
    borderRadius: 21,
    alignItems: "center",
  },
  forgotPassBtn: {
    marginTop: windowHeight * 0.02,
    width: windowWidth * 0.85,
    backgroundColor: "white",
    padding: windowWidth * 0.03,
    borderRadius: 21,
    alignItems: "center",
    borderColor: "#205578",
    borderWidth: 1,
  },
  forgotButton: {
    paddingLeft: "55%",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: windowHeight * 0.02,
    color: "#fff",
    textAlign: "right",
  },
  buttonText2: {
    fontWeight: "600",
    fontSize: windowHeight * 0.015,
    color: "#205578",
  },
  forgotButtonText: {
    // fontWeight: "bold",
    // fontWeight: 600,
    fontSize: windowHeight * 0.02,
    color: "#205578",
  },
});

export default Loginpage;
