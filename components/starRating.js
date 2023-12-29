import React from "react";
import { View } from "react-native";
import { StarIcon } from "react-native-heroicons/solid";



export default function StarRating({rate, size}){
  const totalStars = 5;
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate - fullStars < 0.5;

  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} name="star" size={size} color="gold" />);
    }
    if (hasHalfStar) {
      stars.push(<StarIcon key={stars.length} name="star-half" size={size} color="gold" />);
    }
    const remainingStars = totalStars - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<StarIcon key={stars.length + i} name="star" size={size} color="gray" />);
    }
    return stars;
  };

  return <View style={{ flexDirection: "row" }}>{renderStars()}</View>;
};
