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
  const { userId } = route.params;
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
  const a = 0;
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedIndex === index && styles.selectedItem, // Add this line
      ]}
      onPress={() => setSelectedIndex(index)} // Set the selected index
    >
      <Text style={styles.detailText}>
        {new Date(item.date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "2-digit",
        })}
      </Text>

      <Text style={styles.detailText}>
        {new Date(item.date).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </Text>

      <Text style={styles.detailText}>{item.categoryName}</Text>
      <Text style={styles.detailText}>{item.familyMemberName}</Text>

      <Text style={styles.detailText}>{item.differenceFromPreviousRow}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transection Details</Text>
      <View style={styles.itemHeader}>
        <Text style={styles.itemHeaderText}>Date</Text>

        <Text style={styles.itemHeaderText}>TIME</Text>
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
    marginBottom: 8, // Space below the header
    paddingHorizontal: "2%", // Proportional padding
    paddingVertical: 8, // Consistent vertical padding
    backgroundColor: "#EFF3FB", // Use a color that contrasts lightly with white
  },
  itemHeaderText: {
    fontWeight: "bold",
    fontSize: 16, // Increased font size for better readability
    color: "#333", // Use your theme color here
    flex: 1, // Flex applied for equal spacing
    textAlign: "center",
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 8, // Consistent margin for separation
    elevation: 1, // Elevation applied for a subtle shadow
  },
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12, // Increased padding for touch targets
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: "2%", // Proportional padding
  },
  detailText: {
    fontSize: 16, // Increased for better readability
    textAlign: "center",
    flex: 1, // Flex applied for equal spacing
    color: "#666", // Use your theme color here
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
    color: "#999", // Use your theme color here
    paddingTop: "50%", // Centers the empty text vertically in the container
  },
  selectedItem: {
    backgroundColor: "#E8E8E8", // or any color you want for the selected row
  },
});

export default ReportDetails;
