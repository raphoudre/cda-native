import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Alert, Modal, Pressable } from 'react-native';
import { BASE_URL } from "../config";

const StockPage = () =>{

    const [data, setData] = useState([])
    const [loading, setLoading] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [modalData, setModalData] = useState({})

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
                        <Text>HELLOOO !!{modalData._id}</Text>
                        <Text>{modalData.name_d}</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
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
                            <Text style={styles.textState}>Statut : <Text style={item.state == 'En Stock' ? styles.textStateDrone : styles.textStateDroneUnavailable}>{item.state}</Text></Text>
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
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
    }
})

export default StockPage;