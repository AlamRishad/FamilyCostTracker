import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  StatusBar,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { addCategory } from "../../API/CategoryApi";

const { width, height } = Dimensions.get("window");

const AddCategory = ({ route }) => {
  const { familyMemberID, userId } = route.params;
  const initialCategoryState = {
    Name: "",
    UserID: route.params.userId.toString(),
    FamilyMemberID: route.params.familyMemberID
      ? route.params.familyMemberID.toString()
      : "",
    whichDate: "",
    Periodicity: "",
  };
  const [category, setCategory] = useState(initialCategoryState);

  const navigation = useNavigation();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await addCategory({
        name: category.Name,
        userID: category.UserID,
        familyMemberID: category.FamilyMemberID,
        whichDate: category.whichDate,
        periodicity: category.Periodicity,
      });

      if (result) {
        console.log("Category submitted", result);
      } else {
        console.log("Category added, but no details returned from the server.");
      }

      setCategory(initialCategoryState);
      setError("");
      // If you are using React Navigation, ensure `navigation` is defined and passed to this component
      //   navigation.goBack();
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.toString());
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (name, value) => {
    setCategory({ ...category, [name]: value });
  };

  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const setDate = (newDate) => {
    setSelectedDate(newDate);
    toggleDatePicker();
    const formattedDate = `${newDate.getFullYear()}-${(
      "0" +
      (newDate.getMonth() + 1)
    ).slice(-2)}-${("0" + newDate.getDate()).slice(-2)}`;
    setCategory({ ...category, whichDate: formattedDate });
  };

  const renderDatePicker = () => {
    const years = Array.from({ length: 2050 - 2023 + 1 }, (_, i) => 2023 + i);

    const months = [...Array(12)].map((_, i) => i + 1);
    const days = [
      ...Array(
        new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth() + 1,
          0
        ).getDate()
      ),
    ].map((_, i) => i + 1);

    return (
      <Modal
        visible={isDatePickerVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.datePickerModal}>
          <View style={styles.datePickerContainer}>
            <View style={styles.pickerGroup}>
              <Picker
                selectedValue={selectedDate.getFullYear()}
                style={styles.datePicker}
                onValueChange={(itemValue) => {
                  const newDate = new Date(selectedDate);
                  newDate.setFullYear(itemValue);
                  setSelectedDate(newDate);
                }}
              >
                {years.map((year, index) => (
                  <Picker.Item
                    key={index}
                    label={year.toString()}
                    value={year}
                  />
                ))}
              </Picker>
              <Picker
                selectedValue={selectedDate.getMonth() + 1}
                style={styles.datePicker}
                onValueChange={(itemValue) => {
                  const newDate = new Date(selectedDate);
                  newDate.setMonth(itemValue - 1);
                  setSelectedDate(newDate);
                }}
              >
                {months.map((month, index) => (
                  <Picker.Item
                    key={index}
                    label={month.toString().padStart(2, "0")}
                    value={month}
                  />
                ))}
              </Picker>
              <Picker
                selectedValue={selectedDate.getDate()}
                style={styles.datePicker}
                onValueChange={(itemValue) => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(itemValue);
                  setSelectedDate(newDate);
                }}
              >
                {days.map((day, index) => (
                  <Picker.Item
                    key={index}
                    label={day.toString().padStart(2, "0")}
                    value={day}
                  />
                ))}
              </Picker>
            </View>

            <TouchableOpacity
              style={[styles.addCategory, styles.addCategoryText]}
              title="Done"
              onPress={() => setDate(selectedDate)}
            >
              <Text style={styles.addCategoryText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        {/* <Text style={styles.text}>Category Name: </Text> */}
        <TextInput
          style={styles.input}
          placeholder="Category Name"
          value={category.Name}
          onChangeText={(text) => handleInputChange("Name", text)}
        />

        {/* Dropdown for Periodicity */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category.Periodicity}
            onValueChange={(itemValue, itemIndex) =>
              setCategory({ ...category, Periodicity: itemValue })
            }
            style={styles.picker}
          >
            <Picker.Item label="Periodicity" value="" style={styles.text2} />
            <Picker.Item label="Daily" value="Daily" />
            <Picker.Item label="Weekly" value="Weekly" />
            <Picker.Item label="Monthly" value="Monthly" />
          </Picker>
        </View>
        <TouchableOpacity
          title="Pick a Date"
          onPress={toggleDatePicker}
          style={[styles.pickerContainer2, styles.addMemberButton]}
        >
          {isDatePickerVisible && renderDatePicker()}
          <Text style={styles.datePickerText}>
            Date: {category.whichDate || "none"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.addCategory, styles.addCategoryText]}
          title="Add Category"
          onPress={onSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.addCategoryText}>Add Category</Text>
        </TouchableOpacity>
      </View>
      {/* {error && <Text style={styles.error}>{error}</Text>} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    margin: "2.5%",
    borderRadius: 20,
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 16,
  },

  input: {
    borderWidth: 1,
    height: height * 0.075,
    // padding: windowWidth * 0.01,
    paddingLeft: 15,
    width: width * 0.85,
    backgroundColor: "#EFF3FB",
    borderColor: "#205578",
    borderRadius: 21,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: height * 0.02,
  },
  row: {
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  addCategory: {
    alignItems: "center",
    marginTop: height * 0.02,
    width: width * 0.85,
    backgroundColor: "#205578",
    padding: width * 0.045,
    borderRadius: 21,
    alignItems: "center",
  },
  addCategoryText: {
    fontWeight: "600",
    fontSize: height * 0.02,
    color: "#fff",
    textAlign: "right",
  },
  pickerContainer: {
    borderWidth: 1,
    height: height * 0.075,
    // padding: windowWidth * 0.01,
    textAlign: "center",
    width: width * 0.4,
    backgroundColor: "#EFF3FB",
    borderColor: "#205578",
    borderRadius: 21,
    marginBottom: 20,
    fontSize: height * 0.02,
  },
  pickerContainer2: {
    borderWidth: 1,
    height: height * 0.075,
    // padding: windowWidth * 0.01,
    marginLeft: width * 0.05,
    textAlign: "center",
    width: width * 0.4,
    backgroundColor: "#EFF3FB",
    borderColor: "#205578",
    borderRadius: 21,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: height * 0.02,
  },
  picker: {
    padding: 1,
  },
  datePickerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  datePickerContainer: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  pickerGroup: {
    flexDirection: "row",
    justifyContent: "center",
  },
  datePicker: {
    width: 120,
  },
  datePickerText: {
    padding: 10,
    marginVertical: 8,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginVertical: 8,
  },
});

export default AddCategory;
