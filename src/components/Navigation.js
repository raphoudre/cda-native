import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import DetailsScreen from "../screens/Details";
import StockPage from "../screens/Stock";
import ScanScreen from "../screens/Photo";

const Stack = createNativeStackNavigator()

const Navigator = () => {

    const [user] = useAuth()

    if(!user){
        return(
            <Stack.Navigator screenOptions={{ headerShown: false}}>
			    <Stack.Screen name="Login" component={LoginScreen} />
		    </Stack.Navigator>
        )
    }

	return(
		<Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="Stock" component={StockPage} />
            <Stack.Screen name="Scan" component={ScanScreen} />
		</Stack.Navigator>
	)
}

export default Navigator;