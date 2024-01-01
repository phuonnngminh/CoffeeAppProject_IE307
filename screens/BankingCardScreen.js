import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView,Alert, FlatList  } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../constants/AuthContext'
import { ChevronLeftIcon} from "react-native-heroicons/outline";
import { themeColors } from '../theme';
import { bankingCard } from '../constants';

const BankingCardScreen = () => {
  const navigation = useNavigation();
  const {userCard, setUserCard} = useContext(AuthContext);

  const hidingSeriNumbers = (str) => {
    const length = str.length;
    if (length <= 4) {
        return str;
    }
    let maskedString = '*'.repeat(length - 4) + str.slice(-4);
    maskedString = maskedString.replace(/(.{4})/g, '$1 ');
    return maskedString;
  }

  return (
    <SafeAreaView className="flex-1 relative">

        <View style={styles.headerContainer}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.iconContainer}
            >
              <ChevronLeftIcon size={30} strokeWidth={2} color="#ba826a" />
            </TouchableOpacity>
            <Text style={styles.Title}>Banking Cards</Text>
        </View>

        <FlatList
            data={userCard}
            keyExtractor={(item, id) => id}
            scrollEnabled={true}
            renderItem={({item}) => {
              return (
                <View className="p-3 px-5 rounded-full">
                  <View style={styles.cardContainer} className="overflow-hidden">
                    <Image source={item.cardbackground} style={styles.cardbackground}/>
                    <Text style={styles.cardText}>
                        {item.bankingName}
                    </Text>
                    <Text style={styles.serinumberText}>
                        {hidingSeriNumbers(item.seriNumber)}
                    </Text>
                  </View>
                </View>
              );
            }}
        />

        <TouchableOpacity style={styles.custombutton} onPress={()=>navigation.navigate('AddBankingCard')}>
            <Text style={styles.buttonTitle}>+ Add New Card</Text>
        </TouchableOpacity>

    </SafeAreaView>
  )
}

export default BankingCardScreen

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
      },
    buttonTitle:{
        alignSelf: "center",
        color: "gray",
        fontWeight: "bold",
        fontSize: 17,
    },
})