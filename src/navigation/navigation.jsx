import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppNavigator from "./app-navigator";
import AuthNavigator from "./auth-navigatior";

const { NavigationContainer } = require("@react-navigation/native");

const Navigations = () => {
  const [auth, setAuth] = useState("");
  const auth1 = useSelector((state) => state.login.auth);

  const getAuth = async () => {
    const jsonValue = await AsyncStorage.getItem("auth");
    return setAuth(JSON.parse(jsonValue));
  };

  useEffect(() => {
    getAuth();
  }, []);

  useEffect(() => {
    // getAuth();
    setAuth(auth1);
  }, [auth1]);
  return (
    <NavigationContainer>
      {auth ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigations;
