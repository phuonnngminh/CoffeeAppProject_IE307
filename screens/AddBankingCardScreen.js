import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView,Alert, FlatList  } from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../constants/AuthContext'
import { ChevronLeftIcon} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { themeColors } from '../theme';


const AddBankingCardScreen = () => {
    const navigation = useNavigation();
    const {setUserCard} = useContext(AuthContext);
    const [editUserData, setEditUserData] = useState({
        bankingName: "", 
        seriNumber: "",  
        cardbackground: require('../assets/cards/Asset1.png'),  
      });

    const handleSave = () => {
        (editUserData.seriNumber.length >= 16) ? (
        Alert.alert("",
        "Are you sure you want to save this Banking card?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
                setUserCard((prevUserCard) => [...prevUserCard, editUserData]);
                navigation.navigate("BankingCard");
            },
          },
        ],
        )
        ):(
            Alert.alert("Invalid serial number",
            "seri number has to be more than 16 characters")
        )
        
      };

  return (
    <SafeAreaView className="flex-1 relative">

        <View style={styles.headerContainer}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.iconContainer}
            >
              <ChevronLeftIcon size={30} strokeWidth={2} color="#ba826a" />
            </TouchableOpacity>
            <Text style={styles.Title}>Add New Cards</Text>
        </View>

        <View className="p-3 px-5 rounded-full">
            <View style={styles.cardContainer} className="overflow-hidden">
            <Image source={require('../assets/cards/Asset1.png')} style={styles.cardbackground}/>
            <Text style={styles.cardText}>
                Banking Name
            </Text>
            <Text style={styles.serinumberText}>
                Seri Number
            </Text>
            </View>
        </View>

        <View style={styles.inputContainer}>
            <View>
                <Text style={styles.editTitle}>
                Banking name
                </Text>
                <TextInput
                onChangeText={(text) => {
                    setEditUserData(prevData => ({
                    ...prevData,
                    bankingName: text,
                    }));
                }
                }  
                style={styles.textInput}
                />
            </View>
            <View>
                <Text style={styles.editTitle}>
                Seri number
                </Text>
                <TextInput
                
                onChangeText={(text) => {
                    setEditUserData(prevData => ({
                    ...prevData,
                    seriNumber: text,
                    }));
                }
                }   
                style={styles.textInput}
                />
            </View>
        </View>

        <TouchableOpacity style={styles.custombutton} onPress={handleSave}>
            <Text style={styles.buttonTitle}>Add Card</Text>
        </TouchableOpacity>

    </SafeAreaView>
  )
}

export default AddBankingCardScreen

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
        marginRight: 95,
    },
    inputContainer:{
        flex: 1,
        padding: 20,
    },
    editTitle:{
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 15,
      },
    textInput:{
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        
    },
    cardContainer:{
        backgroundColor: themeColors.bgDark,
        height: 150,
        borderRadius: 20,
        padding: 20,
    },
    cardbackground:{
        position: 'absolute',
        width: 375,
        height: 150,
    },
    cardText:{
        color: "white",
        fontSize: 16,
        fontWeight: 'bold',
    },
    serinumberText:{
        color: "white",
        fontSize: 15,
        flex: 1,
        alignSelf: 'flex-end',
        marginTop: 40,
    },
    custombutton:{
        borderWidth: 2,
        width: "85%",
        borderColor: "#eadcd3",
        borderRadius: 30,
        padding: 15,
        alignSelf: 'center',
        marginVertical: 20,
        backgroundColor: themeColors.bgLight
    },
    buttonTitle:{
        alignSelf: "center",
        color: themeColors.text,
        fontWeight: "bold",
        fontSize: 17,
    },
})