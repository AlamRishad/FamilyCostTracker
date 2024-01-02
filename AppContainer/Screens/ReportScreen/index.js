import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
} from "react-native";
import TopBar from "../../Components/CommonComponent/TopBar.js";
import AllAddMember from "../../Components/HomePage/AddMember.js";
import PeriodicityDetails from "../../Components/HomePage/PeriodicityChart.js";
import ShowAllExpense from "../../Components/ExpensesScreenComponent/AllExpensesCategory.js";
import { globalStyle } from "../../utils/globalStyle.js";
import TransectionDetails from "../../Components/ReportScreenComponent/ReportDetails.js";

import NetInfo from "@react-native-community/netinfo";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Index({ route }) {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert(
          "No Internet Connection",
          "Please check your internet connection."
        );
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  // const userId = route.params.userId;
  const userId = route.params.userId;
  console.log(userId);
  console.log(userId + "homescreen" + route);
  return (
    <SafeAreaView style={[globalStyle.container, styles.container]}>
      <View>
        <TopBar route={route}></TopBar>

        <TransectionDetails route={route}></TransectionDetails>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 15,
  },
  scrollableViewContainer: {},
  componentContainer: {
    marginBottom: 20,
  },
  addMember: {
    marginTop: "2%",
    paddingTop: "3%",
    paddingLeft: "3.5%",
    paddingBottom: "3%",
    borderRadius: 5,
    flexWrap: "wrap", // This will allow the buttons to wrap to the next line
    justifyContent: "flex-start", // Aligns buttons to the start of the container

    alignItems: "center",
    width: "95%",
    marginLeft: "2.5%",
    backgroundColor: "white",
  },
});
