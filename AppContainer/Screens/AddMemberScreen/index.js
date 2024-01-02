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
import AddMemberScreen from "../../Components/AddMemberScreenComponent/AddMember.js";
import NetInfo from "@react-native-community/netinfo";

import BackBar from "../../Components/CommonComponent/BackBar.js";

import { globalStyle } from "../../utils/globalStyle.js";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Index({ route }) {
  console.log(route.params.userId + "h");

  const userId = route.params.userId;
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
  return (
    <SafeAreaView style={[globalStyle.container, styles.container]}>
      <View>
        <BackBar></BackBar>
        <AddMemberScreen route={userId}></AddMemberScreen>
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
