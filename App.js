import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import AppNavigation from "./navigation/appNavigation";

import { AuthProvider } from "./constants/AuthContext";
import CartScreen from "./screens/CartScreen";
import { NavigationContainer } from "@react-navigation/native";
import AddToCart from "./components/addToCart";

export default function App() {
  return (
    <AuthProvider>
      {/* <AppNavigation/> */}
      <AddToCart/>
    </AuthProvider>
  );
}
