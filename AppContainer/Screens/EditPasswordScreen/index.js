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
import EditPassword from "../../Components/EditPasswordScreenComponent/EditPassword.js";

import { globalStyle } from "../../utils/globalStyle.js";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Index() {
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
        <EditPassword></EditPassword>
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
