import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";
import { CheckCircleIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
export default function PaymentDoneScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "space-between" }}>
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
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CheckCircleIcon size={100} color={"green"} />
            <Text className="text-2xl mt-3">Payment Successfull</Text>
            <Text className="text-2xl mt-5 text-gray-500">
              Thank you for shopping with us !
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: themeColors.bgDark,
              padding: 15,
              paddingRight: 40,
              paddingLeft: 40,
              borderRadius: 999,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("home");
            }}
          >
            <Text
              className="text-2xl"
              style={{
                color: "white",
                marginRight: 5,
              }}
            >
              Continue to shop
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}
