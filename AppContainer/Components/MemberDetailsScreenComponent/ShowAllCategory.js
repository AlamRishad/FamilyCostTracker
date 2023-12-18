// Components/ShowAllDetails.js

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { getCategoriesByFamilyMember } from "../../API/getAllUser";

const { width, height } = Dimensions.get("window");
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
      <View style={styles.categoryItemHead}>
        <Text style={styles.categoryNameHead}>Category</Text>
      </View>
      {/* <View style={styles.categoryItem}> */}
      {/* <Text style={styles.categoryNameTitle}>Name</Text> */}

      {/* <Text style={styles.categoryNameTitle}>Date</Text>

        <Text style={styles.categoryNameTitle}>Periodicity</Text> */}
      {/* </View> */}
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

              {/* <Text style={styles.categoryName}>
                {item.whichDate.split("T")[0]}
              </Text>

              <Text style={styles.categoryName}>{item.periodicity}</Text> */}
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
    height: height * 0.525,
    backgroundColor: "white",
    // marginTop: StatusBar.currentHeight || 0, // Adjust the top margin for the status bar
  },
  categoryItemHead: {
    backgroundColor: "#EFF3FB",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  categoryNameHead: {
    fontSize: 20,
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 4,
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  categoryName: {
    fontSize: 18,
    flex: 1,
    textAlign: "center",
    marginHorizontal: 4,
  },
  categoryItemTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  categoryNameTitle: {
    fontSize: 18,
    flex: 1,
    textAlign: "center",
    marginHorizontal: 4,
  },
});

export default ShowAllDetails;
