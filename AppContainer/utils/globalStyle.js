import { StatusBar, StyleSheet } from "react-native";

const StBarHeight = StatusBar.currentHeight;

export const globalStyle = StyleSheet.create({
	container: {
		paddingTop: StBarHeight ,
		backgroundColor: "#EFF3FB",
		// paddingHorizontal: 15,
		zIndex: 1,
	},
	loader: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: "#fff",
		// height: "100%",
		// width: "100%",
	},
});