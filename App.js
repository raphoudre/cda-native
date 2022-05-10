import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Navigator from "./src/components/Navigation";
import AuthProvider from "./src/context/AuthContext";

const App = () => {
	return(
		<NavigationContainer>
			<AuthProvider>
				<Navigator />
			</AuthProvider>
		</NavigationContainer>
	)
}

export default App;