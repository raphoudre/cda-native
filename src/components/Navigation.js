import React, {useContext} from 'react'
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { AuthContext } from '../context/AuthContext';
import DetailsScreen from '../screens/Details';
import StockPage from '../screens/Stock';
import ScanScreen from '../screens/Photo';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const {userInfo} = useContext(AuthContext)

    return (
    <NavigationContainer>
        <Stack.Navigator>
            
                <Stack.Screen options={{headerShown: true}} name="Login" component={LoginScreen} />
                <Stack.Screen options={{headerShown: true}} name="Home" component={HomeScreen} />
                <Stack.Screen options={{headerShown: true}} name="Details" component={DetailsScreen} />
                <Stack.Screen options={{headerShown: true}} name="Stock" component={StockPage} />
                <Stack.Screen options={{headerShown: true}} name="Scan" component={ScanScreen} />
        
        </Stack.Navigator>
    </NavigationContainer>
    )
}

export default Navigation;