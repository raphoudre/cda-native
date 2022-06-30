import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Modal, Pressable, TouchableOpacity } from 'react-native';
import { BASE_URL } from "../config";
import { useAuth } from "../context/AuthContext";

const StockPage = () =>{

    const [data, setData] = useState([])
    const [loading, setLoading] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [modalData, setModalData] = useState({})
    const [user] = useAuth()

    useEffect(() => {
        fetch(`${BASE_URL}/drones`)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    }, [])

    const setModal = (item) => {
        setModalData(item);
        setModalVisible(true);
    }

    const patchDroneToStock = async () => {
        const response = await fetch(`${BASE_URL}/drones/${modalData._id}`, {
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
        const response = await fetch(`${BASE_URL}/drones/${modalData._id}`, {
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
        setTempState('En SAV');
    }
    
    return(
        <>
        <View style={styles.container}>
            <Text style={ styles.titleSky }>SKY <Text style={ styles.titleBlack }>DR</Text>O<Text style={ styles.titleBlack }>NE</Text></Text>
            <Text style={ styles.titleStock }>aperçu du stock</Text>
                
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.textDroneNameModal}>{modalData.name_d}</Text>
                        <Text style={styles.textState}>Statut : <Text style={modalData.state == 'En Stock' ? styles.textStateDrone : styles.textStateDroneUnavailable && modalData.state == 'En Location' ? styles.textStateDroneResa : styles.textStateDroneUnavailable}>{modalData.state}</Text></Text>
                        
                        {modalData.state ?
                        <>
                        <View style={styles.containerBtn}>
                            {modalData.state == 'En Stock' ?
                                <Pressable
                                    style={[styles.button, styles.buttonToSAV]}
                                    onPress={patchDroneToSAV}>
                                    <Text style={styles.textStyle}>Entrée au SAV</Text>
                                </Pressable>
                            :
                                <Pressable
                                    style={[styles.button, styles.buttonToStock]}
                                    onPress={patchDroneToSAV}>
                                    <Text style={styles.textStyle}>Entrée en stock</Text>
                                </Pressable>
                            &&
                            modalData.state == 'En Location' ?
                                null
                            :
                                <Pressable 
                                    style={[styles.button, styles.buttonToStock]}
                                    onPress={patchDroneToSAV}>
                                <Text style={styles.textStyle}>Entrée en stock</Text>
                                </Pressable>
                                
                            }   
                        </View>
                        </>
                        :
                            null
                        }
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>FERMER</Text>
                            </Pressable>
                    </View>
                </View>
            </Modal>

            <FlatList
                style={styles.cell}
                data={data}
                keyExtractor={(data) => data.id}
                renderItem={({ item }) =>
                    <View style={styles.card}>
                        {console.log(item)}
                        <Pressable
                            onPress={() => setModal(item)}
                        >
                            <Text style={styles.textDroneName}>{item.name_d}</Text>
                            <Text style={styles.textState}>Statut : <Text style={item.state == 'En Stock' ? styles.textStateDrone : styles.textStateDroneUnavailable && item.state == 'En Location' ? styles.textStateDroneResa : styles.textStateDroneUnavailable}>{item.state}</Text></Text>
                        </Pressable>
                    </View>
                }
            />
        </View>

        {/* <View style={styles.container}>
            <Text style={ styles.titleSky }>SKY <Text style={ styles.titleBlack }>DR</Text>O<Text style={ styles.titleBlack }>NE</Text></Text>
            <Text style={ styles.titleStock }>aperçu du stock</Text>
            

            <FlatList
                style={styles.cell}
                data={data}
                keyExtractor={(data) => data.id}
                renderItem={({ item }) => 
                <View style={styles.card}>
                    <Text style={styles.textDroneName}>{item.name_d}</Text>
                    <Text style={styles.textState}>Statut : <Text style={item.state == 'En Stock' ? styles.textStateDrone : styles.textStateDroneUnavailable}>{item.state}</Text></Text>
                </View>
            }
            />
        </View> */}
        </>
    );
}

const styles = StyleSheet.create({
    containerBtn:{
        display: "flex",
        flexDirection: "row"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius:20,
        padding: 60,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        marginTop: 30,
        elevation: 2,
      },
      buttonClose: {
        backgroundColor: "#3caae9",
      },
      buttonToSAV:{
        backgroundColor: "firebrick",
      },
      buttonToStock:{
        backgroundColor: "forestgreen",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        textTransform: 'uppercase',
        letterSpacing: 1
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    cell:{
        width: 425,
    },
    titleStock:{
        marginBottom: 20,
        marginTop: 5,
        padding: 10,
        borderRadius: 15,
        color: "#3caae9",
        letterSpacing: 2,
        textAlign: "center",
        fontSize: 18,
        textTransform: "uppercase"
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
    textStateDrone: {
        padding: 10,
        letterSpacing: 1,
        fontSize: 14,
        textAlign: "center",
        color: "#32cd32",
        fontWeight: "bold"
    },
    textStateDroneUnavailable: {
        color: '#dc143c',
        padding: 10,
        letterSpacing: 1,
        fontSize: 14,
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
        fontSize: 14,
        textAlign: "center",
    },
    card:{
        padding: 25,
        margin: 20,
        borderRadius:20,
        borderWidth: 1,
    },
    listWrapper:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: 1,
    },
    text:{
        flex: 1,
        fontSize: 14,
        textAlign: 'center',
        textTransform: 'capitalize',
        padding: 10,

    },
    textDroneName:{
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        padding: 10,
    },
    textDroneNameModal:{
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
        //padding: 10,
    },
    title: {
        marginBottom: 20,
        marginTop: 20,
        padding: 10,
        borderRadius: 15,
        color: "#3caae9",
        letterSpacing: 2,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        textTransform: 'uppercase'
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
    }
})

export default StockPage;