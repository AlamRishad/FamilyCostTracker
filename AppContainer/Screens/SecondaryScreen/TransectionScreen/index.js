import React, { useContext, useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View, Text } from "react-native";
import { globalStyle } from "../../../utils/globalStyle.js";
import TopBar from "../../../SecondaryComponent/CommonComponent/TopBar.js";
import TransectionDetails from "../../../SecondaryComponent/ReportScreenComponent/ReportDetails.js";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Index({ route }) {
  // const userId = route.params.userId;
  const { userId, familyMemberId, username } = route.params;
  console.log(userId);
  console.log(userId + "transection" + familyMemberId + "name" + username);
  return (
    <SafeAreaView style={[globalStyle.container, styles.container]}>
      <View>
        <TopBar route={route}></TopBar>
        <TransectionDetails route={route}></TransectionDetails>
        {/* <TopBar route={route}></TopBar>

        <TransectionDetails route={route}></TransectionDetails> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 15,
    backgroundColor: "white",
  },
  scrollableViewContainer: {},
  componentContainer: {
    marginBottom: 20,
  },
});
