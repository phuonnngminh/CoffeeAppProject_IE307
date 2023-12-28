import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image  } from 'react-native'
import { useContext } from 'react'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../constants/AuthContext'
import { ChevronLeftIcon, PencilSquareIcon} from "react-native-heroicons/outline";



const ProfileScreen = () => {
    const navigation = useNavigation();
    const {userData, setUserData, setToken} = useContext(AuthContext);

    const capitalizeLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    
    const handleLogout = () => {
        setToken();
        setUserData();
        console.log('logged out');
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
        <SafeAreaView className="space-y-4 flex-1 ">
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.iconContainer}
                >
                    <ChevronLeftIcon size={30} strokeWidth={2} color="#ba826a" />
                </TouchableOpacity>
                <Text style={styles.Title}>Profile</Text>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.avatarContainer}>
                    <Image source={require("../assets/images/avatar.jpg")} style={styles.avatarPic}/>
                    <Text style={styles.Name} numberOfLines={1} ellipsizeMode="tail">
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
                        <Text style={styles.infoTitle}>
                            Username:
                        </Text>
                        <Text style={styles.infoText}>
                            {userData.username}
                        </Text>
                    </View>

                    <View style={styles.InfoBox}>
                        <Text style={styles.infoTitle}>
                            Email:
                        </Text>
                        <Text style={styles.infoText}>
                            {userData.email}
                        </Text>
                    </View>

                    <View style={styles.InfoBox}>
                        <Text style={styles.infoTitle}>
                            Phone:
                        </Text>
                        <Text style={styles.infoText}>
                            {userData.phone}
                        </Text>
                    </View>

                    <View style={styles.InfoBox}>
                        <Text style={styles.infoTitle}>
                            Address:
                        </Text>
                        <Text style={styles.infoText}>
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
    },
    infoText:{
        fontSize: 18,
    },
    custombutton:{
        borderWidth: 2,
        width: "100%",
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

    
})