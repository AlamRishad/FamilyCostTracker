import React, { useContext, useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View, Text } from "react-native";
import TopBar from "../../Components/CommonComponent/TopBar";
import AllAddMember from "../../Components/HomePage/AddMember";
import PeriodicityDetails from "../../Components/HomePage/PeriodicityChart.js";

import { globalStyle } from "../../utils/globalStyle.js";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Index({ route }) {
  // const userId = route.params.userId;
  const userId = route.params.userId;
  console.log(userId);
  console.log(userId + "homescreen" + route);
  return (
    <SafeAreaView style={[globalStyle.container, styles.container]}>
      <View>
        <TopBar route={route}></TopBar>

        {/* <ShowAllCategory route={route}></ShowAllCategory> */}
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
