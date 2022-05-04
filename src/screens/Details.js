import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, SafeAreaView} from 'react-native';
import { Camera } from 'expo-camera';

const DetailsScreen = ({ route, navigation }) => {
    /* 2. Get the param */
    const { itemId } = route.params;
    const { otherParam } = route.params;
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>otherParam: {JSON.stringify(otherParam)}</Text>
            <Button
                title="Go to Details... again"
                onPress={() =>
                navigation.push('Details', {
                    itemId: Math.floor(Math.random() * 100),
                    otherParam: 'Ce que je veux encore et ça c\'est vraiment impressionnant',
                })
                }
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
                <Button title="Go to Param 76" onPress={()=> navigation.push('Details', {
                    itemId: 76,
                    })
                }/>
        </View>
    );
}

export default DetailsScreen;