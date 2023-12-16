import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const Help = () => {
  // Add navigation handling and other functionalities as needed

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>Family Cost Tracker App Help</Text>
        <Text style={styles.paragraph}>
          If you're experiencing issues or have questions about using the Family
          Cost Tracker App, this section is here to help you get the most out of
          your app experience.
        </Text>

        <Text style={styles.subHeader}>Getting Started</Text>
        <Text style={styles.paragraph}>• How to create an account </Text>
        <Text style={styles.paragraph}>• Setting up your first budget </Text>
        <Text style={styles.paragraph}>• Adding expenses and income</Text>

        <Text style={styles.subHeader}>Troubleshooting</Text>
        <Text style={styles.paragraph}>
          • What to do if you forget your password
        </Text>
        <Text>• Steps to take if the app isn't responding </Text>
        <Text style={styles.paragraph}>• How to report a bug or issue</Text>

        <Text style={styles.subHeader}>FAQs</Text>
        <Text style={styles.paragraph}>
          • Can I share my budget with family members?{" "}
        </Text>
        <Text style={styles.paragraph}>• Is my financial data secure? </Text>
        <Text style={styles.paragraph}>
          • How to sync data across multiple devices
        </Text>

        <Text style={styles.subHeader}>Support</Text>
        <Text style={styles.paragraph}>
          If you need further assistance, our support team is here to help. You
          can reach us at:
        </Text>
        <Text style={styles.paragraph}>
          • Email: mahfuzulalamrishad@gmail.com{" "}
        </Text>
        <Text style={styles.paragraph}>• Phone: 01680032074</Text>

        {/* Add additional sections as needed */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    margin: 12.5,
    padding: 12.5,
    marginBottom: 120,
    // iOS shadow properties
    shadowColor: "#D9D9D9",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    // Android shadow property
    elevation: 0.2,
    borderRadius: 5,
  },
  header: {
    textAlign: "justify",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  subHeader: {
    textAlign: "justify",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    textAlign: "justify",
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 5,
  },
  paragraphBold: {
    textAlign: "justify",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 5,
  },
  bulletPoint: {
    textAlign: "justify",
    fontSize: 14,
    lineHeight: 24,
    marginLeft: 10,
  },
});

export default Help;
