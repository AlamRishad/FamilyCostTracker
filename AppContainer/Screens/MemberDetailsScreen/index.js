import React, { useContext, useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View, Text } from "react-native";
import BackBar from "../../Components/CommonComponent/BackBar.js";
import MemberDetails from "../../Components/MemberDetailsScreenComponent/MemberDetails.js";
import MemberAddCategory from "../../Components/MemberDetailsScreenComponent/AddCategory.js";
import ShowAllCategory from "../../Components/MemberDetailsScreenComponent/ShowAllCategory.js";
import Users from "../../Components/HomePage/UserScreen";

import { globalStyle } from "../../utils/globalStyle.js";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Index({ route, navigation }) {
  const { familyMemberID, userId } = route.params;
  console.log(familyMemberID);
  return (
    <SafeAreaView style={[globalStyle.container, styles.container]}>
      <View>
        <BackBar></BackBar>
        <MemberDetails route={route}></MemberDetails>

        <MemberAddCategory route={route}></MemberAddCategory>
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
});
