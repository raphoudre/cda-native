import React, { useState, useEffect } from "react";
import {View, Text, StyleSheet, Button, TouchableOpacity, FlatList, ListRenderItemInfo} from 'react-native';
import { BASE_URL } from "../config";

const StockPage = ({ navigation }) =>{

    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}/drones`)
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false))
    }, [])

    return(
        <View style={styles.container}>
            <Text style={ styles.title }>aperçu du stock</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />

            <FlatList
                style={styles.scroll}
                data={data}
                // keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => 
                <View style={styles.card}>
                    <Text style={styles.textDroneName}>{item.name_d}</Text>
                    <Text style={styles.text}>Statut : {item.state}</Text>
                </View>
            }
            />
            
            <Text style={ styles.copyright }>© SKY DRONE 2022</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
    },
    scroll:{
        width: 400,
    },
    card:{
        borderColor: "#e0e0e0",
        padding: 25,
        backgroundColor: '#3caae9',
        shadowOpacity: 1,
        shadowOffset: { widht: 50, height: 1},
        shadowRadius: 2,
        borderRadius: 0,
        margin: 20,
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
        color: '#fff'

    },
    textDroneName:{
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'capitalize',
        padding: 10,
        color: '#fff',
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
    copyright: {
        paddingTop: 45,
        paddingBottom: 45,
        fontSize: 10,
    },
})

export default StockPage;