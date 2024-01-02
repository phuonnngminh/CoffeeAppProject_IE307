import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  FlatList,
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
import { coffeeItems } from "../constants";
import ReviewCard from "../components/reviewCard";
import StarRating from "../components/starRating";
const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

export default function ProductDetailsScreen({ route }) {
  const { listProductCart, setListProductCart } = useContext(AuthContext);
  const item = route.params;
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(item.sizes[0]);
  const count = listProductCart.length;

  const { favouriteItems, setFavouriteItems } = useContext(AuthContext);
  const [isLiked, setIsLiked] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const longDescription = item.desc;

  const slicedReviews = item.reviews.slice(0, 3);

  const generateShortDescription = (longDesc, maxLength) => {
    if (longDesc.length <= maxLength) {
      return longDesc;
    }

    const shortDesc = longDesc.substring(0, maxLength - 3);
    return shortDesc;
  };
  const shortDescription = generateShortDescription(longDescription, 300);

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const ToggleFavourites = (item) => {
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

  const handleBuyNow = (item, selectedSize, selectedQuantity) => {
    const buyNowItem = {
      item: item,
      size: selectedSize,
      quantity: selectedQuantity,
    };
  };

  useEffect(() => {
    const isItemLiked = favouriteItems.some(
      (favItem) => favItem.id === item.id
    );
    setIsLiked(isItemLiked);
  }, [favouriteItems]);

  return (
    <View className="flex-column h-screen">
      <ScrollView
        className="flex-initial"
        style={{ backgroundColor: "#F5F5F5", marginBottom: 100 }}
      >
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
                <ArrowLeftCircleIcon
                  size="50"
                  strokeWidth={1.2}
                  color="white"
                />
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
                      selectedSize === item.sizes[0]
                        ? themeColors.bgLight
                        : "rgba(0,0,0,0.07)",
                  }}
                  className="p-3 px-8 rounded-full"
                >
                  <Text
                    className={
                      selectedSize === item.sizes[0]
                        ? "text-white"
                        : "text-gray-700"
                    }
                  >
                    Small
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSizePress(item.sizes[1])}
                  style={{
                    backgroundColor:
                      selectedSize === item.sizes[1]
                        ? themeColors.bgLight
                        : "rgba(0,0,0,0.07)",
                  }}
                  className="p-3 px-8 rounded-full"
                >
                  <Text
                    className={
                      selectedSize === item.sizes[1]
                        ? "text-white"
                        : "text-gray-700"
                    }
                  >
                    Medium
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSizePress(item.sizes[2])}
                  style={{
                    backgroundColor:
                      selectedSize === item.sizes[2]
                        ? themeColors.bgLight
                        : "rgba(0,0,0,0.07)",
                  }}
                  className="p-3 px-8 rounded-full"
                >
                  <Text
                    className={
                      selectedSize === item.sizes[2]
                        ? "text-white"
                        : "text-gray-700"
                    }
                  >
                    Large
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* description */}
            <View className="px-4 space-y-2">
              <Text
                style={{ color: themeColors.text }}
                className="text-lg font-bold"
              >
                About
              </Text>
              <Text>
                {expanded ? (
                  <>
                    {longDescription}
                    <Text style={{ color: "gray" }} onPress={toggleDescription}>
                      {" "}
                      [see less]
                    </Text>
                  </>
                ) : (
                  <>
                    {shortDescription}
                    <Text style={{ color: "gray" }} onPress={toggleDescription}>
                      {" "}
                      ...[see more]
                    </Text>
                  </>
                )}
              </Text>
            </View>
            {/* review */}
            <View className="px-4 space-y-2">
              <View className="flex-row justify-between mb-3">
                <View>
                  <Text
                    style={{ color: themeColors.text }}
                    className="text-lg font-bold"
                  >
                    Review
                  </Text>
                  <StarRating rate={item.stars} size={20} />
                </View>
                <Text
                  style={{ color: "gray" }}
                  className="mt-2"
                  onPress={() =>
                    navigation.navigate("Review Screen", { ...item })
                  }
                >
                  See all &gt;
                </Text>
              </View>
              <View className="mt-5">
                <FlatList
                  data={slicedReviews}
                  renderItem={({ item }) => <ReviewCard item={item} />}
                  scrollEnabled={false}
                />
              </View>
            </View>
          </SafeAreaView>
        </View>
      </ScrollView>
      <View
        className="space-y-3"
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          backgroundColor: "white",
          borderRadius: 30,
          zIndex: 10,
        }}
      >
        <View className={`p-2 ${ios ? "mb-6" : "mb-3"}`}>
          <View className="flex-row justify-between items-center px-4 mb-2">
            <View className="flex-row items-center space-x-1">
              <Text className="text-base text-gray-700 font-semibold opacity-60">
                Volume
              </Text>
              <Text className="text-base text-black font-semibold">
                {" "}
                {selectedSize.volume}
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
              style={{
                borderRadius: 999,
                borderWidth: 1,
                borderColor: "gray",
              }}
              className="p-4 rounded-full flex-1 "
              onPress={() => handleAddToCart(item, selectedSize, quantity)}
            >
              <Text
                style={themeColors.text}
                className="text-center text-base font-semibold"
              >
                Add to cart +
              </Text>
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
              style={{
                backgroundColor: themeColors.bgLight,
                padding: 16,
                borderRadius: 999,
                flex: 1,
                marginLeft: 16,
              }}
              onPress={() => {
                handleBuyNow(item, selectedSize, quantity);
                navigation.navigate("Payment", {
                  listCartItemCheckout: [
                    { item, quantity, size: selectedSize },
                  ],
                });
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Buy now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
