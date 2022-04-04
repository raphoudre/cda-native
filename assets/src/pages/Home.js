import react from "react";
import {View, Text, StyleSheet, Button, TouchableOpacity, SafeAreaView} from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>
                <Text style={styles.colorCompany}>Sky</Text>'Dr<Text style={styles.colorCompany}>o</Text>nes
            </Text>
            <Button
            title="Details"
            onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate('Details', {
                itemId: 86,
                otherParam: 'anything you want here',
                });
            }}
            />
            <Button
            title="Gestion du stock"
            onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate('Stock', {
                itemId: 86,
                otherParam: 'anything you want here',
                });
            }}
            />
            <Button
            title="Scanner un drone"
            onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate('Scan', {
                itemId: 666,
                otherParam: 'Connect here',
                });
            }}
            />
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#eaeaea"
    },
    colorCompany: {
        color: "#3caae9"
    },
    title: {
        marginTop: 16,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#055",
        color: "#fff",
        letterSpacing: 2,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
        textTransform: "uppercase"
    }
});