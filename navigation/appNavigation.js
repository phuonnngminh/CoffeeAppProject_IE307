import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { Dimensions, LogBox, Platform, Text, View } from "react-native";
import { themeColors } from "../theme";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeIcon as HomeOutline,
  HeartIcon as HeartOutline,
  ShoppingBagIcon as BagOutline,
} from "react-native-heroicons/outline";
import {
  HomeIcon as HomeSolid,
  HeartIcon as HeartSolid,
  ShoppingBagIcon as BagSolid,
} from "react-native-heroicons/solid";
import CartScreen from "../screens/CartScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import { useContext } from "react";
import { AuthContext } from "../constants/AuthContext";

import AuthScreen from "../screens/AuthScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import BankingCardScreen from "../screens/BankingCardScreen";
import AddBankingCardScreen from "../screens/AddBankingCardScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import PaymentScreen from "../screens/PaymentScreen";
import ReviewScreen from "../screens/ReviewScreen";
import PaymentDoneScreen from "../screens/PaymentDoneScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const ios = Platform.OS == "ios";
LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

export default function AppNavigation() {
  const { listProductCart, setListProductCart, userData } =
    useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          contentStyle: { backgroundColor: "white" },
        }}
      >
        {userData !== undefined ? (
          <Stack.Screen
            name="MainStack"
            component={MainStack}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: "white" },
      }}
    >
      <Stack.Screen name="Home" options={{ headerShown: false }}>
        {({ route }) => <HomeTabs route={route} />}
      </Stack.Screen>
      <Stack.Screen name="Product Details" options={{ headerShown: false }}>
        {({ route }) => <ProductDetailsScreen route={route} />}
      </Stack.Screen>
      <Stack.Screen name="Review Screen" options={{ headerShown: false }}>
        {({ route }) => <ReviewScreen route={route} />}
      </Stack.Screen>
      <Stack.Screen name="Payment" options={{ headerShown: false }}>
        {({ route }) => <PaymentScreen route={route} />}
      </Stack.Screen>
      <Stack.Screen name="Profile" options={{ headerShown: false }}>
        {({ route }) => <ProfileScreen route={route} />}
      </Stack.Screen>
      <Stack.Screen name="EditProfile" options={{ headerShown: false }}>
        {({ route }) => <EditProfileScreen route={route} />}
      </Stack.Screen>
      <Stack.Screen name="BankingCard" options={{ headerShown: false }}>
        {({ route }) => <BankingCardScreen route={route} />}
      </Stack.Screen>
      <Stack.Screen name="AddBankingCard" options={{ headerShown: false }}>
        {({ route }) => <AddBankingCardScreen route={route} />}
      </Stack.Screen>
      <Stack.Screen name="PaymentDone" options={{ headerShown: false }}>
        {({ route }) => <PaymentDoneScreen route={route} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

function HomeTabs({ handleAddToCart, size, quantity, setQuantity }) {
  const { listProductCart, favouriteItems } = useContext(AuthContext);
  const productCount = listProductCart.length;
  const favouritesCount = favouriteItems.length;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => menuIcons(route, focused),
        tabBarStyle: {
          marginBottom: 20,
          height: 75,
          alignItems: "center",

          borderRadius: 100,
          marginHorizontal: 20,
          backgroundColor: themeColors.bgLight,
        },
        tabBarItemStyle: {
          marginTop: ios ? 30 : 0,
        },
      })}
    >
      <Tab.Screen name="home">{() => <HomeScreen />}</Tab.Screen>
      <Tab.Screen
        name="favourite"
        component={FavouritesScreen}
        options={{
          tabBarBadge: favouritesCount > 0 ? favouritesCount : null,
          tabBarBadgeStyle: {
            color: "white",
            backgroundColor: "red",
            fontSize: 12,
            top: -10,
          },
        }}
      />
      <Tab.Screen
        name="cart"
        options={{
          tabBarBadge: productCount > 0 ? productCount : null,
          tabBarBadgeStyle: {
            backgroundColor: "red",
            color: "white",
            fontSize: 12,
            top: -10,
          },
        }}
      >
        {() => <CartScreen />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const menuIcons = (route, focused) => {
  let icon;

  if (route.name === "home") {
    icon = focused ? (
      <HomeSolid size="30" color={themeColors.bgLight} />
    ) : (
      <HomeOutline size="30" strokeWidth={2} color="white" />
    );
  } else if (route.name === "favourite") {
    icon = focused ? (
      <HeartSolid size="30" color={themeColors.bgLight} />
    ) : (
      <HeartOutline size="30" strokeWidth={2} color="white" />
    );
  } else if (route.name === "cart") {
    icon = focused ? (
      <BagSolid size="30" color={themeColors.bgLight} />
    ) : (
      <BagOutline size="30" strokeWidth={2} color="white" />
    );
  }

  let buttonClass = focused ? "bg-white" : "";
  return (
    <View
      className={"flex items-center rounded-full p-3 shadow " + buttonClass}
    >
      {icon}
    </View>
  );
};
