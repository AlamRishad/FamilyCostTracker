import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./StylesShowAllBudgetDetails";

import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import { Picker } from "@react-native-picker/picker";
import { fetchAllBudgetDetails } from "../../API/budgetApi";
import {
  updateBudgetDetails,
  createBudgetDetail,
} from "../../API/getBudgetDetails";

const ShowAllBudgetDetails = ({ route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Add this state for controlling modal visibility
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [category, setCategory] = useState();
  const [periodicity, setPeriodicity] = useState(""); // Add this to your state definitions

  const [inputAmount, setInputAmount] = useState("");
  // ... groupByFamilyMember and useEffect logic
  const [isStartDatePickerVisible, setStartDatePickerVisibility] =
    useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  useFocusEffect(
    useCallback(() => {
      fetchBudgetDetails();
      return () => {};
    }, [userId])
  );
  const saveCategoryDetails = async () => {
    const budgetData = {
      userID: selectedCategory.userID,
      categoryID: selectedCategory.categoryID,
      amount: inputAmount,
      startDate: selectedDate.toISOString(),
      endDate: selectedEndDate.toISOString(),
      periodicity: periodicity,
      familyMemberID: selectedCategory.familyMemberID,
    };

    try {
      let response;
      if (selectedCategory.budgetID) {
        console.log(
          "Updating budget detail with ID: ",
          selectedCategory.budgetID
        );
        response = await updateBudgetDetails(
          selectedCategory.budgetID,
          budgetData
        );
      } else {
        console.log("Creating new budget detail.");
        response = await createBudgetDetail(budgetData);
      }

      console, log(response + "update");
      setBudgetDetails((prevDetails) =>
        selectedCategory.budgetID
          ? prevDetails.map((detail) =>
              detail.id === response.id ? response : detail
            )
          : [...prevDetails, response]
      );
      console, log(response + "update");
      setIsModalVisible(false);
      console.log("Budget detail saved successfully: ", response);
    } catch (error) {
      console.log("update");
      setIsModalVisible(false);
      if (error.message === "Property 'log' doesn't exist") {
        fetchBudgetDetails();
      } else {
        console.error("Failed to save budget detail: ", error);
      }
    }
  };

  const openModal = (category) => {
    // setSelectedCategory()
    console.log(category);
    setSelectedCategory(category);
    setInputAmount((category.amount || 0).toString());
    setSelectedDate(new Date(category.startDate));
    setSelectedEndDate(new Date(category.endDate));
    setPeriodicity(category.periodicity);
    setIsModalVisible(true);
  };

  const toggleStartDatePicker = () => {
    setStartDatePickerVisibility(!isStartDatePickerVisible);
  };

  const toggleEndDatePicker = () => {
    setEndDatePickerVisibility(!isEndDatePickerVisible);
  };

  const setDate = (newDate) => {
    setSelectedDate(newDate);
    toggleStartDatePicker();
    const formattedDate = `${newDate.getFullYear()}-${(
      "0" +
      (newDate.getMonth() + 1)
    ).slice(-2)}-${("0" + newDate.getDate()).slice(-2)}`;
    setCategory({ ...category, whichDate: formattedDate });
  };
  const setEndDate = (newDate) => {
    setSelectedEndDate(newDate);
    toggleEndDatePicker();
    const formattedDate = `${newDate.getFullYear()}-${(
      "0" +
      (newDate.getMonth() + 1)
    ).slice(-2)}-${("0" + newDate.getDate()).slice(-2)}`;
    setCategory({ ...category, whichDate: formattedDate });
  };

  const renderDatePicker = () => {
    const years = Array.from({ length: 2050 - 2021 + 1 }, (_, i) => 2021 + i);

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
        visible={isStartDatePickerVisible}
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
              style={styles.saveButton2}
              title="Done"
              onPress={() => setDate(selectedDate)}
            >
              <Text style={styles.textStyle}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };
  const renderDatePicker2 = () => {
    const years = Array.from({ length: 2050 - 2021 + 1 }, (_, i) => 2021 + i);
    const months = [...Array(12)].map((_, i) => i + 1);
    const days = [
      ...Array(
        new Date(
          selectedEndDate.getFullYear(),
          selectedEndDate.getMonth() + 1,
          0
        ).getDate()
      ),
    ].map((_, i) => i + 1);

    return (
      <Modal
        visible={isEndDatePickerVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.datePickerModal}>
          <View style={styles.datePickerContainer}>
            <View style={styles.pickerGroup}>
              <Picker
                selectedValue={selectedEndDate.getFullYear()}
                style={styles.datePicker}
                onValueChange={(itemValue) => {
                  const newDate = new Date(selectedEndDate);
                  newDate.setFullYear(itemValue);
                  setSelectedEndDate(newDate);
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
                selectedValue={selectedEndDate.getMonth() + 1}
                style={styles.datePicker}
                onValueChange={(itemValue) => {
                  const newDate = new Date(selectedEndDate);
                  newDate.setMonth(itemValue - 1);
                  setSelectedEndDate(newDate);
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
                selectedValue={selectedEndDate.getDate()}
                style={styles.datePicker}
                onValueChange={(itemValue) => {
                  const newDate = new Date(selectedEndDate);
                  newDate.setDate(itemValue); // Corrected method
                  setSelectedEndDate(newDate);
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
              style={styles.saveButton2}
              title="Done"
              onPress={() => setEndDate(selectedEndDate)}
            >
              <Text style={styles.textStyle}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  const formatDate = (date) => {
    if (!date) return "Not set";
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const { userId } = route.params;
  console.log(userId);
  const [budgetDetails, setBudgetDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (familyMemberID) => {
    console.log(familyMemberID);
    setExpandedSections((prevSections) => ({
      ...prevSections,
      [familyMemberID]: !prevSections[familyMemberID],
    }));
  };

  const groupByFamilyMember = (budgetDetails) => {
    const grouped = {};
    //console.log(budgetDetails.budgetID + "all");
    budgetDetails.forEach((detail) => {
      if (!grouped[detail.familyMemberID]) {
        grouped[detail.familyMemberID] = {
          familyMemberID: detail.familyMemberID,
          name: detail.familyMemberName,
          relationship: detail.relationship,
          categories: [],
        };
      }
      grouped[detail.familyMemberID].categories.push({
        budgetID: detail.budgetID,
        userID: detail.userID,
        categoryID: detail.categoryID,
        familyMemberID: detail.familyMemberID,
        categoryName: detail.categoryName,
        amount: detail.amount,
        startDate: detail.startDate,
        endDate: detail.endDate,
        periodicity: detail.periodicity,
      });
    });

    return Object.values(grouped);
  };

  const fetchBudgetDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetchAllBudgetDetails(userId);
      const groupedBudgetDetails = groupByFamilyMember(response);
      setBudgetDetails(groupedBudgetDetails);
    } catch (error) {
      console.error("An error occurred while fetching budget details", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBudgetDetails();
      return () => {};
    }, [userId])
  );
  useEffect(() => {
    const getBudgetDetails = async () => {
      try {
        const response = await fetchAllBudgetDetails(userId);
        const groupedBudgetDetails = groupByFamilyMember(response);
        setBudgetDetails(groupedBudgetDetails);
        //console.log(groupedBudgetDetails);
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
      <TouchableOpacity
        onPress={() => {
          console.log(item.familyMemberID);
          toggleSection(item.familyMemberID);
        }}
        style={styles.headerContainer}
      >
        <Text style={styles.familyMemberHeader}>
          {item.name} - {item.relationship}
        </Text>
        <Ionicons
          name={
            expandedSections[item.familyMemberID]
              ? "md-chevron-up"
              : "md-chevron-down"
          }
          size={24}
          color="black"
        />
      </TouchableOpacity>

      {expandedSections[item.familyMemberID] && (
        <>
          <View style={styles.categoryItemTitle}>
            <Text style={styles.detailTextTitle}>Category Name</Text>
            <Text style={styles.detailTextTitle}>Amount</Text>
            <Text style={styles.detailTextTitle}>StartDate</Text>
            <Text style={styles.detailTextTitle}>EndDate</Text>
            <Text style={styles.detailTextTitle}>Periodicity</Text>
          </View>

          {item.categories.map((category, index) => (
            <TouchableOpacity key={index} onPress={() => openModal(category)}>
              <View style={styles.categoryItem}>
                <Text style={styles.detailText}>{category.categoryName}</Text>
                <Text style={styles.detailText}>{category.amount}</Text>
                <Text style={styles.detailText}>
                  {category.startDate
                    ? category.startDate.split("T")[0]
                    : "StartDate"}
                </Text>
                <Text style={styles.detailText}>
                  {category.endDate
                    ? category.endDate.split("T")[0]
                    : "EndDate"}
                </Text>
                <Text style={styles.detailText}>{category.periodicity}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </>
      )}
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
          <View style={styles.madalViewConteiner}>
            {selectedCategory && (
              <>
                <Text style={styles.modalTextTitle}>
                  {selectedCategory.categoryName}
                </Text>
                <View style={styles.modalContentContainer}>
                  <Text style={styles.modalText}>
                    Amount:
                    {/* {selectedCategory ? selectedCategory.amount : ""} */}
                  </Text>
                  <TextInput
                    style={[styles.pickerContainer3, styles.addMemberButton]}
                    placeholder="Enter amount"
                    onChangeText={setInputAmount}
                    value={inputAmount}
                    keyboardType="numeric"
                  />

                  <TouchableOpacity
                    title="Pick a Start Date"
                    onPress={toggleStartDatePicker}
                    style={[styles.pickerContainer2, styles.addMemberButton]}
                  >
                    {/* Call renderDatePicker() without the conditional */}
                    {renderDatePicker()}
                    <Text style={styles.datePickerText}>
                      StartDate: {formatDate(selectedDate)}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    title="Pick an End Date"
                    onPress={toggleEndDatePicker}
                    style={[styles.pickerContainer2, styles.addMemberButton]}
                  >
                    {/* Call renderDatePicker2() without the conditional */}
                    {renderDatePicker2()}
                    <Text style={styles.datePickerText}>
                      EndDate: {formatDate(selectedEndDate)}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={periodicity}
                    onValueChange={(itemValue, itemIndex) =>
                      setPeriodicity(itemValue)
                    }
                    style={styles.picker}
                  >
                    <Picker.Item label="Periodicity" value="" />
                    <Picker.Item label="Daily" value="Daily" />
                    <Picker.Item label="Weekly" value="Weekly" />
                    <Picker.Item label="Monthly" value="Monthly" />
                  </Picker>
                </View>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={saveCategoryDetails}
                >
                  <Text style={styles.textStyle}>Update</Text>
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
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ShowAllBudgetDetails;
