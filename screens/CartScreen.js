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
const ios = Platform.OS === "ios";

export default function CartScreen() {
  const { listProductCart, setListProductCart } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleBuyNow = (item, selectedSize, selectedQuantity) => {
    const buyNowItem = {
      item: item,
      size: selectedSize,
      quantity: selectedQuantity,
    };
  };

  const renderShopNowButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate("home")}>
      <Text className="text-lg text-amber-600">Shop Now</Text>
    </TouchableOpacity>
  );

  const setQuantity = (cartItem, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveProduct(cartItem);
    }
    const newListProductCart = listProductCart.map((oldCartItem) => {
      if (
        oldCartItem.item.id === cartItem.item.id &&
        oldCartItem.size === cartItem.size
      ) {
        return { ...oldCartItem, quantity: newQuantity };
      }
      return oldCartItem;
    });
    setListProductCart(newListProductCart);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    listProductCart.forEach((cartItem) => {
      total += cartItem.quantity * cartItem.size.price;
    });
    const totalPrice = parseFloat(total.toFixed(2));
    return totalPrice;
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [listProductCart]);

  const onUpdateQuantity = (cartItem, newQuantity) => {
    const updatedItems = listProductCart.map((item) => {
      if (item.item.id === cartItem.item.id && item.size === cartItem.size) {
        return { ...item, quantity: newQuantity };
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
        <View style={{ marginTop: 5, marginBottom: 10 }}>
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
            keyExtractor={(item) => item.item.id.toString()}
          />
        </View>

        {/* Conditional rendering based on listProductCart */}
        {listProductCart.length > 0 ? (
          // Checkout button
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 50,
              marginBottom: 2,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: themeColors.text,
                fontSize: 20,
                marginRight: 40,
              }}
            >
              Total: ${calculateTotalPrice()}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: themeColors.bgDark,
                padding: 15,
                borderRadius: 999,
                flexDirection: "row",
                marginBottom: 5,
                alignItems: "center",
              }}
              onPress={() => {
                handleBuyNow(item, selectedSize, quantity);
                navigation.navigate("Payment", {
                  buyNowItem: { item, quantity, size: selectedSize },
                });
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  marginRight: 5,
                }}
              >
                Checkout
              </Text>
              <ArrowRight size={20} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          // Empty cart message and Shop Now button
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>Your cart is empty !</Text>
            {renderShopNowButton()}
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}
