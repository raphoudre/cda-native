import React, { useContext } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Navigation from "../components/Navigation";
 
const HomeScreen = ({ navigation }) => {
    const {userInfo, isLoading} = useContext(AuthContext)

    const goToDetails = () => {
        navigation.navigate('Details', {
            screen: "DetailsScreen",
        })
    }

    const goToStock = () => {
        navigation.navigate('Stock', {
            screen: "Stock",
        })
    }

    const goToScan = () => {
        navigation.navigate('Scan', {
            screen: "Photo",
        })
    }

    const logout = () => {
        navigation.navigate('Login', {
            screen: "LoginScreen",
        })
    }
 
    return (
    <View style={styles.container}>
        <Spinner visible={isLoading} />
        <Text style={ styles.title }>HOME PAGE</Text>
        <Text style={ styles.title }>Bienvenue {userInfo.user.firstName_u} {userInfo.user.lastName_u}</Text>
        <Button
            title="Go to Details"
            onPress={goToDetails}
        />
        <Button
            title="Go to Stock"
            onPress={goToStock}
        />
        <Button
            title="Go to Scan"
            onPress={goToScan}
        />
        <Button
            color='red'
            title="LOGOUT"
            onPress={logout}
        />
        <Text style={ styles.copyright }>© SKY DRONE 2022</Text>
    </View>
  );
}

export default HomeScreen;
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    title: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 15,
        color: "#3caae9",
        letterSpacing: 2,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    copyright: {
        paddingTop: 45,
        fontSize: 10,
    },
});