import React, { useContext, useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View, Text } from "react-native";
import TopBar from "../../Components/CommonComponent/TopBar.js";
import AllAddMember from "../../Components/HomePage/AddMember.js";
import EditUserName from "../../Components/EditUserNameScreenComponent/EditUserName.js";

import { useRoute } from "@react-navigation/native";
import { globalStyle } from "../../utils/globalStyle.js";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Index() {
  const route = useRoute();
  const userId = route.params?.userId;
  console.log(userId);
  return (
    <SafeAreaView style={[globalStyle.container, styles.container]}>
      <View>
        <EditUserName route={route}></EditUserName>
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
