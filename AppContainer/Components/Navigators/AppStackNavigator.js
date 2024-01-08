import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "../../Screens/LoginScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import Profile from "../../Screens/ProfileScreen";
import ForgotPasswordScreen from "../../Screens/ForgotPasswordScreen";
import RegisterScreen from "../../Screens/RegisterScreen";
import AddMemberScreen from "../../Screens/AddMemberScreen";
import PrivacyScreen from "../../Screens/PrivacyScreen";
import SecurityScreen from "../../Screens/SecurityScreen";
import HelpScreen from "../../Screens/HelpScreen";
import MemberDetailsScreen from "../../Screens/MemberDetailsScreen";
import ExpensesScreen from "../../Screens/ExpensesScreen";
import BudgetScreen from "../../Screens/BudgetScreen";
import ReportScreen from "../../Screens/ReportScreen";
import EditUserNameScreen from "../../Screens/EditUserNameScreen";
import EditPasswordScreen from "../../Screens/EditPasswordScreen";
import EditEmailScreen from "../../Screens/EditEmailScreen";
import SecondaryBottomTabNavigator from "./SecondaryBottomTabNavigator";
import SecondaryProfile from "../../Screens/SecondaryScreen/SecondaryProfileScreen";
import EditPasswordScreenSecondary from "../../Screens/SecondaryScreen/EditPasswordScreenSecondary";

const Stack = createNativeStackNavigator();
export default function AppStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: "horizontal",

        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      <Stack.Screen
        name="SecondaryMainApp"
        component={SecondaryBottomTabNavigator}
      />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SecondaryProfile" component={SecondaryProfile} />

      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="AddMemberScreen" component={AddMemberScreen} />
      <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} />
      <Stack.Screen name="SecurityScreen" component={SecurityScreen} />
      <Stack.Screen
        name="MemberDetailsScreen"
        component={MemberDetailsScreen}
      />
      <Stack.Screen name="ExpensesScreen" component={ExpensesScreen} />
      <Stack.Screen name="BudgetScreen" component={BudgetScreen} />
      <Stack.Screen name="ReportScreen" component={ReportScreen} />
      <Stack.Screen name="EditUserNameScreen" component={EditUserNameScreen} />
      <Stack.Screen name="EditPasswordScreen" component={EditPasswordScreen} />
      <Stack.Screen name="EditEmailScreen" component={EditEmailScreen} />
      <Stack.Screen
        name="EditPasswordScreenSecondary"
        component={EditPasswordScreenSecondary}
      />
    </Stack.Navigator>
  );
}
