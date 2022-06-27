import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../context/AuthContext";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import DetailsScreen from "../screens/Details";
import StockPage from "../screens/Stock";
import ScanScreen from "../screens/Photo";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

const tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const Navigator = () => {

    const [user] = useAuth()
    console.log(user);

    if(!user){
        return(
            <Stack.Navigator screenOptions={{ headerShown: false}}>
			    <Stack.Screen name="Login" component={LoginScreen} />
		    </Stack.Navigator>
        )
    }

	return(
        <>
        <tab.Navigator
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
            return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#3caae9',
            tabBarInactiveTintColor: 'gray',
            })}
        >
            <tab.Screen name="Accueil" component={HomeScreen} />
            <tab.Screen name="Scanner Drone" component={ScanScreen} />
            <tab.Screen name="Stock" component={StockPage} />
        </tab.Navigator>
        </>
	)
}

export default Navigator;