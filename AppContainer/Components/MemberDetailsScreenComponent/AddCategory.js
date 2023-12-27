import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  StatusBar,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { addCategory } from "../../API/CategoryApi";

import { getCategoriesByFamilyMember } from "../../API/getAllUser";
const { width, height } = Dimensions.get("window");

const AddCategory = ({ route }) => {
  const navigation = useNavigation();
  const { familyMemberID, userId } = route.params;

  const initialCategoryState = {
    Name: "",
    UserID: userId.toString(),
    FamilyMemberID: familyMemberID ? familyMemberID.toString() : "",
  };
  const [category, setCategory] = useState(initialCategoryState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [categoryError, setCategoryError] = useState(null);

  useFocusEffect(
    useCallback(() => {
      setCategory(initialCategoryState);

      fetchCategories();
      setError(null);

      setCategoryError(null);

      return () => {};
    }, [familyMemberID, userId])
  );

  const onSubmit = async () => {
    setIsSubmitting(true);
    if (!category.Name) {
      setCategoryError("The name field cannot be empty.");
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await addCategory({
        name: category.Name,
        userID: category.UserID,
        familyMemberID: category.FamilyMemberID,
      });

      if (result) {
        setCategoryError(null);
        fetchCategories();

        console.log("Category submitted", result);
      } else {
        console.log("Category added, but no details returned from the server.");
      }

      navigation.navigate("MemberDetailsScreen", {
        familyMemberID: category.FamilyMemberID,
        userId: category.UserID,
      });
      setCategory(initialCategoryState);
      setCategoryError(null);
      setError("");
      fetchCategories();
    } catch (err) {
      if (err == "Error: Failed to add category") {
        setCategoryError("This category already exists.");
      } else {
        console.error("Submission error:", err);
        setCategoryError(err.toString());
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (name, value) => {
    setCategory({ ...category, [name]: value });
  };
  // const { familyMemberID } = route.params;
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const fetchedCategories = await getCategoriesByFamilyMember(
        familyMemberID
      );
      setCategories(fetchedCategories);
    } catch (error) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [familyMemberID])
  );
  const numColumns = 3;
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
        {categoryError !== "" ? (
          <Text style={styles.error2}>{categoryError}</Text>
        ) : null}

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
      <View style={styles.categoryItemHead}>
        <Text style={styles.categoryNameHead}>Category</Text>
      </View>
      <View style={styles.categoryContainer}>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text style={styles.error}>{error}</Text>
        ) : (
          <FlatList
            data={categories}
            key={numColumns} // Use numColumns as part of the key
            keyExtractor={(item) => item.categoryID.toString()}
            numColumns={numColumns}
            renderItem={({ item }) => (
              <View style={styles.categoryItem}>
                <Text style={styles.categoryName}>{item.name}</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    margin: "2.5%",
    borderRadius: 5,
    justifyContent: "center",
  },
  categoryContainer: {
    height: height * 0.45,
    justifyContent: "center",
    alignItems: "center",
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

  error: {
    color: "red",
    textAlign: "center",
    marginVertical: 8,
  },
  error2: {
    color: "red",
    textAlign: "center",
    width: width * 0.9,
  },
  categoryItemHead: {
    backgroundColor: "#EFF3FB",
    padding: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  categoryNameHead: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 4,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.25,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#205578",
    margin: 5,

    textAlign: "center",
  },
  categoryName: {
    fontSize: 14,
    textAlign: "center",
    color: "white",
    marginHorizontal: 4,
    fontWeight: "bold",
  },
  error: {
    color: "red",
  },
});

export default AddCategory;
