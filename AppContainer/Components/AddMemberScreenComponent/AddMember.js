import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createFamilyMember } from "../../API/CreateMember";

import { CheckBox } from "react-native-elements";
const Dropdown = ({ options, onSelect, route }) => {
  const userId = route;
  console.log(route + "dropdown" + userId);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userType, setUserType] = useState("primary");

  const [password, setPassword] = useState("");

  const toggleDropdown = () => {
    Animated.timing(animatedHeight, {
      toValue: isOpen ? 0 : options.length * 5,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setIsOpen(!isOpen);
  };

  const onOptionPress = (option) => {
    setSelectedOption(option);
    onSelect(option);
    toggleDropdown();
  };

  const navigation = useNavigation();

  const addFamilyMember = () => {
    setErrorMessage("");

    if (!fullName || fullName.trim() === "") {
      setErrorMessage("Please enter the full name.");
      return;
    }

    if (!selectedOption) {
      setErrorMessage("Please select a relationship option.");
      return;
    }
    if (!password && userType === "secondary") {
      setErrorMessage("Please Enter a password.");
      return;
    }
    console.log("Submitting form...");

    createFamilyMember(fullName, selectedOption, userId, userType, password)
      .then((responseText) => {
        console.log("Family member created:", responseText);
        navigation.goBack();
      })
      .catch((error) => {
        if (error.message.includes("Network request failed")) {
          setErrorMessage(
            "Unable to connect. Please check your internet connection."
          );
        } else if (
          error.message ===
          "Error: A family member with the same name already exists for this user."
        ) {
          setErrorMessage("This family member already exists.");
        } else {
          // console.error("Failed to create family member:", error);
          if (
            error == "SyntaxError: JSON Parse error: Unexpected character: F"
          ) {
            // console.log("Family member created:", responseText);
            navigation.goBack();
          }
          setErrorMessage("An error occurred while adding the family member.");
        }
      });
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Add your family member's details</Text>
        <TextInput
          placeholder="Full name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
        <>
          {userType === "secondary" ? (
            <TextInput
              style={styles.input}
              placeholder="Enter your password "
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
              // secureTextEntry={true}
            />
          ) : null}
        </>
        <TouchableOpacity style={styles.input} onPress={toggleDropdown}>
          <Text style={styles.headerText}>
            {selectedOption || "Select a relationship..."}
          </Text>
        </TouchableOpacity>

        {isOpen && (
          <Animated.View style={[styles.dropdown, { height: animatedHeight }]}>
            <ScrollView nestedScrollEnabled={true}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => onOptionPress(option)}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        )}

        <View style={styles.maincheckboxContainer}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Primary user"
              checked={userType === "primary"}
              onPress={() => {
                setUserType("primary");
                setErrorMessage(null);
              }}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              title="Secondary user"
              checked={userType === "secondary"}
              onPress={() => {
                setUserType("secondary");
                setErrorMessage(null);
              }}
              containerStyle={styles.checkbox}
              textStyle={styles.label}
            />
          </View>
        </View>
        {errorMessage !== "" && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
        <TouchableOpacity style={styles.loginBtn} onPress={addFamilyMember}>
          <Text style={styles.buttonText}>Add Member</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const FamilyMemberForm = ({ route }) => {
  const [relationship, setRelationship] = useState("");
  console.log(route);
  return (
    <View style={styles.formContainer}>
      <Dropdown
        options={[
          "Mother",
          "Father",
          "Brother",
          "Sister",
          "Wife",
          "Husband",
          "Child",
          "Grandparent",
          "Grandchild",
          "Aunt",
          "Uncle",
          "Niece",
          "Nephew",
          "Cousin",
          "Stepmother",
          "Stepfather",
          "Stepchild",
          "Stepsibling",
          "Mother-in-law",
          "Father-in-law",
          "Daughter-in-law",
          "Son-in-law",
          "Sister-in-law",
          "Brother-in-law",
          "Partner",
          "Friend",
          "Guardian",
          "Ward",
          "Other",
        ]}
        onSelect={(option) => setRelationship(option)}
        route={route}
      />
    </View>
  );
};
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
  loginBtn: {
    marginTop: windowHeight * 0.02,
    width: windowWidth * 0.9,
    backgroundColor: "#205578",
    padding: windowWidth * 0.045,
    borderRadius: 21,
    alignItems: "center",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
  },
  buttonText: {
    fontWeight: "600",
    fontSize: windowHeight * 0.02,
    color: "#fff",
    textAlign: "right",
  },
  formContainer: {
    height: windowHeight * 0.9,
    backgroundColor: "white",
    padding: 20,
  },
  container: {
    position: "relative",
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 15,
    borderColor: "#ddd",
    // borderRadius: 5,
    backgroundColor: "white",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
  },
  dropdown: {
    // position: "absolute",
    // top: 10,
    // left: 0,
    // right: 0,
    backgroundColor: "white",
    zIndex: 1000,
  },
  option: {
    padding: 10,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
  },
  maincheckboxContainer: {
    flexDirection: "row",
    width: windowWidth * 0.9,
  },
  checkboxContainer: {
    width: windowWidth * 0.45,
    paddingBottom: 10,
    padding: 2,
  },
  checkbox: {
    // borderWidth: 1,
    // borderColor: "#205578",
    // backgroundColor: "#EFF3FB",
    borderRadius: 10,
    padding: 5,
    paddingTop: 10,

    paddingBottom: 10,
  },
});

export default FamilyMemberForm;
