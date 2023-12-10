import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import HomeScreen from "../../Screens/HomeScreen";
import { CardStyleInterpolators } from "@react-navigation/stack";
import HomeIcon from "../../../assets/BottomNavBar/homeIcon"



const windowHeight = Dimensions.get("window").height;
const Tab = createBottomTabNavigator();



const BottomTabNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName="newProblem"
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
				gestureDirection: "horizontal",
				
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				tabBarStyle: {
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					backgroundColor: "#EFF3FB",
					height: windowHeight * 0.09,
					paddingBottom: windowHeight * 0.017,
					paddingTop: windowHeight * 0.01,
					elevation: 20,
					shadowColor: "#000000",
					shadowOpacity: 0.14, // set shadow opacity
					shadowRadius: 19,

					borderTop: 1,
					borderColor: "#D3D3D3",
					borderTopWidth: 1,
					borderLeftWidth: 1,
					borderRightWidth: 1,
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.25,
					shadowRadius: 4,
					elevation: 5,
				},

				tabBarBackground: () => (
					<View
						style={{
							shadowOffset: { width: 1, height: 1 },
							shadowColor: "gray",
							shadowRadius: 10,
						}}
					/>
				),
			}}
		>
			<Tab.Screen
				name="home"
				component={HomeScreen}
				options={{
					tabBarLabel: ({ focused }) => (
						<Text
							style={{
								color: focused ? "#387BE5" : "#000000",
								fontSize: 11,
							}}
						>
							হোম
						</Text>
					),
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
								width: "100%",
								// height: "90%",
							}}
						>
							{/* {focused ? <HomeIcon /> : <HomeIcondisable />} */}
                            {focused ? <HomeIcon/> : <HomeIcon/>}
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="newProblem"
				component={HomeScreen}
				options={{
					tabBarLabel: ({ focused }) => (
						<Text
							style={{
								color: focused ? "#387BE5" : "#000000",
								fontSize: 11,
							}}
						>
							নতুন সমস্যা
						</Text>
					),
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
								width: "100%",
								// height: "90%",
							}}
						>
							{/* {focused ? (
								<NewProblemIcon />
							) : (
								<NewProblemIcondis />
							)} */}
                            {focused ? <HomeIcon/> : <HomeIcon/>}
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="allProblems"
				component={HomeScreen}
				options={{
					tabBarLabel: ({ focused }) => (
						<Text
							style={{
								color: focused ? "#387BE5" : "#000000",
								fontSize: 11,
							}}
						>
							সমস্যাসমূহ
						</Text>
					),
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								paddingTop: 2,
								flex: 1,
								alignItems: "center",
								justifyContent: "center",
								width: "100%",
								// height: "90%",
							}}
						>
							{/* {focused ? (
								<ProblemDetailsIcon />
							) : (
								<ProblemDetailsIcondis />
							)} */}
                           {focused ? <HomeIcon/> : <HomeIcon/>}
						</View>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default BottomTabNavigator;