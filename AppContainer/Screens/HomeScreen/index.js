import React, { useContext, useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
} from "react-native";
import TopBar from "../../Components/CommonComponent/TopBar";
import AllAddMember from "../../Components/HomePage/AddMember";
import PeriodicityDetails from "../../Components/HomePage/PeriodicityChart.js";
import Post from "../../Components/HomePage/Posts.js";
import { globalStyle } from "../../utils/globalStyle.js";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Index({ route }) {
  // const userId = route.params.userId;
  const userId = route.params.userId;
  console.log(userId + "homescreen" + route);
  const data = [
    { key: "AddMember", component: <AllAddMember route={route} /> },
    {
      key: "PeriodicityDetails",
      component: <PeriodicityDetails route={route} />,
    },
    { key: "Post", component: <Post /> },
  ];

  // Render Item for FlatList
  const renderItem = ({ item }) => <View>{item.component}</View>;

  return (
    <SafeAreaView style={[globalStyle.container, styles.container]}>
      <TopBar route={route} />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        style={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 15,
    height: "100%",
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
    flexWrap: "wrap",
    justifyContent: "flex-start",

    alignItems: "center",
    width: "95%",
    marginLeft: "2.5%",
    backgroundColor: "white",
  },
});
