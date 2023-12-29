import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import { ArrowLeftCircleIcon, StarIcon } from "react-native-heroicons/outline";
import { themeColors } from "../theme";
import ReviewCard from "../components/reviewCard";
import { useNavigation } from "@react-navigation/native";

export default function ReviewScreen({ route }) {
  const item = route.params;
  const navigation = useNavigation();
  return (
    <ScrollView>
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
        <SafeAreaView className="space-y-4 flex-1 ">
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
              Ratings
            </Text>
          </View>

          <View className="px-4 flex-row justify-between items-center">
            <View style={themeColors.text} className="flex-row">
              <Text className="text-2xl font-semibold">{item.stars}</Text>
              <Text style={{ color: "gray" }} className="mt-3">
                / 5
              </Text>
            </View>
            <StarRating rate={item.stars} size={20}/>
          </View>

          <View className="mt-5 px-4">
              <FlatList
                data={item.reviews}
                renderItem={({ item }) => <ReviewCard item={item} />}
                scrollEnabled={false} //xu ly loi nesting flatlist trong scroll view
              />
            </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
}
