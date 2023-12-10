import React, { useContext, useEffect, useState } from "react";
import {
	Dimensions,
	SafeAreaView,
	StyleSheet,
	View,Text,
} from "react-native";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Index() {



	return (
		<SafeAreaView style={[styles.container]}>
			
					<View>
					<Text>hello</Text>
					</View>
				
			
				
			
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 15,
        backgroundColor:"black",
	},
	scrollableViewContainer: {
	},
	componentContainer: {
		marginBottom: 20,
	},
});