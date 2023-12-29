import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useState, useContext } from "react";
import { AuthContext } from "../constants/AuthContext";
import { StatusBar } from "expo-status-bar";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";
import { themeColors } from "../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { XCircle } from "react-native-feather";
import { useNavigation } from "@react-navigation/native";
import {
  StarIcon,
  NoSymbolIcon,
  ShoppingBagIcon,
} from "react-native-heroicons/solid";

import React from "react";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

const FavouritesScreen = ({route}) => {
  const item = route.param;
  const { favouriteItems, setFavouriteItems } = useContext(AuthContext);
  const navigation = useNavigation();
  const handleRemoveItem = (item) => {
    setFavouriteItems((prev) =>
      prev.filter((favItem) => favItem.id !== item.id)
    );
  };

  return (
    <View className="flex-1 relative">
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

      <SafeAreaView className={ios ? "-mb-8" : ""}>
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
            Favourites
          </Text>
        </View>

        <View className="px-5 mt-6 ">
          <FlatList
            data={favouriteItems}
            keyExtractor={(item) => item.id}
            bounces={false}
            renderItem={({ item }) => {
              return (
                <View style={styles.FavContainer}>
                  <View className="flex-row">
                    <View style={styles.favShadow}>
                      <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
                        <Image
                          source={item.image}
                          style={{ height: 80, width: 80 }}
                        />
                      </View>
                    </View>

                    <View className="flex-column">
                      <Text className="font-semibold mb-3" style={styles.favName}>
                        {item.name}
                      </Text>

                      <View
                        style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                        className="flex-row items-center rounded-3xl px-3 space-x-1 w-16 mb-2"
                      >
                        <StarIcon size="10" color="white" />
                        <Text className=" font-semibold text-white">
                          {item.stars}
                        </Text>
                      </View>

                      <Text
                        style={{ fontSize: 16 }}
                        className="text-white font-bold mt-1 p-1"
                      >
                        $ {item.sizes[0].price}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.DetailIcon}
                      onPress={() =>
                        navigation.navigate("Product Details", { ...item })
                      }
                    >
                      <ShoppingBagIcon size="38" color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.RemoveIcon}
                      onPress={() => handleRemoveItem(item)}
                    >
                      <XCircle style={{ color: "white" }} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  FavContainer: {
    borderRadius: 40,
    backgroundColor: themeColors.bgDark,
    height: ios ? height * 0.13 : height * 0.15,
    width: width * 0.9,
    marginVertical: 10,
  },
  favShadow: {
    shadowColor: "black",
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
  },
  favName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 8,
  },
  RemoveIcon: {
    justifyContent: "center",
    position: "absolute",
    right: 20,
    marginVertical: 15,
  },
  DetailIcon: {
    justifyContent: "center",
    position: "absolute",
    right: 75,
    marginVertical: 35,
  },
});
