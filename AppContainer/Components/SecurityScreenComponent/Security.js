import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Security = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>Security at Family Cost Tracker</Text>
        <Text style={styles.text}>
          We understand the importance of keeping your family's financial data
          secure. Our team is dedicated to ensuring the safety and privacy of
          your information. Here's how we protect your data:
        </Text>
        <Text style={styles.subHeader}>Data Encryption</Text>
        <Text style={styles.text}>
          All sensitive data you enter is encrypted using advanced encryption
          standards. Whether it's your transaction details or personal
          information, everything is securely encrypted both in transit and at
          rest.
        </Text>
        <Text style={styles.subHeader}>Secure Access</Text>
        <Text style={styles.text}>
          Access to your account is protected by strong authentication
          mechanisms. We recommend setting a unique and robust password and
          using biometric authentication where available.
        </Text>
        <Text style={styles.subHeader}>Regular Audits</Text>
        <Text style={styles.text}>
          Our systems undergo regular security audits to identify and remediate
          potential vulnerabilities. We strive to stay ahead of potential
          threats by proactively managing security risks.
        </Text>
        <Text style={styles.subHeader}>Privacy by Design</Text>
        <Text style={styles.text}>
          We adhere to the principle of privacy by design. This means that we
          consider your privacy at every stage of our app development and
          feature releases.
        </Text>
        {/* Add more sections as needed */}
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
    margin: 15,
    padding: 15,
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
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  subHeader: {
    textAlign: "justify",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 15,
    marginBottom: 5,
  },
  paragraph: {
    textAlign: "justify",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
  },
  text: {
    textAlign: "justify",
    fontSize: 15,
    marginBottom: 5,
  },
  bulletPoint: {
    textAlign: "justify",
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 10,
  },
});

export default Security;
