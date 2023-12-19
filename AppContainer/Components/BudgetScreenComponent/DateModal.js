// DateModal.js
import React, { useState } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { styles } from "./StylesShowAllBudgetDetails";
import { Picker } from "@react-native-picker/picker";

const { width, height } = Dimensions.get("window");

const DateModal = ({ isVisible, onDateChange, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    onDateChange(newDate);
  };

  const closeAndResetPicker = () => {
    setSelectedDate(new Date());
    onClose();
  };

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

  const updateDate = (type, value) => {
    const newDate = new Date(selectedDate);
    if (type === "year") {
      newDate.setFullYear(value);
    } else if (type === "month") {
      newDate.setMonth(value - 1);
    } else if (type === "day") {
      newDate.setDate(value);
    }
    handleDateChange(newDate);
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.datePickerModal}>
        <View style={styles.datePickerContainer}>
          <View style={styles.pickerGroup}>
            <Picker
              selectedValue={selectedDate.getFullYear()}
              style={styles.datePicker}
              onValueChange={(itemValue) => updateDate("year", itemValue)}
            >
              {years.map((year) => (
                <Picker.Item key={year} label={year.toString()} value={year} />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedDate.getMonth() + 1}
              style={styles.datePicker}
              onValueChange={(itemValue) => updateDate("month", itemValue)}
            >
              {months.map((month) => (
                <Picker.Item
                  key={month}
                  label={month.toString().padStart(2, "0")}
                  value={month}
                />
              ))}
            </Picker>
            <Picker
              selectedValue={selectedDate.getDate()}
              style={styles.datePicker}
              onValueChange={(itemValue) => updateDate("day", itemValue)}
            >
              {days.map((day) => (
                <Picker.Item
                  key={day}
                  label={day.toString().padStart(2, "0")}
                  value={day}
                />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            style={styles.addCategory}
            onPress={() => closeAndResetPicker()}
          >
            <Text style={styles.addCategoryText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default DateModal;
