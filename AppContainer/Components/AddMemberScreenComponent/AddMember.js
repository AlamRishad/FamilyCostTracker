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

const Dropdown = ({ options, onSelect, route }) => {
  const userId = route;
  console.log(route + "dropdown" + userId);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

    // Validation for fullName
    if (!fullName || fullName.trim() === "") {
      setErrorMessage("Please enter the full name.");
      return;
    }

    // Validation for selectedOption
    if (!selectedOption) {
      setErrorMessage("Please select a relationship option.");
      return;
    }
    console.log("Submitting form...");

    createFamilyMember(fullName, selectedOption, userId)
      .then((responseText) => {
        console.log("Family member created:", responseText);
        navigation.goBack();
      })
      .catch((error) => {
        console.error("Failed to create family member:", error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add your family member's details</Text>
      <TextInput
        placeholder="Full name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />

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
      {errorMessage !== "" && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
      <TouchableOpacity style={styles.loginBtn} onPress={addFamilyMember}>
        <Text style={styles.buttonText}>Add Member</Text>
      </TouchableOpacity>
    </ScrollView>
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
});

export default FamilyMemberForm;
