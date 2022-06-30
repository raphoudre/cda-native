import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ScanScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [urlScanned, setUrlScanned] = useState({});
    const [drone, setDrone] = useState({})
    const [tempState, setTempState] = useState()
    const [message, setMessage] = useState('')
    const [user] = useAuth()

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
    const checkIfTempState = (display) =>{
        if (tempState != null) {
            return tempState;
        } else {
            return display;
        }
    } 

    // When We Scan QR Code
    const handleBarCodeScanned = ({ type, data }) => {
        if(tempState != null) setTempState(null);
        setScanned(true);
        setUrlScanned(data);
        console.log('Type:' + type + '\nData:' + data);
        fetch(data)
            .then((response) => response.json())
            .then((json) => setDrone(json))
    }

    const patchDroneToStock = async () => {
        const response = await fetch(urlScanned, {
            method: 'PATCH',
            body: JSON.stringify({
                state: 'En Stock',
            }),
            headers: {
                'content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
        setTempState('En Stock');
    }

    const patchDroneToSAV = async () => {
        const response = await fetch(urlScanned, {
            method: 'PATCH',
            body: JSON.stringify({
                state: 'SAV',
            }),
            headers: {
                'content-type': 'application/json; charset=UTF-8',
                'Authorization': `Bearer ${user.token}`
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json))
        setTempState('SAV');
    }

    // Check permission and return Screens
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        )
    }

    if (hasPermission === false) {
        <View style={styles.container}>
            <Text style={{ margin: 10 }}>No Access to Camera</Text>
            <Button title={'Allow Camera'} onPress={() => askForCameraPermission()}></Button>
        </View>
    }

    // Return the view
    return (
        <View style={styles.container}>
            <Text style={styles.titleSky}>SKY <Text style={styles.titleBlack}>DR</Text>O<Text style={styles.titleBlack}>NE</Text></Text>
            <View style={styles.barcodebox}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 350, width: 400 }} />
            </View>

            {drone.state ?
                <>
                    <Text style={styles.textNameDrone}>{drone.name_d}</Text>
                    <Text style={styles.textState}>État du drone : <Text style={checkIfTempState(drone.state) == 'En Stock' ? styles.textStateDrone : styles.textStateDroneUnavailable && drone.state == 'En Location' ? styles.textStateDroneResa : styles.textStateDroneUnavailable}>{checkIfTempState(drone.state)}</Text></Text>

                    <View style={styles.containerBtn}>
                        {checkIfTempState(drone.state) == 'En Stock' ?
                            <TouchableOpacity
                                style={styles.btnGoToSAV}
                                onPress={patchDroneToSAV}
                                underlayColor='#fff'>
                                <Text style={styles.textBtnGoTo} color={'white'} >Entrée au SAV</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity disabled
                                style={styles.btnGoToStock}
                                onPress={patchDroneToStock}
                                underlayColor='#fff'>
                                <Text style={styles.textBtnGoTo}>Entrée en stock</Text>
                            </TouchableOpacity>
                            &&
                                drone.state == 'En Location' ?
                                null
                                :
                                <TouchableOpacity
                                style={styles.btnGoToStock}
                                onPress={patchDroneToStock}
                                underlayColor='#fff'>
                                <Text style={styles.textBtnGoTo}>Entrée en stock</Text>
                            </TouchableOpacity>
                        }</View>

                    <TouchableOpacity
                        style={styles.btnScanNewItem}>
                        {scanned && <Button title={'SCANNER UN AUTRE DRONE'} onPress={() => setScanned(false)} color={'white'}></Button>}
                    </TouchableOpacity>


                </>
                :
                <Text style={styles.textApprocheQRCode}>Approchez un QR Code</Text>

            }
        </View>
    )

}

export default ScanScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleSky: {
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
        borderRadius: 15,
        color: "#3caae9",
        letterSpacing: 2,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
    },
    titleBlack: {
        color: 'black'
    },
    containerBtn: {
        // flexDirection: "row",
        alignSelf: "center"
    },
    btnGoToStock: {
        alignSelf: "center",
        padding: 10,
        margin: 10,
        marginRight: 25,
        borderRadius: 5,
        backgroundColor: "forestgreen",
    },
    btnGoToSAV: {
        alignSelf: "center",
        padding: 10,
        margin: 10,
        borderRadius: 5,
        backgroundColor: "firebrick",
    },
    textBtnGoTo: {
        color: "white",
        letterSpacing: 1,
        fontWeight: "bold"
    },
    textStateDrone: {
        padding: 10,
        letterSpacing: 1,
        fontSize: 15,
        textAlign: "center",
        color: "#32cd32",
        fontWeight: "bold"
    },
    textStateDroneUnavailable: {
        color: '#dc143c',
        padding: 10,
        letterSpacing: 1,
        fontSize: 15,
        textAlign: "center",
        fontWeight: "bold"
    },
    textStateDroneResa:{
        color: '#ff8c00',
        padding: 10,
        letterSpacing: 1,
        fontSize: 14,
        textAlign: "center",
        fontWeight: "bold"
    },
    textState:{
        padding: 10,
        letterSpacing: 1,
        fontSize: 15,
        textAlign: "center",
        fontWeight: "bold"
    },
    textNameDrone: {
        padding: 5,
        letterSpacing: 1,
        fontSize: 20,
        textAlign: "center",
        textTransform: "uppercase",
        fontWeight: "bold"
    },
    textApprocheQRCode:{
        marginTop: 50,
        padding: 5,
        letterSpacing: 1,
        fontSize: 25,
        textAlign: "center",
        textTransform: "uppercase",
        fontWeight: "bold"
    },
    barcodebox: {
        paddingBottom: 10,
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
        borderRadius: 25
    },
    maintext: {
        marginTop: 0,
        fontSize: 20,
        margin: 20,
        alignSelf: 'center'
    },
    btnScanNewItem: {
        alignSelf: "center",
        width: 375,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        backgroundColor: "#3caae9",
        fontWeight: "bold",
        marginTop: 30
    }
});