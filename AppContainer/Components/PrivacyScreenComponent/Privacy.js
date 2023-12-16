import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Privacy = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.header}>
          Privacy Policy for Family Cost Tracker App
        </Text>
        <Text style={styles.paragraph}>
          Welcome to the Family Cost Tracker App. Your privacy is critically
          important to us. This privacy policy outlines the types of information
          that are collected and recorded by the Family Cost Tracker App and how
          we use it.{" "}
        </Text>
        <Text style={styles.subHeader}>Information We Collect</Text>
        <Text style={styles.paragraph}>
          We collect information in the following ways:
        </Text>
        <Text style={styles.bulletPoint}>
          • Information you provide us directly, such as personal information
          you enter when creating an account, including your name, email
          address, and password.
        </Text>
        <Text style={styles.bulletPoint}>
          • Information we collect through your use of the app, such as
          transaction records, including date, amount, and category of expenses.
        </Text>
        <Text style={styles.subHeader}>How We Use Your Information </Text>
        <Text style={styles.paragraph}>
          {" "}
          We use the information we collect from you in the following ways:
        </Text>

        <Text style={styles.bulletPoint}>
          • To provide, maintain, and improve the services of the Family Cost
          Tracker App.
        </Text>
        <Text style={styles.bulletPoint}>
          • To communicate with you, including sending you notifications and
          service-related messages.
        </Text>
        <Text style={styles.bulletPoint}>
          • To enhance the security of the app and to prevent fraud.
        </Text>
        <Text style={styles.subHeader}>Sharing Your Information</Text>

        <Text style={styles.paragraph}>
          We do not share personal information with companies, organizations, or
          individuals outside of the Family Cost Tracker App except in the
          following cases:
        </Text>
        <Text style={styles.bulletPoint}>• With your consent.</Text>
        <Text style={styles.bulletPoint}>
          • For legal reasons, such as to meet any applicable law, regulation,
          legal process, or enforceable governmental request.
        </Text>
        <Text style={styles.subHeader}>Protecting Your Information</Text>

        <Text style={styles.paragraph}>
          We take the protection of your data seriously and implement a variety
          of security measures to maintain the safety of your personal
          information.
        </Text>
        <Text style={styles.subHeader}>
          Accessing and Updating Your Information
        </Text>

        <Text style={styles.paragraph}>
          You may access and update your information at any time through the app
          settings.
        </Text>
        <Text style={styles.subHeader}>Changes to This Privacy Policy</Text>

        <Text style={styles.paragraph}>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page.
        </Text>
        <Text style={styles.subHeader}>Contact Us </Text>

        <Text style={styles.paragraph}>
          If you have any questions about this Privacy Policy, please contact
          us.
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
    margin: 12.5,
    padding: 12.5,
    // borderWidth: 1,
    // borderColor: "gray",
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

export default Privacy;
