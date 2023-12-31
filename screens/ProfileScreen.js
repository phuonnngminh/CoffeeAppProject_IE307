import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image, StatusBar  } from 'react-native'
import { useContext } from 'react'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";
import { AuthContext } from '../constants/AuthContext'
import { ChevronLeftIcon, PencilSquareIcon} from "react-native-heroicons/outline";
import * as SQLite from 'expo-sqlite';
import { themeColors } from '../theme';

const db = SQLite.openDatabase('localstorage.db');

const ProfileScreen = () => {
    const navigation = useNavigation();
    const {userData, setUserData, setFavouriteItems, setListProductCart} = useContext(AuthContext);

    const capitalizeLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    
    const handleLogout = () => {
        try {
            db.transaction(async(tx) => {
              tx.executeSql('DELETE FROM userlocal', [],
              (txObj, result) => {
                setUserData();
                setFavouriteItems([]);
                setListProductCart([]);
                console.log('logged out');
              },
              (txObj, error) => console.log(error)
              )
            });
        } catch (error) {
            console.error('Failed to delete in database')
        }
       
    };

    function sliceLongText(text, maxLength) {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + "...";
        } else {
            return text;
        }
    }

    return (
        <ScrollView bounces={false}>
        <SafeAreaView className="flex-1 flex-1 relative ">
            <StatusBar style="light" />
            <Image
                source={require("../assets/images/beansBackground2.png")}
                style={{
                height: 170,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
                }}
                className="w-full absolute"
            />

            <View
            style={{
                marginHorizontal: 4,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
            }}
            >
                <TouchableOpacity
                    style={{ borderRadius: 999 }}
                    onPress={() => navigation.goBack()}
                >
                    <ArrowLeftCircleIcon size={50} strokeWidth={1.2} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 5, spaceY: 2 }}>
                <Text style={{ fontSize: 40, color: "white", marginLeft: 10, marginBottom: 15 }}>
                    Profile
                </Text>
            </View>

            <View style={styles.bodyContainer}>
                <View style={styles.avatarContainer}>
                    <Image source={require("../assets/images/avatar.jpg")} style={styles.avatarPic}/>
                    <Text className={themeColors.text} style={styles.Name} numberOfLines={1} ellipsizeMode="tail">
                        {sliceLongText((capitalizeLetter(userData.name.firstname)), 6)} {sliceLongText((capitalizeLetter(userData.name.lastname)), 6)}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("EditProfile")}
                        style={styles.editiconContainer}
                    >
                    <PencilSquareIcon size={38} strokeWidth={2} color="#ba826a" />
                    </TouchableOpacity>
                </View>

                <View className="my-3">
                    <View style={styles.InfoBox}>
                        <Text style={styles.infoTitle}>
                            Name:
                        </Text>
                        <Text style={styles.infoText}>
                            {userData.name.firstname} {userData.name.lastname}
                        </Text>
                    </View>

                    <View style={styles.InfoBox}>
                        <Text className={themeColors.text} style={styles.infoTitle}>
                            Username:
                        </Text>
                        <Text className={themeColors.text} style={styles.infoText}>
                            {userData.username}
                        </Text>
                    </View>

                    <View className={themeColors.text} style={styles.InfoBox}>
                        <Text style={styles.infoTitle}>
                            Email:
                        </Text>
                        <Text className={themeColors.text} style={styles.infoText}>
                            {userData.email}
                        </Text>
                    </View>

                    <View style={styles.InfoBox}>
                        <Text className={themeColors.text} style={styles.infoTitle}>
                            Phone:
                        </Text>
                        <Text className={themeColors.text} style={styles.infoText}>
                            {userData.phone}
                        </Text>
                    </View>

                    <View style={styles.InfoBox}>
                        <Text className={themeColors.text} style={styles.infoTitle}>
                            Address:
                        </Text>
                        <Text className={themeColors.text} style={styles.infoText}>
                            {userData.address.number}, {userData.address.street}, {userData.address.city}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.custombutton} onPress={handleLogout}>
                    <Text style={styles.buttonTitle}>LOG OUT</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
        </ScrollView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginVertical: 5,
    },  
    Title:{
        fontWeight: 'bold',
        fontSize: 20,
        color: "#ba826a",
    },
    iconContainer: {
        marginRight: 130,
    },
    bodyContainer:{
        flex: 1,
        padding: 20,
    },  
    avatarContainer:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarPic:{
        width: 90,
        height: 90,
        borderRadius: 99,
    },
    Name:{  
        fontWeight: 'bold',
        fontSize: 30,
        padding: 15,
        color: themeColors.text,
    },
    editiconContainer:{
        flex: 1,
        alignItems: 'flex-end',
        
    },
    InfoBox:{
        paddingVertical: 13,
        borderBottomWidth: 1,
        borderBottomColor: '#ba826a',
    },
    infoTitle:{
        fontWeight: 'bold',
        fontSize: 20,
        color: themeColors.text,
    },
    infoText:{
        fontSize: 18,
        color: themeColors.text,
    },
    custombutton:{
        borderWidth: 2,
        width: "100%",
        borderColor: "#eadcd3",
        borderRadius: 30,
        padding: 15,
        alignSelf: 'center',
        backgroundColor: "#8c5319",
        marginVertical: 20,
      },
      buttonTitle:{
        alignSelf: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 17,
      },

    
})