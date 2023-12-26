import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";
import { HeartIcon, StarIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { ShoppingBag } from "react-native-feather";
import UpDownButton from "../components/upDownButton";
import { useContext } from "react";
import { AuthContext } from "../constants/AuthContext";
const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

export default function ProductDetailsScreen({ route }) {
  const { listProductCart, setListProductCart } = useContext(AuthContext);
  const item = route.params;
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const count = listProductCart.length;
  const [selectedSize, setSelectedSize] = useState(item.sizes[0]);

  const { favouriteItems, setFavouriteItems } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);

  const ToggleFavourites = (item) => {
    // console.log('doing add favorites');
    if (isLiked) {
      setFavouriteItems(
        favouriteItems.filter((prevItem) => prevItem.id !== item.id)
      );
    } else {
      setFavouriteItems([...favouriteItems, item]);
    }
  };


  const handleSizePress = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = (item, selectedSize, selectedQuantity) => {
    const existingCartItemIndex = listProductCart.findIndex(
      (cartItem) =>
        cartItem.item.id === item.id && cartItem.size === selectedSize
    );

    if (existingCartItemIndex !== -1) {
      const updatedCart = listProductCart.map((cartItem, index) => {
        if (index === existingCartItemIndex) {
          return {
            ...cartItem,
            quantity: cartItem.quantity + selectedQuantity,
          };
        }
        return cartItem;
      });
      setListProductCart(updatedCart);
    } else {
      const cartItem = {
        item: item,
        size: selectedSize,
        quantity: selectedQuantity,
      };
      setListProductCart([...listProductCart, cartItem]);
    }
    console.log("Added to cart");
  };

  useEffect(() => {
    const isItemLiked = favouriteItems.some(
      (favItem) => favItem.id === item.id
    );
    setIsLiked(isItemLiked);
    // console.log("is item in favourites: ",isItemLiked);

  }, [favouriteItems]);

  return (
    <ScrollView>
      <View className="flex-1">
        <StatusBar style="light" />
        <Image
          source={require("../assets/images/beansBackground2.png")}
          style={{
            height: 300,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
          }}
          className="w-full absolute"
        />
        <SafeAreaView className="space-y-4 flex-1">
          <View className="mx-4 flex-row justify-between items-center">
            <TouchableOpacity
              className=" rounded-full "
              onPress={() => navigation.goBack()}
            >
              <ArrowLeftCircleIcon size="50" strokeWidth={1.2} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              className={`rounded-full border-2 p-2 ${
                isLiked ? "border-red-500" : "border-white"
              }`}
              onPress={() => ToggleFavourites(item)}
            >
              <HeartIcon size="24" color={isLiked ? "red" : "white"} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              shadowColor: themeColors.bgDark,
              shadowRadius: 30,
              shadowOffset: { width: 0, height: 30 },
              shadowOpacity: 0.9,
            }}
            className="flex-row justify-center"
          >
            <Image
              source={item.image}
              className="h-60 w-60"
              style={{ marginTop: ios ? 0 : 40 }}
            />
          </View>
          <View
            style={{ backgroundColor: themeColors.bgLight }}
            className="flex-row justify-center items-center mx-4 rounded-3xl p-1 px-2 space-x-1 opacity-90 w-16"
          >
            <StarIcon size="15" color="white" />
            <Text className="text-base font-semibold text-white">
              {item.stars}
            </Text>
          </View>
          <View className="px-4 flex-row justify-between items-center">
            <Text
              style={{ color: themeColors.text }}
              className="text-3xl font-semibold"
            >
              {item.name}
            </Text>
            <Text
              style={{ color: themeColors.text }}
              className="text-lg font-semibold"
            >
              $ {selectedSize.price}
            </Text>
          </View>
          <View className="px-4 space-y-2">
            <Text
              style={{ color: themeColors.text }}
              className="text-lg font-bold"
            >
              Coffee size
            </Text>
            <View className="flex-row justify-between">
              <TouchableOpacity
                onPress={() => handleSizePress(item.sizes[0])}
                style={{
                  backgroundColor:
                  selectedSize === item.sizes[0]? themeColors.bgLight : "rgba(0,0,0,0.07)",
                }}
                className="p-3 px-8 rounded-full"
              >
                <Text
                  className={selectedSize === item.sizes[0] ? "text-white" : "text-gray-700"}
                >
                  Small
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSizePress(item.sizes[1])}
                style={{
                  backgroundColor:
                  selectedSize === item.sizes[1] ? themeColors.bgLight : "rgba(0,0,0,0.07)",
                }}
                className="p-3 px-8 rounded-full"
              >
                <Text
                  className={selectedSize === item.sizes[1] ? "text-white" : "text-gray-700"}
                >
                  Medium
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSizePress(item.sizes[2])}
                style={{
                  backgroundColor:
                  selectedSize === item.sizes[2] ? themeColors.bgLight : "rgba(0,0,0,0.07)",
                }}
                className="p-3 px-8 rounded-full"
              >
                <Text
                  className={selectedSize === item.sizes[2] ? "text-white" : "text-gray-700"}
                >
                  Large
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="px-4 space-y-2">
            <Text
              style={{ color: themeColors.text }}
              className="text-lg font-bold"
            >
              About
            </Text>
            <Text className="text-gray-600">{item.desc}</Text>
          </View>
        </SafeAreaView>
        <View className={`space-y-3 ${ios ? "mb-6" : "mb-3"}`}>
          <View className="flex-row justify-between items-center px-4 mb-2">
            <View className="flex-row items-center space-x-1">
              <Text className="text-base text-gray-700 font-semibold opacity-60">
                Volume
              </Text>
              <Text className="text-base text-black font-semibold">
                {" "}
                {item.volume}
              </Text>
            </View>
            {/* UpDownButton */}
            <UpDownButton
              count={quantity}
              setCount={setQuantity}
              color={themeColors.text}
              borderColor={"gray"}
            />
          </View>
          {/* buy now button */}
          <View className="flex-row justify-between px-4">
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => handleAddToCart(item, selectedSize, quantity)}
            >
              <View
                style={{
                  padding: 4,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: "gray",
                }}
              >
                <ShoppingBag size={30} color="gray" />
              </View>
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  right: -5,
                  backgroundColor: "red",
                  borderRadius: 10,
                  width: 20,
                  height: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: 12 }}>{count}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: themeColors.bgLight }}
              className="p-4 rounded-full flex-1 ml-4"
            >
              <Text className="text-center text-white text-base font-semibold">
                Buy now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
