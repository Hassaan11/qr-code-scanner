import React from "react";
import { StyleSheet, SafeAreaView, Platform } from "react-native";

import { StatusBar } from "expo-status-bar";

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
