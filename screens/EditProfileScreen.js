import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image, TextInput, KeyboardAvoidingView,Alert  } from 'react-native'
import { useContext, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../constants/AuthContext'
import React from 'react'
import { ChevronLeftIcon, CheckIcon} from "react-native-heroicons/outline";

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const {userData, setUserData} = useContext(AuthContext);
  const [editUserData, setEditUserData] = useState(userData);

  const handleSave = () => {
    Alert.alert("",
    "Are you sure you want to save the changes?",
    [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          setUserData(editUserData);
          console.log("changed user data!");
          navigation.navigate("Profile");
        },
      },
    ],
    )
    
  };


  return (
    <KeyboardAvoidingView behavior="height" enabled keyboardVerticalOffset={10}>
    <ScrollView bounces={false}>
      
      <SafeAreaView>

        <View style={styles.headerContainer}>
          <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.iconContainer}
          >
              <ChevronLeftIcon size={30} strokeWidth={2} color="#ba826a" />
          </TouchableOpacity>
          <Text style={styles.Title}>Edit Profile</Text>
          <TouchableOpacity
              onPress={handleSave}
              style={styles.checkiconContainer}
          >
              <CheckIcon size={30} strokeWidth={2} color="#ba826a" />
          </TouchableOpacity>
        </View>

        <View style={styles.bodyContainer}>
        
          <View className="flex-row ">
            <View className="mr-3">
              <Text style={styles.editTitle}>
                First Name
              </Text>
              <TextInput
                value={editUserData.name.firstname}
                onChangeText={(text) => {
                  setEditUserData(prevData => ({
                    ...prevData,
                    name: {
                      ...prevData.name,
                      firstname: text,
                    },
                  }));
                }
                }  
                style={styles.textInputFirtname}
              />
            </View>
            <View>
              <Text style={styles.editTitle}>
                Last Name
              </Text>
              <TextInput
                value={editUserData.name.lastname}
                onChangeText={(text) => {
                  setEditUserData(prevData => ({
                    ...prevData,
                    name: {
                      ...prevData.name,
                      lastname: text,
                    },
                  }));
                }
                }  
                style={styles.textInputFirtname}
              />
            </View>
          </View>
          
          <View>
            <View>
              <Text style={styles.editTitle}>
                Username
              </Text>
              <TextInput
                value={editUserData.username}
                onChangeText={(text) => {
                  setEditUserData(prevData => ({
                    ...prevData,
                    username: text,
                  }));
                }
                }  
                style={styles.textInput}
              />
            </View>
            <View>
              <Text style={styles.editTitle}>
                Email
              </Text>
              <TextInput
                value={editUserData.email}
                onChangeText={(text) => {
                  setEditUserData(prevData => ({
                    ...prevData,
                    email: text,
                  }));
                }
                }   
                style={styles.textInput}
              />
            </View>
            <View>
              <Text style={styles.editTitle}>
                Phone Number
              </Text>
              <TextInput
                value={editUserData.phone}
                onChangeText={(text) => {
                  setEditUserData(prevData => ({
                    ...prevData,
                    phone: text,
                  }));
                }
                } 
                style={styles.textInput}
              />
            </View>
            <View>
            
              <Text style={styles.editTitle}>
                House Number
              </Text>
              <TextInput
                value={editUserData.address.number.toString()}
                onChangeText={(text) => {
                  setEditUserData(prevData => ({
                    ...prevData,
                    address: {
                      ...prevData.address,
                      number: parseInt(text),
                    },
                  }));
                }
                }  
                style={styles.textInput}
              />
            </View>
            
            <View>
              <Text style={styles.editTitle}>
                Street
              </Text>
              <TextInput
                value={editUserData.address.street}
                onChangeText={(text) => {
                  setEditUserData(prevData => ({
                    ...prevData,
                    address: {
                      ...prevData.address,
                      street: text,
                    },
                  }));
                }
                }  
                style={styles.textInput}
              />
            </View>
            <View>
              <Text style={styles.editTitle}>
                City
              </Text>
              <TextInput
                value={editUserData.address.city}
                onChangeText={(text) => {
                  setEditUserData(prevData => ({
                    ...prevData,
                    address: {
                      ...prevData.address,
                      city: text,
                    },
                  }));
                }
                }  
                style={styles.textInput}
              />
            </View>
          </View>

        </View>
        


      </SafeAreaView>
      
    </ScrollView>
    </KeyboardAvoidingView>
  )
};

export default EditProfileScreen

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
    marginRight: 110,
  },
  checkiconContainer:{
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 10,
  },
  bodyContainer:{
    flex: 1,
    padding: 20,
  },
  editTitle:{
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 15,
  },
  textInputFirtname:{
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: 180,
    
  },
  textInput:{
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    
  }
})