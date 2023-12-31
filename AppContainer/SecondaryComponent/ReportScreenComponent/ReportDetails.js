import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { fetchTransectionExpenses } from "../../API/TransectionGetDetails";
const { width, height } = Dimensions.get("window");
const ReportDetails = ({ route }) => {
  const { userId, familyMemberId, username } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [expenseData, setExpenseData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

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
  const renderItem = ({ item, index }) => {
    if (item.familyMemberName === username) {
      return (
        <TouchableOpacity
          style={[
            styles.categoryItem,
            selectedIndex === index && styles.selectedItem,
          ]}
          onPress={() => setSelectedIndex(index)}
        >
          <Text style={styles.detailText}>{item.expenseID}</Text>
          <Text style={styles.detailText}>{item.categoryName}</Text>
          <Text style={styles.detailText}>
            {item.differenceFromPreviousRow}
          </Text>
        </TouchableOpacity>
      );
    }

    return null;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transection Details</Text>
      <View style={styles.itemHeader}>
        <Text style={styles.itemHeaderText}>Transection ID</Text>
        <Text style={styles.itemHeaderText}>Category Name</Text>
        {/* <Text style={styles.itemHeaderText}>F.Name</Text> */}
        <Text style={styles.itemHeaderText}>Amount</Text>
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
            <Text style={styles.emptyList}>No Transection found.</Text>
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
    padding: "5%",
    backgroundColor: "#fff",
    height: height * 0.8,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: "2%",
    paddingVertical: 8,
    backgroundColor: "#EFF3FB",
  },
  itemHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 8,
    elevation: 1,
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: "2%",
  },
  detailText: {
    fontSize: 16,
    textAlign: "center",
    flex: 1,
    color: "#666",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyList: {
    flex: 1,
    fontSize: 18,
    textAlign: "center",
    color: "#999",
    paddingTop: "50%",
  },
  selectedItem: {
    backgroundColor: "#E8E8E8",
  },
});

export default ReportDetails;
