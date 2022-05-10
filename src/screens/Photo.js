import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, SafeAreaView} from 'react-native';
import { Camera } from 'expo-camera';



const ScanScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>
                    SCANNER UN DRONE
                </Text>
                <Button title="Go back" onPress={() => navigation.goBack()} />
            </View>
            <Camera style={styles.camera} type={type}>
                <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                    }}>
                    {/* <Text style={styles.text}> Flip </Text> */}
                </TouchableOpacity>
                </View>
            </Camera>
            <View style={styles.buttonContainerDo}>
                <TouchableOpacity
                    style={styles.buttonDo}
                    onPress={() => {
                    
                    
                    }}>
                    <Text style={styles.text}> Signaler un incident </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.buttonDo}
                    onPress={() => {
                    
                    }}>
                    <Text style={styles.text}> Rentrer manuellement </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ScanScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 9,
    },
    title: {
        marginBottom: 10,
        marginTop: 10,
        padding: 10,
        borderRadius: 15,
        color: "#3caae9",
        letterSpacing: 2,
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        textTransform: 'uppercase'
    },
    titleContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    buttonContainerDo: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    buttonDo:{
        flex: 1,
        color: "white",
        backgroundColor: "transparent",
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: "center",
        textAlign: 'center'
    },
    text: {
        fontSize: 18,
        color: 'white',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    });