import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Dimensions, Text, View, StyleSheet } from "react-native";
import HomeScreen from "../../Screens/HomeScreen";
import { CardStyleInterpolators } from "@react-navigation/stack";
import HomeIcon from "../../../assets/BottomNavBar/homeIcon";
import HomeIcondis from "../../../assets/BottomNavBar/homeIconDis";
import ExpenseIcon from "../../../assets/BottomNavBar/expenseIcon";
import ExpenseIconDis from "../../../assets/BottomNavBar/expenseIconDis";
import ReportIcon from "../../../assets/BottomNavBar/reportIcon";
import ReportIconDis from "../../../assets/BottomNavBar/reportIcondis";
import SettingsIcon from "../../../assets/BottomNavBar/settingsIcon";
import SettingsIconDis from "../../../assets/BottomNavBar/settingsIconDis";
import HelpScreen from "../../Screens/HelpScreen";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ route, navigation }) => {
  const { userId } = route.params;
  console.log(userId + "bottomnavbar");
  return (
    <Tab.Navigator
      initialRouteName="newProblem"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        tabBarStyle: styles.tabBarContainer,
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        initialParams={{ userId: userId }}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabLabel,
                { color: focused ? "#205578" : "#ffffff" },
              ]}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabItem, focused && styles.tabThings]}>
              {focused ? <HomeIcon /> : <HomeIcondis />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="newProblem"
        component={HelpScreen}
        initialParams={{ userId: userId }}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabLabel,
                { color: focused ? "#205578" : "#ffffff" },
              ]}
            >
              Expenses
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabItem, focused && styles.tabThings]}>
              {focused ? <ExpenseIcon /> : <ExpenseIconDis />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="newProblem2"
        component={HelpScreen}
        initialParams={{ userId: userId }}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabLabel,
                { color: focused ? "#205578" : "#ffffff" },
              ]}
            >
              Report
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabItem, focused && styles.tabThings]}>
              {focused ? <ReportIcon /> : <ReportIconDis />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="newProblem3"
        component={HelpScreen}
        initialParams={{ userId: userId }}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              style={[
                styles.tabLabel,
                { color: focused ? "#205578" : "#ffffff" },
              ]}
            >
              Settings
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabItem, focused && styles.tabThings]}>
              {focused ? <SettingsIcon /> : <SettingsIconDis />}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: "#205578",
    borderTopLeftRadius: width * 0.035,
    borderTopRightRadius: width * 0.035,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "gray",
    elevation: 10,
    height: height * 0.09,
    paddingBottom: height * 0.005,
  },
  tabItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: height * 0.03,
    height: height * 0.055,
    width: width * 0.2,
  },
  tabLabel: {
    fontWeight: "bold",
    fontSize: 10,
    paddingTop: 18,
  },
  tabThings: {
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: width * 0.005,
    paddingBottom: width * 0.001,
    paddingLeft: width * 0.05,
    paddingRight: width * 0.05,
    borderRadius: width * 0.04,
    marginTop: height * 0.03,
  },
});

export default BottomTabNavigator;
