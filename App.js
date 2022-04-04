import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScanScreen from './assets/src/pages/Photo';
import DetailsScreen from './assets/src/pages/Details';
import HomeScreen from './assets/src/pages/Home';
import StockPage from './assets/src/pages/Stock';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: true}} name="Home" component={HomeScreen} />
        <Stack.Screen options={{headerShown: true}} name="Scan" component={ScanScreen} />
        <Stack.Screen options={{headerShown: true}} name="Details" component={DetailsScreen} />
        <Stack.Screen options={{headerShown: true}} name="Stock" component={StockPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}