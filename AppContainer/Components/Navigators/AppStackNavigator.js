import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CardStyleInterpolators } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "../../Screens/LoginScreen";
import BottomTabNavigator from "./BottomTabNavigator";



const Stack = createNativeStackNavigator();
export default function AppStackNavigator() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: true,
				gestureDirection: "horizontal",
				
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
			}}
		>
			
			
			<Stack.Screen
				name="LoginScreen"
				component={LoginScreen}
			/>
			<Stack.Screen
				name="MainApp"
				component={BottomTabNavigator}
			/>
			
		</Stack.Navigator>
	);
}