import React, { useContext, useEffect, useState } from "react";
import {
	Dimensions,
	SafeAreaView,
	StyleSheet,
	View,Text,
} from "react-native";
import TopBar from "../../Components/CommonComponent/TopBar";
import AllAddMember from "../../Components/HomePage/AddMember";

import { globalStyle } from "../../utils/globalStyle.js";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Index() {



	return (
		<SafeAreaView style={[globalStyle.container,styles.container]}>
			
					<View>
					<TopBar></TopBar>
					<AllAddMember></AllAddMember>
					</View>
				
			
				
			
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// paddingHorizontal: 15,
	},
	scrollableViewContainer: {
	},
	componentContainer: {
		marginBottom: 20,
	},
});