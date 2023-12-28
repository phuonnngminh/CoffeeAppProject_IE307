import { StyleSheet, Text, View, Dimensions, Image, Button, TouchableOpacity } from 'react-native'
import Carousel from "react-native-snap-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { banners } from '../constants';
import { useNavigation } from '@react-navigation/core';
import React from 'react'
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get("window");

const AuthScreen = () => {
  const navigation = useNavigation();
  
  return (

    <View className="flex-1 relative bg-white">
        <StatusBar />
        
        <View style={styles.carouselContainer}>
          <Carousel
            
            data={banners}
            loop={true}
            autoplay={true}
            autoplayInterval={4000} 
            sliderWidth={width}
            itemWidth={width}
            slideStyle={{ display: "flex", alignItems: "center" }}
            renderItem={({ item }) => (
              <Image source={item.image} style={styles.banners} /> 
            )}
          />
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.title}>
              Get the best coffee{'\n'}
              <Text style={styles.subTitle}>in town!</Text>
          </Text>

          <Text style={styles.subText}>Get wide range of specially coffees</Text>

          <View style={styles.buttoncontainer}>
            <TouchableOpacity 
              style={styles.register}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.logins}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        
    </View>
  )
}

export default AuthScreen

const styles = StyleSheet.create({
    carouselContainer:{
      width: '100%',
      height: '100%',
      marginBottom: 100,
      position: 'absolute',
    },
    bottomContainer:{
      backgroundColor: 'white',
      marginTop: 500,
      borderTopLeftRadius: 100,
      borderTopRightRadius: 100,
    },
    banners:{
      width: '100%',
      height: 630,
    },
    title:{
      color: '#9e8c84',
      fontWeight: 'bold',
      fontSize: 30,
      alignSelf: 'center',
      marginTop: 20,
    },
    subTitle: {
      textAlign: 'center',
    },
    subText:{
      textAlign: 'center',
      color: "#ba826a",
      fontSize: 15,
      marginVertical: 20,
    },
    buttoncontainer:{
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 50,
    },
    logins:{
      borderWidth: 2,
      width: 150,
      borderColor: "#eadcd3",
      borderRadius: 30,
      padding: 15,
      paddingHorizontal: 35,
      backgroundColor: "white",
      marginHorizontal:7,
    },
    register:{
      borderWidth: 2,
      width: 150,
      borderColor: "#eadcd3",
      borderRadius: 30,
      padding: 15,
      paddingHorizontal: 35,
      backgroundColor: "#ba826a",
      marginHorizontal:7,
    },
    loginText:{
      alignSelf: "center",
      color: "#ba826a",
      fontWeight: "bold",
      fontSize: 17,
    },
    registerText:{
      alignSelf: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: 17,
    }

})
