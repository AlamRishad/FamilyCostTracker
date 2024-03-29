import React, { useContext, useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View, Text } from "react-native";
import { globalStyle } from "../../../utils/globalStyle.js";
import TopBar from "../../../SecondaryComponent/CommonComponent/TopBar.js";
import ShowAllExpense from "../../../SecondaryComponent/ExpensesScreenComponent/AllExpensesCategory.js";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Index({ route }) {
  const { userId, familyMemberId } = route.params;
  // const userId = route.params.userId;
  console.log(userId);
  console.log(userId + "expensescreen" + familyMemberId);
  return (
    <SafeAreaView style={[globalStyle.container, styles.container]}>
      <View>
        <TopBar route={route}></TopBar>

        <ShowAllExpense route={route}></ShowAllExpense>
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
