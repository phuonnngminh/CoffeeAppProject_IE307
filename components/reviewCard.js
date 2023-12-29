import React from "react";
import { SafeAreaView, Text, View, Image } from "react-native";
import { themeColors } from "../theme";
import StarRating from "../components/starRating";

export default function ReviewCard({ item }) {
  return (
    <SafeAreaView style={{  paddingBottom: 8 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
        <Image
          source={require("../assets/images/avatarReviewer.jpg")}
          style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ color: themeColors.text, fontWeight: "bold", marginBottom: 4 }}>{item.username}: </Text>
          <StarRating rate={4} size={14}/>
          <Text style={{ color: themeColors.text, marginTop: 3 }} numberOfLines={2}>{item.review}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
