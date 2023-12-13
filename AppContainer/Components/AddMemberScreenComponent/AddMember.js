import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ScrollView,
  TextInput,
  Switch,
  Button,
} from "react-native";

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [relationship, setRelationship] = useState("Select a relationship...");
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [diseaseHistory, setDiseaseHistory] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const toggleDropdown = () => {
    if (isOpen) {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animatedHeight, {
        toValue: options.length * 80,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    setIsOpen(!isOpen);
  };

  const onOptionPress = (option) => {
    setSelectedOption(option);
    onSelect(option);
    toggleDropdown();
  };
  const addFamilyMember = () => {
    // Implement your logic to handle the submission of the form
    console.log("Submitting form...");
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add your family member's details</Text>

      <TouchableOpacity style={styles.input} onPress={toggleDropdown}>
        <Text style={styles.headerText}>
          {selectedOption || "Select a relationship..."}
        </Text>
      </TouchableOpacity>
      <Animated.View style={[styles.dropdown, { height: animatedHeight }]}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={() => onOptionPress(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
      <TextInput
        placeholder="Full name"
        value={fullName}
        onChangeText={setFullName}
        style={styles.input}
      />
      <TextInput
        placeholder="Birth date"
        value={birthDate}
        onChangeText={setBirthDate}
        style={styles.input}
      />

      <TextInput
        placeholder="Height (ft)"
        value={height}
        onChangeText={setHeight}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Weight (Lb)"
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
        keyboardType="numeric"
      />
      <Button title="Add new family member" onPress={addFamilyMember} />
    </ScrollView>
  );
};

const FamilyMemberForm = () => {
  const [relationship, setRelationship] = useState("");

  const handleSelect = (option) => {
    setRelationship(option);
  };

  return (
    <View style={styles.formContainer}>
      {/* Other form fields */}
      <Dropdown
        options={["Mother", "Father", "Sibling"]}
        onSelect={handleSelect}
      />
      {/* Other form fields */}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
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
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
  },
  dropdown: {
    position: "absolute",
    top: 120,
    left: 0,
    right: 0,
    backgroundColor: "white",
    // borderWidth: 1,
    // borderColor: "#ddd",
    zIndex: 1000,
  },
  option: {
    padding: 10,
    // borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
  },
});

export default FamilyMemberForm;
