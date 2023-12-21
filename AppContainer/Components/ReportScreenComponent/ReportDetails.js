import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Dimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { fetchTransectionExpenses } from "../../API/TransectionGetDetails";
const { width, height } = Dimensions.get("window");
const ReportDetails = ({ route }) => {
  const { userId } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [expenseData, setExpenseData] = useState([]);

  const loadExpenses = async () => {
    try {
      setIsLoading(true);
      const data = await fetchTransectionExpenses(userId);
      setExpenseData(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadExpenses();
    }, [userId])
  );
  const a = 0;
  const renderItem = ({ item, index }) => (
    <View style={styles.categoryItem}>
      <Text style={styles.detailText}>{index + 1}</Text>
      <Text style={styles.detailText}>{item.categoryName}</Text>
      <Text style={styles.detailText}>{item.familyMemberName}</Text>
      <Text style={styles.detailText}>{item.differenceFromPreviousRow}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transection Details</Text>
      <View style={styles.itemHeader}>
        <Text style={styles.itemHeaderText}>T.ID</Text>
        <Text style={styles.itemHeaderText}>C.Name</Text>
        <Text style={styles.itemHeaderText}>F.Name</Text>
        <Text style={styles.itemHeaderText}>T.Amount</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loading}
        />
      ) : (
        <FlatList
          data={expenseData}
          renderItem={renderItem}
          keyExtractor={(item) => item.expenseID.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyList}>No expenses found.</Text>
          }
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={loadExpenses} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5", // change as per your theme
    height: height * 0.9,
    paddingBottom: height * 0.15,
  },
  itemHeader: {
    borderRadius: 5,
    backgroundColor: "#EFF3FB",
    // paddingRight: width * 0.04,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemHeaderText: {
    fontWeight: "bold",
    fontSize: 13,
    textAlign: "center",
    width: width * 0.17,
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  itemContainer: {
    padding: 16,
    backgroundColor: "#ffffff",
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  category: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // change as per your theme
  },
  details: {
    fontSize: 16,
    color: "#666", // change as per your theme
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyList: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#999", // change as per your theme
  },
  categoryItemTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
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
  detailText: {
    fontSize: 13,
    textAlign: "center",
    width: width * 0.17,
  },
});

export default ReportDetails;
