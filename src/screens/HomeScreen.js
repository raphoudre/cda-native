import { Text, View, StyleSheet, Button, TouchableOpacity, Image } from "react-native";
import { useAuth } from "../context/AuthContext";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";

 
const HomeScreen = ({ navigation }) => {

    const Stack = createNativeStackNavigator();
    const [user, setUser] = useAuth()

    const goToScan = () => {
        navigation.navigate('Drone SCAN', {
            screen: "Photo",
        })
    }

    const goToStock = () => {
        navigation.navigate('STOCK', {
            screen: "Stock",
        })
    }

    const logout = () => {
        setUser(null);
    }

    return (
        <View style={styles.container}>
        <Text style={ styles.titleSky }>SKY <Text style={ styles.titleBlack }>DR</Text>O<Text style={ styles.titleBlack }>NE</Text></Text>
        <Text style={ styles.welcolmeUser }>Bienvenue {user.user.firstName_u} {user.user.lastName_u} !</Text>
        
        <View style={styles.containerBtn}>
            <TouchableOpacity
                style={styles.loginScreenButton}
                onPress={goToScan}
                underlayColor='#fff'>
                <Image style={styles.imagestyle} source={require('../../assets/img/newImgLogo.png')} />
                <Text style={styles.textBtn}>scanner un drone</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.loginScreenButton}
                onPress={goToStock}
                underlayColor='#fff'>
                <Image style={styles.imagestyle} source={require('../../assets/img/gestionTravelbook.png')} />
                <Text style={styles.textBtn}>voir le stock</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity
            style={styles.logoutScreenButton}
            onPress={logout}
            underlayColor='#fff'>
            <Text style={styles.textBtnLogout}>se déconnecter</Text>
        </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    containerBtn:{
        flexDirection: "column"
    },
    imagestyle:{
        width: 85,
        height: 85,
        alignSelf: "center",
    },
    titleSky: {
        marginBottom: 20,
        marginTop: 10,
        padding: 10,
        color: "#3caae9",
        letterSpacing: 2,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
    },
    titleBlack:{
        color: 'black'
    },
    welcolmeUser:{
        marginBottom: 20,
        marginTop: 10,
        padding: 10,
        color: "#3caae9",
        letterSpacing: 2,
        textAlign: "center",
        fontSize: 20,
    },
    styleBtn:{
        padding: 10,
        marginTop: 25,
        marginBottom: 25,
        backgroundColor:'#3caae9',
        borderWidth: 1,
    },
    loginScreenButton:{
        padding: 30,
        marginTop: 25,
        marginBottom: 25,
        borderRadius:20,
        borderWidth: 1,
    },
    logoutScreenButton:{
        padding: 10,
        marginTop: 25,
        marginBottom: 5,
        backgroundColor:'#e5181d',
        borderRadius:20,
        borderWidth: 1,
        borderColor: '#e5181d',
    },
    textBtn:{
        textAlign:'center',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginTop: 20
    },
    textBtnLogout:{
        textAlign:'center',
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontSize: 12
    }
});