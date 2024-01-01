import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import { themeColors } from "../theme";
import UpDownButton from "./upDownButton";
import { XCircle } from "react-native-feather";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

export default function CoffeeCart(props) {
  const { cartItem, setQuantity, handleRemoveProduct } = props;

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
          height: ios ? height * 0.15 : height * 0.2,
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
              <TouchableOpacity onPress={() => handleRemoveProduct(cartItem)}>
                <XCircle style={{ marginHorizontal: 70, color: "white" }} />
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              {/* upDownButton */}
              <UpDownButton
                count={cartItem.quantity}
                setCount={setQuantity}
                color={"white"}
                borderColor={"white"}
              />
              <View style={{ paddingHorizontal: 20 }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "white",
                    fontWeight: "bold",
                    marginTop: 15,
                    marginLeft: 5,
                  }}
                >
                  Total: ${calculateProductPrice(cartItem)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
