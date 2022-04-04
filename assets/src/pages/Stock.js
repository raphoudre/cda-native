import react from "react";
import {View, Text, StyleSheet, Button, TouchableOpacity, FlatList, ListRenderItemInfo} from 'react-native';

const StockPage = () =>{
    return(
        <View style={styles.container}>
            <Text style={{flex: 1}}>Gestion des stocks</Text>
            <View style={styles.stockListContainer}>
                <FlatList
                    style={{}}
                    data={[{title: "Titre 1", stock: "Yes", key: "item1"},{title: "Titre 2", stock: "No", key: "item2"}]}
                    renderItem={({item, index, separators}) => (
                        <View style={{borderBottomWidth: 1, borderBottomColor: 'black', height: 50, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                            <View
                            key={item.key}
                            style={{
                                flex: 4,
                                backgroundColor: 'purple',
                                justifyContent: 'space-around',
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}
                            >
                                <Text>{item.stock}</Text>
                                <Text>{item.title}</Text>
                                <Text>{item.key}</Text>
                            </View>
                            <TouchableOpacity
                                style={{flex: 1, backgroundColor:'grey'}}
                            />
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
        borderColor: "purple"
    }
})

export default StockPage;