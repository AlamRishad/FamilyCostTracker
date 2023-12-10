import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Main from "./AppContainer";
export default function App() {
  return (
    <View style={styles.container}>
			<Main />

			<StatusBar style="auto" />
		</View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
		height: "100%",
  },
});
