import React, { useContext, useEffect, useState, useCallback } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View, Text } from "react-native";
import TopBar from "../../../SecondaryComponent/CommonComponent/TopBar.js";
import { globalStyle } from "../../../utils/globalStyle.js";
import PeriodicityDetails from "../../../SecondaryComponent/HomePage/PeriodicityChart.js";
import { fetchFamilyMemberDetails } from "../../../API/DailyExpenseApi.js";
import { useFocusEffect } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Index({ route }) {
  const userId = route.params?.userId;
  const username = route.params?.username;

  const familyMemberId = route.params?.familyMemberId;
  familyMemberId;
  console.log(route);
  console.log("UserID on HomeScreen:", userId);
  console.log("Username on HomeScreen:", username);

  console.log("FamilyMemberId on HomeScreen:", familyMemberId);
  return (
    <SafeAreaView style={[globalStyle.container, styles.container]}>
      <View>
        <TopBar route={route}></TopBar>
        <PeriodicityDetails route={route}></PeriodicityDetails>
        {/* <TopBar route={route}></TopBar>
        <View style={styles.addMember}>
          <AllAddMember route={route}></AllAddMember>
        </View>
        <PeriodicityDetails route={route}></PeriodicityDetails> */}
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
