import React, { useMemo, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  StatusBar,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";
import { themeColors } from "../theme";
import RadioButtonShippingAddress from "../components/radioButtonShippingAddress";
import RadioButtonPayMethod from "../components/radioButtonPayMethod";
import { Dimensions } from "react-native";
import { AuthContext } from "../constants/AuthContext";
import CheckoutItem from "../components/checkoutItem";
const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
export default function PaymentScreen({ route }) {
  const { buyNowItem } = route.params;
  const navigation = useNavigation();
  const { userCard, setUserCard } = useContext(AuthContext); // bien context nay chua cac object la thong tin của các the ngan hang..

  const calculateProductPrice = (buyNowItem) => {
    let total = 0;
    buyNowItem.forEach((element) => {
      total += element.quantity * element.size.price;
    });
    return total;
  };

  const shippingAddress = useMemo(
    () => [
      {
        id: "1",
      },
      {
        id: "2",
      },
    ],
    []
  );

  const payMethod = useMemo(
    () => [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 4,
      },
      {
        id: 5,
      },
      {
        id: 6,
      },
    ],
    []
  );

  return (
    <View className="flex-column h-screen">
      <ScrollView
        className="flex-initial"
        style={{
          backgroundColor: "#F5F5F5",
          marginBottom: 200,
          height: "100%",
        }}
      >
        <View style={{ flex: 1 }}>
          <StatusBar style="light" />
          <Image
            source={require("../assets/images/beansBackground2.png")}
            style={{
              height: 170,
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
              width: "100%",
              position: "absolute",
            }}
          />
          <SafeAreaView style={{ flex: 1 }}>
            <View
              style={{
                marginHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{ borderRadius: 999 }}
                onPress={() => navigation.goBack()}
              >
                <ArrowLeftCircleIcon
                  size={50}
                  strokeWidth={1.2}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 5, spaceY: 2 }}>
              <Text style={{ fontSize: 40, color: "white", marginLeft: 10 }}>
                Payment
              </Text>
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 40, spaceY: 2 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: themeColors.text,
                  fontWeight: "bold",
                }}
              >
                Shipping to
              </Text>
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 10, spaceY: 2 }}>
              <RadioButtonShippingAddress />
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 10, spaceY: 2 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: themeColors.text,
                  fontWeight: "bold",
                }}
              >
                Checkout Item
              </Text>
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 10, spaceY: 2 }}>
                <FlatList
                  data={buyNowItem}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <CheckoutItem
                      cartItem={item}
                    />
                  )}
                />
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 10, spaceY: 2 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: themeColors.text,
                  fontWeight: "bold",
                }}
              >
                Payment method
              </Text>
            </View>
            <View style={{ paddingHorizontal: 10, marginTop: 10, spaceY: 2 }}>
              <RadioButtonPayMethod />
            </View>
          </SafeAreaView>
        </View>
      </ScrollView>

      <View
        className={`p-4 ${ios ? "mb-6" : "mb-3"}`}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "white",
          borderRadius: 30,
        }}
      >
        <View className="flex-row justify-between items-center px-4 mb-4">
          <View>
            <Text className="text-base text-black">Shipping fee</Text>
            <Text className="text-base text-black">Sub total</Text>
            <Text className="text-xl text-black font-semibold">Total</Text>
          </View>
          <View>
            <Text className="text-base text-black">$10</Text>
            <Text className="text-base text-black">
              ${calculateProductPrice(buyNowItem)}
            </Text>
            <Text className="text-xl text-black font-semibold">
              ${calculateProductPrice(buyNowItem) + 10}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={{ backgroundColor: themeColors.bgLight }}
          className="p-4 rounded-full flex-1 ml-4"
          onPress={() => navigation.navigate("PaymentDone")}
        >
          <Text className="text-center text-white text-base font-semibold">
            Payment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
