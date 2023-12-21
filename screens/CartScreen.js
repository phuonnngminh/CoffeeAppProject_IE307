import React, { useEffect, useContext } from "react";
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
import { ArrowRight } from "react-native-feather";

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

  const calculateTotalPrice = (cartItem) => {
    let total = 0;
    listProductCart.forEach((cartItem) => {
      total = total + cartItem.quantity * cartItem.item.price;
    });
    return total;
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [listProductCart]);

  const onUpdateQuantity = (cartItem, newQuantity) => {
    const updatedItems = listProductCart.map((item) => {
      if (item.id === cartItem.item.id) {
        item.quantity = newQuantity;
      }
      return item;
    });
    setListProductCart(updatedItems);
    calculateTotalPrice();
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

        {/* coffee items cart container */}
        <View className="mt-5 mb-10">
          <FlatList
            data={listProductCart}
            renderItem={({ item }) => (
              <CoffeeCart
                setCount={(count) => onUpdateQuantity(item, count)}
                cartItem={item}
                setQuantity={(quantity) => setQuantity(item, quantity)}
                handleRemoveProduct={handleRemoveProduct}
              />
            )}
            style={{ height: "100%" }}
          />
        </View>
      </SafeAreaView>

      {/* checkout button */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 30,
          marginBottom: 2,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: themeColors.text,
            fontSize: 18,
            fontWeight: "bold",
            marginRight: 40,
          }}
        >
          Total Amount: ${calculateTotalPrice()}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Payment")}
          style={{
            backgroundColor: themeColors.bgDark,
            padding: 16,
            borderRadius: 999,
            flex: 1,
            marginBottom: 5,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 18,
                fontWeight: "bold",
                marginRight: 5,
              }}
            >
              Checkout
            </Text>
            <ArrowRight style={{ alignItems: "center", color: "white" }} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
