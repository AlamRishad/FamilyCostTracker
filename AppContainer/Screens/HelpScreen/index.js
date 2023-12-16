import React, { useContext, useEffect, useState } from "react";
import { Dimensions, SafeAreaView, StyleSheet, View, Text } from "react-native";
import { globalStyle } from "../../utils/globalStyle.js";
import BackBar from "../../Components/CommonComponent/BackBar.js";
import Help from "../../Components/HelpScreenComponent/Help.js";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Index({ route }) {
  //   const userId = route.params.userId;
  //   console.log(userId + "homescreen" + route);
  return (
    <SafeAreaView style={[globalStyle.container, styles.container]}>
      <View>
        <BackBar></BackBar>
        <Help></Help>
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
