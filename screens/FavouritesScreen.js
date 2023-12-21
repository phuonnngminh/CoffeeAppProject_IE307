import { StyleSheet, Text, View, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native'
import { useState, useContext } from 'react'
import { AuthContext } from '../constants/AuthContext'
import { StatusBar } from 'expo-status-bar'
import { BellIcon } from 'react-native-heroicons/outline'
import { MapPinIcon } from 'react-native-heroicons/solid'
import {themeColors} from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context'
import { StarIcon, NoSymbolIcon, ShoppingBagIcon } from 'react-native-heroicons/solid';

import React from 'react'

const {width, height} = Dimensions.get('window');
const ios = Platform.OS == 'ios';

const FavouritesScreen = () => {

  const {favouriteItems, setFavouriteItems} = useContext(AuthContext);
  
  const handleRemoveItem = (item) => {
    setFavouriteItems((prev) => prev.filter((favItem) => favItem.id !== item.id));
  };

  
  return (
    <View className="flex-1 relative">
        <StatusBar />
        <Image 
        source={require('../assets/images/beansBackground1.png')} 
        style={{height: height*1}} 
        className="w-full absolute -top-5 opacity-10" />

        <SafeAreaView className={ios? '-mb-8': ''}>

        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center">
          <Image source={require('../assets/images/avatar.png')} 
            className="h-9 w-9 rounded-full" />
          
          <View className="flex-row items-center space-x-2">
            <Text className="font-semibold text-base">
              Favourites List
            </Text>
          </View>
          <BellIcon size="27" color="black" />
        </View>

        <View className="px-5 mt-6">
         
          <FlatList
            data={favouriteItems}
            keyExtractor={item => item.id}
            bounces={false}
            renderItem={({item}) => {
                return (

                    <View style={styles.FavContainer}>

                        <View className="flex-row" >
                            <View style={styles.favShadow}>
                                <Image 
                                    source={item.image} 
                                    className="h-20 w-20 m-5" 
                                />
                            </View>
                            
                            <View className="flex-column">
                                <Text className="font-semibold"
                                    style={styles.favName}>
                                        {item.name}
                                </Text>
                                
                                <View style={{backgroundColor: 'rgba(255,255,255,0.2)'}} 
                                    className="flex-row items-center rounded-3xl px-2 space-x-1 w-16">
                                    <StarIcon size="13" color="white" />
                                    <Text className="text-base font-semibold text-white">{item.stars}</Text>
                                </View>

                                <Text className="text-white font-bold mt-1 p-1">$ {item.price}</Text>

                            </View>

                            <TouchableOpacity 
                                // className={`rounded-full p-2 ml-20 justify-center `}
                                style={styles.AddCartIcon}
                                onPress={() => {}}
                            >
                                <ShoppingBagIcon size="38" color='white' />
                            </TouchableOpacity>

                            <TouchableOpacity 
                                // className={`rounded-full p-2 ml-20 justify-center `}
                                style={styles.RemoveIcon}
                                onPress={() => handleRemoveItem(item)}
                            >
                                <NoSymbolIcon size="38" color='red' />
                            </TouchableOpacity>

                            
                        </View>
                        

                    </View>

                )
            }}
          />
        </View>
        
        
        
        </SafeAreaView>

    </View>
  )
}

export default FavouritesScreen

const styles = StyleSheet.create({
    FavContainer:{
        borderRadius: 40, 
        backgroundColor: themeColors.bgDark, 
        height: ios? height*0.13 : height*0.15, 
        width: width*0.9,
        marginVertical: 10,
    },
    favShadow:{
        shadowColor: 'black',
        shadowRadius: 30,
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.2,
        
    },
    favName:{
        color: 'white',
        padding: 8,
        fontSize: 15,
    },
    RemoveIcon:{
        justifyContent: 'center',
        position: 'absolute',
        right: 20,
        marginVertical: 35,
    },
    AddCartIcon:{
        justifyContent: 'center',
        position: 'absolute',
        right: 85,
        marginVertical: 35,
    }
})