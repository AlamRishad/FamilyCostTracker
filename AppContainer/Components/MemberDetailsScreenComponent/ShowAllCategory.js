import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getCategoriesByFamilyMember } from "../../API/getAllUser";

const { width, height } = Dimensions.get("window");

const ShowAllDetails = ({ route }) => {
  const { familyMemberID } = route.params;
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
      <View style={styles.categoryItemHead}>
        <Text style={styles.categoryNameHead}>Category</Text>
      </View>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={categories}
          key={numColumns}
          keyExtractor={(item) => item.categoryID.toString()}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <View style={styles.categoryItem}>
              <Text style={styles.categoryName}>{item.name}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
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
    justifyContent: "space-between",
    width: width * 0.3,
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  categoryName: {
    fontSize: 18,
    marginHorizontal: 4,
  },
  error: {
    color: "red",
  },
});

export default ShowAllDetails;
