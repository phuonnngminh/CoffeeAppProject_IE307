import { StyleSheet, Text, View, KeyboardAvoidingView, SafeAreaView, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { useNavigation } from "@react-navigation/core";
import { ChevronLeftIcon} from "react-native-heroicons/outline";
import { fetchUserLogin, fetchUserData } from '../api/api';
import { AuthContext } from '../constants/AuthContext';
import { decode, encode } from 'base-64';
import { jwtDecode } from 'jwt-decode';


global.atob = decode;

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isFocused, setFocused] = useState(false);
  const [username, setUsername] = useState('johnd');//defaut for testing purposes
  const [password, setPassword] = useState('m38rmF$');//defaut for testing purposes
  const {token, setToken, userData, setUserData} = useContext(AuthContext);


  useEffect(()=>{
    //precheck login
    console.log("token: ", token);
    console.log("userData: ", userData);
    console.log("username: ", username)
    console.log("password: ", password)
  })

  const handleLogin = () => {
    console.log("inside handleLogin!")
    fetchUserLogin({username, password})
      .then((res) =>{
        Keyboard.dismiss();
        setToken(res.token);
        //Ham luu token vao db
        const decodedToken = jwtDecode(res.token);
        fetchUserData(decodedToken.sub)
          .then((userData) => {
            console.log("user data: ",userData)
            setUserData(userData);
          })
          .catch((error) => {
            console.error("error when fetching user data: ",error)
          });
      })
      .catch((error)=> {
        console.error("login error: ",error);
        alert(
          "Login failed",
          "Incorrect username or password. Please try again"
        );
      });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>

      <SafeAreaView className="space-y-4 flex-1 ">
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconContainer}
          >
            <ChevronLeftIcon size={30} strokeWidth={2} color="#ba826a" />
          </TouchableOpacity>
          <Text style={styles.Logintitle}>Login</Text>
        </View>

        <Text style={styles.Title}>Welcome back!</Text>

        <View style={styles.textInputcontainer}>
          <Text style={{color:'gray', padding: 10, fontSize: 13}}>Username</Text>
          <TextInput
            style={[styles.textInput, isFocused && styles.focusedTextInput]}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.textInputcontainer}>
          <Text style={{color:'gray', padding: 10, fontSize: 13}}>Password</Text>
          <TextInput
            style={[styles.textInput, isFocused && styles.focusedTextInput]}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>
        
        <TouchableOpacity style={styles.custombutton} onPress={handleLogin}>
          <Text style={styles.buttonTitle}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.SignupLineContainer}>
            <Text>Don't have an account?</Text>
            <TouchableOpacity>
                <Text style={styles.SignupHereText}> Register!</Text>
            </TouchableOpacity>
        </View>

      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  headerContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 10,
  },  
  Logintitle:{
    fontWeight: 'bold',
    fontSize: 20,
    color: "#ba826a",
    
  },
  iconContainer: {
    marginRight: 130,
  },
  Title:{
    fontWeight: 'bold',
    fontSize: 35,
    color: "#ba826a",
    marginLeft: 40,
    paddingTop: 30,
    marginBottom: 50,
  },
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#fcfcfe', 
    padding: 8,
    height: 40,
  },
  focusedTextInput: {
    borderBottomColor: '#ba826a',
  },
  textInputcontainer:{
    width: 350,
    alignSelf: 'center',
    marginVertical: 20,
  },
  custombutton:{
    borderWidth: 2,
    width: "90%",
    borderColor: "#eadcd3",
    borderRadius: 30,
    padding: 15,
    alignSelf: 'center',
    backgroundColor: "#ba826a",
    marginVertical: 20,
    
  },
  buttonTitle:{
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  SignupLineContainer:{
    flexDirection: 'row',
    margin: 5,
    alignSelf: 'center',
  },
  SignupHereText:{
    color: "#ba826a",
    fontWeight: 'bold',
  },  
})