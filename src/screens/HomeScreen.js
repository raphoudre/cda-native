import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

 
const HomeScreen = ({ navigation }) => {

    const Stack = createNativeStackNavigator();

    const [user] = useAuth()

    const goToScan = () => {
        navigation.navigate('Scan', {
            screen: "Photo",
        })
    }

    const goToStock = () => {
        navigation.navigate('Stock', {
            screen: "Stock",
        })
    }

    const logout = () => {
        navigation.navigate('Login', {
            screen: "LoginScreen",
        })
    }
 
    return (
        <View style={styles.container}>
        <Text style={ styles.title }>SKY DRONE - ACCUEIL</Text>
        <Text style={ styles.welcolmeUser }>Bienvenue {user.user.firstName_u} {user.user.lastName_u}</Text>

        <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={goToScan}
            underlayColor='#fff'>
            <Text style={styles.textBtn}>scanner un drone</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={goToStock}
            underlayColor='#fff'>
            <Text style={styles.textBtn}>voir le stock</Text>
        </TouchableOpacity>
        


        {/* <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={goToDetails}
            underlayColor='#fff'>
            <Text style={styles.textBtn}>détails</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
            style={styles.logoutScreenButton}
            onPress={logout}
            underlayColor='#fff'>
            <Text style={styles.textBtn}>déconnexion</Text>
        </TouchableOpacity>

        <Text style={ styles.copyright }>© SKY DRONE 2022</Text>
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
    title: {
        marginBottom: 20,
        marginTop: 20,
        padding: 10,
        borderRadius: 15,
        color: "#3caae9",
        letterSpacing: 2,
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
    },
    welcolmeUser:{
        marginBottom: 20,
        marginTop: 10,
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
    styleBtn:{
        padding: 10,
        marginTop: 25,
        marginBottom: 25,
        backgroundColor:'#3caae9',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#3caae9',
    },
    loginScreenButton:{
        padding: 15,
        marginTop: 25,
        marginBottom: 25,
        backgroundColor:'#3caae9',
        borderRadius:20,
        borderWidth: 1,
        borderColor: '#3caae9'
    },
    logoutScreenButton:{
        padding: 15,
        marginTop: 25,
        marginBottom: 25,
        backgroundColor:'#e5181d',
        borderRadius:20,
        borderWidth: 1,
        borderColor: '#e5181d'
    },
    textBtn:{
        color:'#fff',
        textAlign:'center',
        textTransform: 'uppercase',
        letterSpacing: 1,
    }
});