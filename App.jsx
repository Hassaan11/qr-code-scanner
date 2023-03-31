import React from "react";
import { StyleSheet, SafeAreaView, Platform } from "react-native";

import { StatusBar } from "expo-status-bar";

import { Provider } from "react-redux";
import { persistor, store } from "./src/Store/store";
import Navigations from "./src/navigation/navigation";

import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <PersistGate loading={null} persistor={persistor}>
          <Navigations />
        </PersistGate>
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
