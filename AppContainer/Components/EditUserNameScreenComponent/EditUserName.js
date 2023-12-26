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
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import LogoImage from "../../../assets/splash.png";
import { updateUsername } from "../../API/login";
const EditUserName = () => {
  const route = useRoute();
  const userId = route.params?.userId;
  console.log(userId);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const scrollViewRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [passwordX, setPasswordX] = useState(0);
  const [passwordY, setPasswordY] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const navigation = useNavigation();
  const handleForgotPasswordPress = async () => {
    setErrorMessage("");

    const result = await updateUsername(userId, userName, password);
    if (!userName.trim()) {
      setErrorMessage("Username is required.");
      return;
    }

    if (!password) {
      setErrorMessage("Password is required.");
      return;
    }
    if (result.success) {
      //   setErrorMessage("UserName changed successfully");
      setTimeout(() => navigation.navigate("Profile", { userId: userId }), 100);
    } else {
      setErrorMessage(result.message);
    }
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
              const gap = bottomOfField - topOfKeyboard + 20;

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
          <Image
            source={LogoImage}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Change Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your new username"
          onChangeText={setUserName}
          value={userName}
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

        {errorMessage !== "" && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
        <TouchableOpacity onPress={handleForgotPasswordPress}>
          <View style={styles.loginBtn}>
            <Text style={styles.buttonText}>Confirm</Text>
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
    paddingTop: windowHeight * 0.09,
    backgroundColor: "white",
  },
  icons: {
    // marginBottom: windowHeight * 0.038,
  },
  imageStyle: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.1,
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
  errorMessage: {
    color: "red",
    textAlign: "center",
    // marginVertical: 10,
  },
});

export default EditUserName;
