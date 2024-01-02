import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
} from "react-native";
import { globalStyle } from "../../utils/globalStyle.js";
import BackBar from "../../Components/CommonComponent/BackBar.js";
import Privacy from "../../Components/SecurityScreenComponent/Security.js";

import NetInfo from "@react-native-community/netinfo";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Index({ route }) {
  //   const userId = route.params.userId;
  //   console.log(userId + "homescreen" + route);
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
        <Privacy></Privacy>
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
