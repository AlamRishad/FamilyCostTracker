import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  View,
  StyleSheet,
  StatusBar,
} from "react-native";
import { getFamilyMemberDetails } from "../../API/getAllUser";

const MemberDetails = ({ route }) => {
  // Extract familyMemberID from route params
  const { familyMemberID } = route.params;
  console.log(familyMemberID);
  const [memberDetails, setMemberDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      setIsLoading(true);
      try {
        const details = await getFamilyMemberDetails(familyMemberID);
        console.log(details);
        setMemberDetails(details);
      } catch (error) {
        setError(error.toString());
      } finally {
        setIsLoading(false);
      }
    };
    fetchMemberDetails();
  }, [familyMemberID]);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : memberDetails ? (
        <View>
          <Text style={styles.details}>{memberDetails.name}</Text>
          <Text style={styles.details2}>{memberDetails.relationship} </Text>
        </View>
      ) : (
        <Text>No member details.</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  details: {
    textAlign: "center",
    padding: 10,
    paddingBottom: 4,
    fontSize: 20,
    fontWeight: "bold",
  },

  details2: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
});

export default MemberDetails;
