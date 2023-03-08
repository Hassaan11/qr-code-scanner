import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QrScanner from "./src/screens/Qr-scanner/Qr-scanner";
import Events from "./src/screens/Events/Events";
import { StatusBar } from "expo-status-bar";
import Details from "./src/screens/Details/Details";
import Login from "./src/screens/Sign-in/Sign-in";
import BottomNavigator from "./src/navigation/Bottom-tab-navigator";
import AuthNavigator from "./src/navigation/auth-navigatior";
import AppNavigator from "./src/navigation/app-navigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import store from "./src/Store/store";
import Navigations from "./src/navigation/navigation";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <Navigations />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? 40 : 0,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
