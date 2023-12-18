import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  StatusBar,
} from "react-native";

const PeriodicityDetails = ({ route }) => {
  const { userId } = route.params;
  const [selectedPeriodicity, setSelectedPeriodicity] = useState("Daily");

  useEffect(() => {
    fetchPeriodicityDetails("Daily");
  }, []);

  const fetchPeriodicityDetails = (periodicity) => {
    console.log(`Fetching details for ${periodicity}`);
  };

  const handlePress = (periodicity) => {
    setSelectedPeriodicity(periodicity);
    fetchPeriodicityDetails(periodicity);
  };

  const isActive = (periodicity) => selectedPeriodicity === periodicity;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        {["Daily", "Weekly", "Monthly"].map((periodicity) => (
          <TouchableOpacity
            key={periodicity}
            style={[
              styles.button,
              isActive(periodicity) ? styles.activeButton : {},
            ]}
            onPress={() => handlePress(periodicity)}
          >
            <Text
              style={[
                styles.buttonText,
                isActive(periodicity) ? styles.activeButtonText : {},
              ]}
            >
              {periodicity}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedPeriodicity && (
        <View style={styles.graphContainer}>
          <Text>Graph for {selectedPeriodicity}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "4%",
    margin: "2%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
  },
  buttonContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    marginBottom: 20,
  },
  button: {
    textAlign: "center",
    width: "33%",
    backgroundColor: "#205578",
    padding: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
  },
  graphContainer: {
    // styles for your graph container
    width: "90%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Placeholder color
    borderRadius: 10,
  },
  activeButton: {
    backgroundColor: "#F0F0F0",
    borderColor: "#F0F0F0",
  },
  activeButtonText: {
    color: "#205578",
  },
});

export default PeriodicityDetails;
