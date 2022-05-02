import react, {useState, useEffect} from "react";
import {View, Text, StyleSheet, Button, TouchableOpacity, FlatList, ListRenderItemInfo} from 'react-native';
import { baseUrl } from "../../../server/utils/fetchApi";

const StockPage = () =>{

    const [drones, setDrones] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${baseUrl}/drones`);
            const json = await data.json()
            setDrones(json)
        }
        fetchData()

    }, [])
    console.log(drones);
    return(
        <View style={styles.container}>
            <Text style={{flex: 1, textAlign: "center", fontWeight: "bold", textTransform: "uppercase"}}>Gestion des stocks</Text>
            <View style={styles.stockListContainer}>
                <FlatList
                    style={{}}
                    data={drones}
                    renderItem={({item, index, separators}) => (
                        <View 
                            key={index}
                            style={{borderBottomWidth: 1, borderBottomColor: 'black', height: 50, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <View
                            key={item._id}
                            style={{
                                flex: 4,
                                backgroundColor: 'white',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}
                            >
                                <Text style={{textTransform: 'uppercase'}}>{item.name_d}</Text>
                                <Text>ETAT</Text>
                            </View>
                            <TouchableOpacity
                                style={{flex: 1, backgroundColor:'grey'}}
                            >
                                <Text>Changer l'état</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        flexDirection: 'column'
    },
    stockListContainer:{
        flex: 9,
        backgroundColor: "black",
        textTransform: "uppercase"
    }
})

export default StockPage;