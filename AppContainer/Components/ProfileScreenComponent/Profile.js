import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ProfileImage from "../../../assets/splash.png";
const Profile = () => {
  const navigation = useNavigation();
  const handlePrivacyPress = async () => {
    navigation.navigate("PrivacyScreen");
  };
  const handleHelpPress = async () => {
    navigation.navigate("HelpScreen");
  };
  const handleSecurityPress = async () => {
    navigation.navigate("SecurityScreen");
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity onPress={() => {}}></TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <Image source={ProfileImage} style={styles.profilePic} />
          <Text style={styles.name}>Mahfuzul Alam Rishad</Text>
          <View style={styles.financeContainer}>
            <View style={styles.incomeContainer}>
              <Text style={styles.moneyText}>Income</Text>
              <Text style={styles.amount}>৳2,400.00</Text>
            </View>

            <View style={styles.divider} />
            <View style={styles.expenseContainer}>
              <Text style={styles.moneyText}>Expense</Text>
              <Text style={styles.amount}>৳670.00</Text>
            </View>
          </View>
        </View>
        <View style={styles.generalSection}>
          <Text style={styles.generalText2}>Edit Profile</Text>
          <TouchableOpacity
            onPress={() => {
              /* handle security */
            }}
            style={styles.generalView}
          >
            <Text style={styles.generalText}>Edit Username</Text>
            <View tyle={styles.generalIcon}>
              <Icon name="chevron-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              /* handle security */
            }}
            style={styles.generalView}
          >
            <Text style={styles.generalText}>Edit Password</Text>
            <View tyle={styles.generalIcon}>
              <Icon name="chevron-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              /* handle security */
            }}
            style={styles.generalView}
          >
            <Text style={styles.generalText}>Edit Email</Text>
            <View tyle={styles.generalIcon}>
              <Icon name="chevron-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.generalSection}>
          <Text style={styles.generalText2}>General</Text>
          <TouchableOpacity
            onPress={handleSecurityPress}
            style={styles.generalView}
          >
            <Text style={styles.generalText}>Security</Text>
            <View tyle={styles.generalIcon}>
              <Icon name="chevron-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleHelpPress}
            style={styles.generalView}
          >
            <Text style={styles.generalText}>Help</Text>
            <View tyle={styles.generalIcon}>
              <Icon name="chevron-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlePrivacyPress}
            style={styles.generalView}
          >
            <Text style={styles.generalText}>Privacy Policy</Text>
            <View tyle={styles.generalIcon}>
              <Icon name="chevron-right" size={25} color="#000" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.generalSection}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
            style={styles.generalView2}
          >
            <Text style={styles.generalText3}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              /* handle security */
            }}
            style={styles.generalView3}
          >
            <Text style={styles.generalText3}>Remove Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: "100%",
  },
  header: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
    // Add other styles like shadow, background color if needed
  },
  headerTitle: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  profileSection: {
    alignItems: "center",
    padding: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  financeContainer: {
    flexDirection: "row",
    backgroundColor: "#EFF3FB",
    borderRadius: 20,
    padding: 13,
    justifyContent: "space-between",
    alignItems: "center",
  },
  incomeContainer: {
    flex: 1,
    alignItems: "center",
  },
  expenseContainer: {
    flex: 1,
    alignItems: "center",
  },
  moneyText: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
  amount: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    height: "100%",
    width: 1,
    backgroundColor: "white",
    opacity: 0.5,
    border: 1,
  },
  generalSection: {
    // Add styles for this section
  },
  generalText: {
    fontSize: 18,
  },
  generalText2: {
    paddingTop: 20,
    paddingBottom: 5,
    paddingLeft: 25,
    fontSize: 18,
    fontWeight: "bold",
  },
  generalText3: {
    fontSize: 18,
    color: "white",
  },
  generalView: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#EFF3FB",
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: 18,
    padding: 20,
    marginTop: "2%",
  },
  generalView2: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#205578",
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: 18,
    padding: 20,
    marginTop: "2%",
  },
  generalView3: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "red",
    marginLeft: "5%",
    marginRight: "5%",
    borderRadius: 18,
    padding: 20,
    marginTop: "2%",
    marginBottom: "5%",
  },
  generalIcon: {},
});

export default Profile;
