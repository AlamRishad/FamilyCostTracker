import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";

import { Picker } from "@react-native-picker/picker";
import { fetchAllBudgetDetails } from "../../API/budgetApi";

const { width, height } = Dimensions.get("window");

const ShowAllBudgetDetails = ({ route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Add this state for controlling modal visibility
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [category, setCategory] = useState();
  // ... groupByFamilyMember and useEffect logic

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalVisible(true);
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

  const { userId } = route.params;
  console.log(userId);
  const [budgetDetails, setBudgetDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const groupByFamilyMember = (budgetDetails) => {
    const grouped = {};

    budgetDetails.forEach((detail) => {
      // Create an array for each family member in the grouped object
      if (!grouped[detail.familyMemberID]) {
        grouped[detail.familyMemberID] = {
          name: detail.familyMemberName,
          relationship: detail.relationship,
          categories: [],
        };
      }
      // Push category details into the family member's categories array
      grouped[detail.familyMemberID].categories.push({
        categoryName: detail.categoryName,
        amount: detail.amount,
        startDate: detail.startDate,
        endDate: detail.endDate,
        periodicity: detail.periodicity,
      });
    });

    return Object.values(grouped);
  };

  useEffect(() => {
    const getBudgetDetails = async () => {
      try {
        const response = await fetchAllBudgetDetails(userId);
        // Transform the flat data into grouped by family member
        const groupedBudgetDetails = groupByFamilyMember(response);
        setBudgetDetails(groupedBudgetDetails);
        // console.log(groupedBudgetDetails);
      } catch (error) {
        console.error("An error occurred while fetching budget details", error);
      } finally {
        setIsLoading(false);
      }
    };

    getBudgetDetails();
  }, [userId]);

  const renderItem = ({ item }) => (
    <View style={styles.familyMemberSection}>
      <Text style={styles.familyMemberHeader}>
        {item.name} - {item.relationship}
      </Text>
      <View style={styles.categoryItemTitle}>
        <Text style={styles.detailTextTitle}>Category Name</Text>
        <Text style={styles.detailTextTitle}>Amount</Text>
        <Text style={styles.detailTextTitle}>StartDate</Text>
        <Text style={styles.detailTextTitle}>EndDate</Text>
        <Text style={styles.detailTextTitle}>Periodicity</Text>
      </View>

      {item.categories.map((category, index) => (
        <TouchableOpacity key={index} onPress={() => openModal(category)}>
          <View key={index} style={styles.categoryItem}>
            <Text style={styles.detailText}>{category.categoryName}</Text>
            <Text style={styles.detailText}>{category.amount}</Text>
            <Text style={styles.detailText}>
              {category.startDate
                ? category.startDate.split("T")[0]
                : "StartDate"}
            </Text>
            <Text style={styles.detailText}>
              {category.endDate ? category.endDate.split("T")[0] : "EndDate"}
            </Text>
            <Text style={styles.detailText}>{category.periodicity}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={budgetDetails}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
      >
        <View style={styles.modalView}>
          {/* Render selected category details here */}
          {selectedCategory && (
            <>
              <Text style={styles.modalText}>
                Category: {selectedCategory.categoryName}
              </Text>
              <Text style={styles.modalText}>
                Amount: {selectedCategory.amount}
              </Text>
              {/* ... other details ... */}
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={{}}
                  onValueChange={(itemValue, itemIndex) => setCategory({})}
                  style={styles.picker}
                >
                  <Picker.Item
                    label="Periodicity"
                    value=""
                    style={styles.text2}
                  />
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
                <Text style={styles.datePickerText}>Date: {"none"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                title="Pick a Date"
                onPress={toggleDatePicker}
                style={[styles.pickerContainer2, styles.addMemberButton]}
              >
                {isDatePickerVisible && renderDatePicker()}
                <Text style={styles.datePickerText}>Date: {"none"}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.78,
    backgroundColor: "white",
  },
  familyMemberSection: {
    marginBottom: 20, // Adds spacing between each family member section
  },
  familyMemberHeader: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#EFF3FB",
    padding: 10,
  },
  categoryItemTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
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
  detailText: {
    fontSize: 14,
    textAlign: "center",
    // Add width here for fixed column width
    width: width * 0.2, // For example, 20% of the screen width
  },
  detailTextTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    // Add width here for fixed column width
    width: width * 0.2, // For example, 20% of the screen width
  },
  modalView: {
    justifyContent: "center",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
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
  // ... other styles ...
});

export default ShowAllBudgetDetails;
