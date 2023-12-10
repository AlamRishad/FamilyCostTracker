import { NavigationContainer } from "@react-navigation/native";
import { Dimensions, View } from "react-native";
import AppStackNavigator from "./Components/Navigators/AppStackNavigator";
const windowHeight = Dimensions.get("window").height;

export default function Index() {

	

	return (
		<View  style={{ height: windowHeight + 30 }}>
			
			
				<NavigationContainer>

						<AppStackNavigator />
					
					
				</NavigationContainer>
			
		</View>
	);
}