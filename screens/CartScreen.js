import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";
import CoffeeCart from "../components/coffeeCart";
import { AuthContext } from "../constants/AuthContext";
import { themeColors } from "../theme";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

export default function CartScreen() {
  const { listProductCart, setListProductCart } = useContext(AuthContext);
  const navigation = useNavigation();

  const setQuantity = (cartItem, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveProduct(cartItem);
    }
    const newListProductCart = [];
    listProductCart.forEach((oldCartItem) => {
      if (
        oldCartItem.item.id == cartItem.item.id &&
        oldCartItem.size == cartItem.size
      ) {
        oldCartItem.quantity = newQuantity;
      }
      newListProductCart.push(oldCartItem);
    });
    setListProductCart(newListProductCart);
  };

  const handleRemoveProduct = (cartItem) => {
    Alert.alert(
      "",
      "Are you sure you want to remove this product?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            const updatedItems = listProductCart.filter(
              (item) => item.item.id !== cartItem.item.id
            );
            setListProductCart(updatedItems);
            // calculateTotalPrice();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1 }}>
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
      <SafeAreaView style={{ flex: 1, spaceY: 4 }}>
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
          <Text style={{ fontSize: 40, color: "white", marginLeft: 10 }}>
            Shopping Cart
          </Text>
        </View>
        <View className="mt-5 mb-10">
          <FlatList
            data={listProductCart}
            renderItem={({ item }) => (
              <CoffeeCart
                cartItem={item}
                setQuantity={(quantity) => setQuantity(item, quantity)}
                handleRemoveProduct={handleRemoveProduct}
              />
            )}
            style={{ height: "100%" }}
          />
        </View>
      </SafeAreaView>

      {/* coffee items cart container */}

      {/* pay button */}
      {/* <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 4, marginBottom: 2 }}>
          <TouchableOpacity
            style={{ backgroundColor: themeColors.bgLight, padding: 16, borderRadius: 999, flex: 1, marginLeft: 4 }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 18, fontWeight: "bold" }}>
              Next
            </Text>
          </TouchableOpacity>
        </View> */}
    </View>
  );
}
