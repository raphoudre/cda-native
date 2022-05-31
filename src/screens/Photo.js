import React, {useEffect, useState, useCallback } from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, Linking } from 'react-native';
// import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { BASE_URL } from '../config';

const ScanScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState('Not Yet Scanned');
    const [drone, setDrone] = useState({})

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted')
        })()
    }

    // Request Camera Permission
    useEffect(() => {
        askForCameraPermission();
    }, []);

    // When We Scan QR Code
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data);
        console.log('Type:' + type + '\nData:' + data);
        fetch(data)
        .then((response) => response.json())
        .then((json) => setDrone(json))
         console.log(drone)
    }

    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
            // Checking if the link is supported for links with custom URL scheme.
            const supported = await Linking.canOpenURL(url);

            if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`)
            }
        }, [url]);
      
        return <Button title={children} onPress={handlePress} />
    }

    // Check permission and return Screens
    if( hasPermission === null){
        return(
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        )
    }

    if(hasPermission === false){
        <View style={styles.container}>
            <Text style={{margin: 10}}>No Access to Camera</Text>
            <Button title={'Allow Camera'} onPress={() => askForCameraPermission()}></Button>
        </View>
    }

    // Return the view
    return(
    <View style={styles.container}>
        <Text style={ styles.title }>SKY <Text style={ styles.titleBlack }>DR</Text>O<Text style={ styles.titleBlack }>NE</Text></Text>
        <View style={styles.barcodebox}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: 400, width: 400}}/>
        </View>

        <Text style={ styles.textNameDrone }>{drone.name_d}</Text>
        <Text style={ styles.textStateDrone }>État actuel : {drone.state}</Text>

        <TouchableOpacity
            style={styles.logoutScreenButton}>
            {scanned && <Button title={'SCANNER AUTRE DRONE'} onPress={() => setScanned(false)} style={styles.btnScan} color={'white'}></Button>}
        </TouchableOpacity>

    </View>
    )
    
}

export default ScanScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        marginBottom: 20,
        marginTop: 20,
        padding: 10,
        borderRadius: 15,
        color: "#3caae9",
        letterSpacing: 2,
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
    },
    textNameDrone:{
        padding: 5,
        letterSpacing: 1,
        fontSize: 20,
        textAlign: "center",
    },
    textStateDrone:{
        padding: 5,
        letterSpacing: 1,
        fontSize: 15,
        textAlign: "center",
    },
    titleBlack:{
        color: 'black'
    },
    barcodebox:{
        paddingBottom: 50,
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        borderRadius: 25
    },
    maintext:{
        marginTop: 0,
        fontSize: 20,
        margin: 20,
        alignSelf: 'center'
    },
    logoutScreenButton: {
        alignSelf: "center",
        width: 375,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        backgroundColor: "#3caae9",
        fontWeight: "bold",
        marginTop: 25
    },
    btnScan: {
        letterSpacing: 1,
        fontSize: 15,
    }
    });