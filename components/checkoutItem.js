import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { themeColors } from "../theme";
const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
export default function CheckoutItem({ cartItem }) {
  const item = cartItem.item;
  const calculateProductPrice = (cartItem) => {
    let total = 0;
    total = cartItem.quantity * cartItem.size.price;
    const totalPrice = parseFloat(total.toFixed(2));
    return totalPrice;
  };

  return (
    <View style={{ padding: 16 }}>
      <View
        style={{
          flexDirection: "row",
          borderRadius: 40,
          backgroundColor: themeColors.bgDark,
          height: ios ? height * 0.13 : height * 0.2,
          width: width * 0.92,
        }}
      >
        <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
          <Image source={item.image} style={{ height: 80, width: 80 }} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            marginTop: ios ? 10 : 0,
          }}
        >
          <View style={{ marginTop: 15 }}>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text
                  style={{ fontSize: 18, color: "white", fontWeight: "bold" }}
                >
                  {item.name}
                </Text>
                <View style={{ flexDirection: "row", marginTop: 5 }}>
                  <Text style={{ fontSize: 14, color: "white", opacity: 0.6 }}>
                    Size: {cartItem.size.size}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  fontWeight: "bold",
                  marginTop: 15,
                }}
              >
                Total: ${calculateProductPrice(cartItem)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
