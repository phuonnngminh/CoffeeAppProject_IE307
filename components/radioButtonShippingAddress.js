import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { themeColors } from "../theme";
import { PencilIcon } from "react-native-heroicons/solid";
import { Navigation } from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
export default function RadioButtonShippingAddress({
  locations,
  phone,
  address,
}) {
  const [radioSelected, setRadioSelected] = useState(1);

  const products = [
    { id: 1, nameLocation: "Home", phone: "0911", address: "abc" },
    { id: 2, nameLocation: "Office", phone: "0923", address: "def" },
  ];

  const radioClick = (id) => {
    setRadioSelected(id);
  };

  const navigation = useNavigation();

  return products.map((val) => {
    return (
      <TouchableOpacity
        style={{
          marginBottom: 10,
          padding: 15,
          borderRadius: 30,
          backgroundColor: radioSelected === val.id ? "white" : "#E9E9E9",
          borderColor: radioSelected === val.id ? "white" : "#E9E9E9",
          borderWidth: 2,
          height: ios ? height * 0.1 : height * 0.1,
          shadowColor: "gray",
          shadowRadius: 30,
          shadowOffset: { width: 0, height: 40 },
          shadowOpacity: 0.1,
        }}
        key={val.id}
        onPress={() => radioClick(val.id)}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginRight: 10 }}>
                <View
                  style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: radioSelected === val.id ? "red" : "gray", // Change radio button color based on selection
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {val.id === radioSelected ? (
                    <View
                      style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor:
                          radioSelected === val.id ? "red" : "#000",
                      }}
                    />
                  ) : null}
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: themeColors.text,
                    fontWeight: "bold",
                  }}
                >
                  {val.nameLocation}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "gray",
                    marginTop: 3,
                  }}
                >
                  {val.phone}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "gray",
                    marginTop: 3,
                  }}
                >
                  {val.address}
                </Text>
              </View>
            </View>
          </View>
          <PencilIcon
            size={17}
            color={"black"}
            onPress={() => navigation.navigate("EditProfile")}
          />
        </View>
      </TouchableOpacity>
    );
  });
}
