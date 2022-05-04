import React, {useState, useContext} from 'react'
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, ActivityIndicator} from "react-native";
import { AuthContext } from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const {isLoading, login} = useContext(AuthContext)

    return (
        <View style={styles.container}>
        <Spinner visible={isLoading} />
        <Image style={styles.image} source={require("../../assets/img/droneLogo.png")} />

        <Button
            color='red'
            title="ACCESS WITHOUT CONNEXION"
            onPress={() => {
                navigation.navigate('Home');
            }}
        />

        <Text style={ styles.title }>Connexion Support Technique</Text>
 
        <StatusBar style="auto" />
        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="EMAIL"
            placeholderTextColor="#003f5c"
            value={email}
            onChangeText={text => setEmail(text)}
            />
        </View>
 
        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="MOT DE PASSE"
            placeholderTextColor="#003f5c"
            value={password}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            />
        </View>
 
        <TouchableOpacity style={styles.loginBtn}>
            <Button
                style={styles.loginText}
                title="CONNEXION"
                onPress={() => {
                    login(email, password)
            }}
            />
        </TouchableOpacity>

        <Text style={ styles.copyright }>© SKY DRONE 2022</Text>

    </View>
    )
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
        marginBottom: 25,
        marginTop: 25,
    },
    inputView: {
        backgroundColor: "#f5f5f5",
        borderRadius: 25,
        width: "70%",
        height: 55,
        marginBottom: 25,
        alignItems: "center",
    },
    TextInput: {
        height: 0,
        flex: 1,
        padding: 0,
        marginLeft: 0,
        letterSpacing: 1,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        backgroundColor: "#3caae9",
        fontWeight: "bold",
    },
    title: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 15,
        color: "#3caae9",
        letterSpacing: 2,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
    },
    copyright: {
        paddingTop: 45,
        fontSize: 10,
    },
    errorMsg:{
    }
});