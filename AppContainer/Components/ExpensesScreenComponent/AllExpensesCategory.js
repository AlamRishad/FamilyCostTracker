import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  TextInput,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./StyleAllExpenses";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import {
  fetchAllExpenseDetails,
  createExpenseDetail,
  updateExpense,
} from "../../API/GetExpenseApi";

const ShowAllexpenseDetails = ({ route }) => {
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [category, setCategory] = useState();

  const [inputAmount, setInputAmount] = useState("");

  const openModal = (category) => {
    setSelectedCategory(category);
    setIsModalVisible(true);
  };
  const updateExpenseDetails = async () => {
    const currentDate = new Date().toISOString().split("T")[0];

    const newExpenseAmount =
      parseFloat(selectedCategory.expenseAmount || 0) + parseFloat(inputAmount);
    const amountValue = newExpenseAmount.toString();

    const expenseToUpdate = {
      expenseID: selectedCategory.expenseID,
      userID: userId,
      categoryID: selectedCategory.categoryID,
      expenseAmount: amountValue,
      description: "Not needed",
      date: currentDate,
      familyMemberID: selectedCategory.familyMemberID,
      periodicity: selectedCategory.periodicity,
    };
    console.log(expenseToUpdate);
    // try {
    //   const result = await updateExpense(selectedCategory.expenseID, expenseToUpdate);
    //   console.log(result);
    //   setIsModalVisible(false);
    // } catch (error) {

    // }
    try {
      let response;
      if (selectedCategory.expenseID) {
        console.log(
          "Updating budget detail with ID: ",
          selectedCategory.budgetID
        );
        response = await updateExpense(
          selectedCategory.expenseID,
          expenseToUpdate
        );
      } else {
        console.log("Creating new budget detail.");
        response = await createExpenseDetail(expenseToUpdate);
      }

      console, log(response + "update");
      setBudgetDetails((prevDetails) =>
        selectedCategory.expenseID
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
      // setIsModalVisible(false);
      if (error.message === "Property 'log' doesn't exist") {
        setIsModalVisible(false);
        setModalErrorMessage(null);
        fetchexpenseDetails();
      } else {
        setModalErrorMessage(
          "Please add a category Budget and give a valid amount."
        );
        // console.error("Failed to save budget detail: ", error);
      }
    }
  };

  const { userId } = route.params;
  console.log(userId);
  const [expenseDetails, setexpenseDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [modalErrorMessage, setModalErrorMessage] = useState("");

  const toggleSection = (familyMemberID) => {
    console.log(familyMemberID);
    setExpandedSections((prevSections) => ({
      ...prevSections,
      [familyMemberID]: !prevSections[familyMemberID],
    }));
  };

  const groupByFamilyMember = (expenseDetails) => {
    const grouped = {};
    //console.log(expenseDetails.budgetID + "all");
    expenseDetails.forEach((detail) => {
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
        amount: detail.budgetAmount,
        expenseAmount: detail.expenseAmount,
        startDate: detail.startDate,
        endDate: detail.endDate,
        periodicity: detail.periodicity,
      });
    });

    return Object.values(grouped);
  };

  const fetchexpenseDetails = async () => {
    setIsLoading(true);
    setError(null);

    setErrorMessage(null);
    try {
      const response = await fetchAllExpenseDetails(userId);
      const groupedexpenseDetails = groupByFamilyMember(response);
      setexpenseDetails(groupedexpenseDetails);
    } catch (error) {
      setErrorMessage("Please Add Category");
      // setError("Please Add Category");
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchexpenseDetails();
      return () => {};
    }, [userId])
  );
  useEffect(() => {
    const getexpenseDetails = async () => {
      try {
        const response = await fetchAllExpenseDetails(userId);
        const groupedexpenseDetails = groupByFamilyMember(response);
        setexpenseDetails(groupedexpenseDetails);
        //console.log(groupedexpenseDetails);
      } catch (error) {
        if (error.message === "Cannot read property 'forEach' of undefined") {
          return;
        }
        setErrorMessage("An error occurred while fetching budget details");

        // console.error("An error occurred while fetching budget details", error);
      } finally {
        setIsLoading(false);
      }
    };

    getexpenseDetails();
  }, [userId]);

  const renderItem = ({ item }) => {
    const lastCategoryDetails = new Map();

    item.categories.forEach((category) => {
      lastCategoryDetails.set(category.categoryID, category);
    });
    const totalExpenses = Array.from(lastCategoryDetails.values()).reduce(
      (acc, category) => acc + (category.expenseAmount || 0),
      0
    );
    const totalBudget = Array.from(lastCategoryDetails.values()).reduce(
      (acc, category) => acc + (category.amount || 0),
      0
    );
    const totalRemaining = totalBudget - totalExpenses;

    const lastCategories = Array.from(lastCategoryDetails.values());

    return (
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
              <Text style={styles.detailTextTitle}>Budget</Text>
              <Text style={styles.detailTextTitle}>Expense</Text>
              <Text style={styles.plusTextTitle}>+</Text>
              {/* <Text style={styles.detailTextTitle}> </Text> */}
              <Text style={styles.detailTextTitle}>Remaining</Text>
            </View>

            {lastCategories.map((category, index) => (
              <TouchableOpacity key={index} onPress={() => openModal(category)}>
                <View style={styles.categoryItem}>
                  <Text style={styles.detailText}>{category.categoryName}</Text>
                  <Text style={styles.detailText}>{category.amount}</Text>
                  <Text style={styles.detailText}>
                    {category.expenseAmount !== null
                      ? category.expenseAmount
                      : "0"}
                  </Text>
                  <Text style={styles.plusText}>+</Text>
                  <Text
                    style={[
                      styles.detailText,
                      category.amount - (category.expenseAmount || 0) < 0
                        ? styles.negativeRemaining
                        : {},
                    ]}
                  >
                    {category.amount - (category.expenseAmount || 0)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            <View style={styles.categoryItemTitle}>
              <Text style={styles.detailTextTitle}>Total</Text>
              <Text style={styles.detailTextTitle}>{totalBudget}</Text>
              <Text style={styles.detailTextTitle}>{totalExpenses}</Text>
              <Text style={styles.plusTextTitle}>+</Text>
              <Text style={styles.detailTextTitle}>{totalRemaining}</Text>
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {errorMessage && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      )}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={expenseDetails}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={fetchexpenseDetails}
            />
          }
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
                  {modalErrorMessage && (
                    <Text style={styles.errorMessage}>{modalErrorMessage}</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={updateExpenseDetails}
                >
                  <Text style={styles.textStyle}>Update</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    setIsModalVisible(false);
                    setModalErrorMessage(null);
                  }}
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

export default ShowAllexpenseDetails;
