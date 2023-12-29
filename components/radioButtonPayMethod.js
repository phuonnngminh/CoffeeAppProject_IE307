import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View, Image } from "react-native";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";

export default function RadioButtonPayMethod() {
  const [radioSelected, setRadioSelected] = useState(1);

  const products = [
    {
      id: 1,
      payMethod: "Credit Card",
      logo: require("../assets/images/masterCard.png"),
    },
    {
      id: 2,
      payMethod: "Visa",
      logo: require("../assets/images/visa.png"),
    },
    {
      id: 3,
      payMethod: "PayPal",
      logo: require("../assets/images/paypal.png"),
    },
  ];

  const radioClick = (id) => {
    setRadioSelected(id);
  };

  return (
    <View>
      {products.map((val) => (
        <TouchableOpacity
          style={{
            marginBottom: 10,
            marginLeft: 15,
            borderRadius: 30,
            backgroundColor: radioSelected === val.id ? "white" : "#E9E9E9",
            borderColor: radioSelected === val.id ? "white" : "#E9E9E9",
            shadowColor: "gray",
            shadowRadius: 30,
            shadowOffset: { width: 0, height: 40 },
            shadowOpacity: 0.1,
            padding: 3
          }}
          key={val.id}
          onPress={() => radioClick(val.id)}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={val.logo}
              style={{ width: 50, height: 50, marginRight: 10 }}
            />
            <Text style={{ fontWeight: "bold" }}>{val.payMethod}</Text>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <View style={{ marginRight: 10 }}>
                <View
                  style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: radioSelected === val.id ? "red" : "gray",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {val.id === radioSelected && (
                    <View
                      style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor:
                          radioSelected === val.id ? "red" : "#000",
                      }}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
