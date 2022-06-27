import { React, useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, ScrollView, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { BASE_URL } from '../config';
import { useAuth } from '../context/AuthContext';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
 
const LoginScreen = () => {
    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const [isLoading, setIsLoading] = useState(false)
    const [_, setUser] = useAuth()

    const handleLogin = () => {
        setIsLoading(true)
        axios({
            method: "POST",
            url: `${BASE_URL}/login`,
            data: {
                email: email,
                password: password
            }
        })
        .then(res => {
            setUser(res.data)
            setIsLoading(false)
        })
        .catch(e => {
            alert(e.message)
            setIsLoading(false)
        })
    }
 
    return (
        <KeyboardAvoidingView style={{flex:1}}>
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <View>
            <Image style={styles.image} source={require("../../assets/img/droneLogo.png")} />

        <Text style={ styles.title }>Connexion Support Technique</Text>
 
        <View style={styles.inputView}>
            <TextInput
            label="Name"
            style={styles.TextInput}
            placeholder="EMAIL"
            placeholderTextColor="#003f5c"
            value={email}
            onChangeText={setEmail}
            iconName="email-outline"
            />
        </View>
 
        <View style={styles.inputView}>
            <TextInput
            label="Name"
            style={styles.TextInput}
            placeholder="MOT DE PASSE"
            placeholderTextColor="#003f5c"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
            />
        </View>
 
        <TouchableOpacity
            style={styles.loginBtn}
            onPress={handleLogin}
            loading={isLoading}>
                <Text style={styles.textBtnLogin}>CONNEXION</Text>
        </TouchableOpacity>

        <Text style={ styles.copyright }>© SKY DRONE 2022</Text>

    </View>
    </ScrollView>
</SafeAreaView>
</KeyboardAvoidingView>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    image: {
        width: 350,
        height: 350,
        marginBottom: 15,
        marginTop: 25,
    },
    inputView: {
        backgroundColor: "#f5f5f5",
        borderRadius: 25,
        width: 350,
        height: 55,
        marginBottom: 35,
        alignItems: "center",
        borderColor: "#20322A",
    },
    TextInput: {
        height: 0,
        flex: 1,
        padding: 0,
        marginLeft: 0,
        letterSpacing: 1,
    },
    loginBtn: {
        alignSelf: "center",
        width: 175,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 0,
        backgroundColor: "#3caae9",
        fontWeight: "bold",
    },
    textBtnLogin: {
        color: '#fff',
        letterSpacing: 1,
        fontSize: 15,
    },
    title: {
        marginBottom: 30,
        padding: 10,
        borderRadius: 15,
        color: "#3caae9",
        letterSpacing: 2,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    copyright: {
        paddingTop: 75,
        fontSize: 10,
        alignSelf: "center",
    },
});