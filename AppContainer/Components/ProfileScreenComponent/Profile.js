import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { fetchAllBudgetDetails } from "../../API/budgetApi";
import { fetchTransectionExpenses } from "../../API/TransectionGetDetails";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ProfileImage from "../../../assets/splash.png";
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { fetchUserDetails } from "../../API/getAllUser";
import { deleteUser } from "../../API/login";
import { Alert } from "react-native";
const Profile = () => {
  const [budgetDetails, setBudgetDetails] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [expenseDetails, setExpenseDetails] = useState([]);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);

  const [userName, setUserName] = useState("");
  const route = useRoute();
  const userId = route.params?.userId;
  console.log(userId);
  useFocusEffect(
    React.useCallback(() => {
      fetchAllBudgetDetails(userId)
        .then((data) => {
          // console.log(data);
          setBudgetDetails(data);
          calculateTotalAmount(data);
        })
        .catch((error) => console.log("Error fetching budget details:", error));

      return () => {};
    }, [userId])
  );

  useFocusEffect(
    React.useCallback(() => {
      fetchTransectionExpenses(userId)
        .then((data) => {
          //console.log(data);
          setExpenseDetails(data);
          calculateTotalAmount2(data);
        })
        .catch((error) =>
          console.log("Error fetching expense details:", error)
        );

      return () => {};
    }, [userId])
  );
  useFocusEffect(
    React.useCallback(() => {
      fetchUserDetails(userId)
        .then((data) => {
          console.log(data);
          setUserName(data.username);
        })
        .catch((error) => console.log("Error fetching user details:", error));

      return () => {};
    }, [userId])
  );

  const calculateTotalAmount = (data) => {
    const total = data.reduce(
      (acc, item) => acc + parseFloat(item.amount || 0),
      0
    );
    setTotalAmount(total);
  };
  const calculateTotalAmount2 = (data) => {
    const total = data.reduce(
      (acc, item) => acc + parseFloat(item.differenceFromPreviousRow || 0),
      0
    );
    setTotalExpenseAmount(total);
  };

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
  const handleRemoveAccountPress = () => {
    Alert.alert(
      "Confirm Account Removal",
      "Are you sure you want to remove your account permanently?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const response = await deleteUser(userId);
              await AsyncStorage.multiRemove([
                "userId",
                "username",
                "familyMemberId",
              ]);
              navigation.navigate("LoginScreen");
              alert(response); // Or any other notification method
            } catch (error) {
              console.error("Failed to delete account:", error);
              alert("Failed to delete account: " + error.message);
            }
          },
        },
      ],
      { cancelable: false }
    );
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
          <Text style={styles.name}>{userName}</Text>
          <View style={styles.financeContainer}>
            <View style={styles.incomeContainer}>
              <Text style={styles.moneyText}>Budget</Text>
              <Text style={styles.amount}>৳{totalAmount.toFixed(2)}</Text>
            </View>

            <View style={styles.divider} />
            <View style={styles.expenseContainer}>
              <Text style={styles.moneyText}>Expense</Text>
              <Text style={styles.amount}>
                ৳{totalExpenseAmount.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.generalSection}>
          <Text style={styles.generalText2}>Edit Profile</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditUserNameScreen", { userId: userId });
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
              navigation.navigate("EditPasswordScreen", { userId: userId });
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
              navigation.navigate("EditEmailScreen", { userId: userId });
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
              Alert.alert(
                "Confirm Logout",
                "Are you sure you want to log out?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Logout cancelled"),
                    style: "cancel",
                  },
                  {
                    text: "Logout",
                    onPress: async () => {
                      // This will not work because you can't declare async here directly
                      try {
                        await AsyncStorage.multiRemove([
                          "userId",
                          "username",
                          "familyMemberId",
                        ]);
                        // Assuming navigation is passed down as a prop or via context
                        navigation.navigate("LoginScreen");
                      } catch (error) {
                        console.error("Error clearing AsyncStorage:", error);
                      }
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
            style={styles.generalView2}
          >
            <Text style={styles.generalText3}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRemoveAccountPress}
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
