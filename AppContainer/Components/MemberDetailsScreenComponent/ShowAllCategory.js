// Components/ShowAllDetails.js

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
import { getCategoriesByFamilyMember } from "../../API/getAllUser";
const ShowAllDetails = ({ route }) => {
  const { familyMemberID } = route.params;
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    fetchCategories();
  }, [familyMemberID]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.categoryID.toString()}
          renderItem={({ item }) => (
            <View style={styles.categoryItem}>
              <Text style={styles.categoryName}>{item.name}</Text>

              <Text style={styles.categoryName}>{item.whichDate}</Text>

              <Text style={styles.categoryName}>{item.periodicity}</Text>

              {/* Add other category details you want to display */}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... existing styles ...
  container: {
    height: 350,
  },
  categoryItem: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  categoryName: {
    fontSize: 18,
  },
  // ... existing styles ...
});

export default ShowAllDetails;
