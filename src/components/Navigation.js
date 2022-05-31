import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
// import DetailsScreen from "../screens/Details";
import StockPage from "../screens/Stock";
import ScanScreen from "../screens/Photo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

const Stack = createBottomTabNavigator()
const tab = createNativeStackNavigator()

const Navigator = () => {

    const [user] = useAuth()
    console.log(user);

    if(!user){
        return(
            <tab.Navigator screenOptions={{ headerShown: false}}>
			    <tab.Screen name="Login" component={LoginScreen} />
		    </tab.Navigator>
        )
    }

	return(
		// <Stack.Navigator>
        //     <Stack.Screen name="Home" component={HomeScreen} />
        //     <Stack.Screen name="Details" component={DetailsScreen} />
        //     <Stack.Screen name="Stock" component={StockPage} />
        //     <Stack.Screen name="Scan" component={ScanScreen} />
		// </Stack.Navigator>

        <Stack.Navigator
        screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Accueil') {
            iconName = focused ? 'md-home' : 'md-home-outline';
            } else if (route.name === 'Stock') {
            iconName = focused ? 'analytics' : 'analytics-outline';
            } else if (route.name === 'Scanner Drone') {
                iconName = focused ? 'ios-camera' : 'ios-camera-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3caae9',
        tabBarInactiveTintColor: 'gray',
        })}
        >
        <Stack.Screen name="Accueil" component={HomeScreen} />
        <Stack.Screen name="Scanner Drone" component={ScanScreen} />
        <Stack.Screen name="Stock" component={StockPage} />
        </Stack.Navigator>
	)
}

export default Navigator;