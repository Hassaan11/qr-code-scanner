import { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

import images from "../../../assets/index";
import { useDispatch } from "react-redux";
import { loginGoogle } from "../../Store/Admin/admin.action";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [auth, setAuth] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "162519831332-1du4g5et7km5t3sunoqrl75tkk550s65.apps.googleusercontent.com",
    iodClientId:
      "162519831332-d1rnthfciep6mt78csser9j8rhlip6lp.apps.googleusercontent.com",
    expoClientId:
      "162519831332-rpg5kadrv36r0hvuhmjlhgg9lc7hjg02.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type == "success") {
      setAccessToken(response.authentication.accessToken);
      dispatch(loginGoogle(response.authentication));
      getUserData();
      const persistAuth = async () => {
        await AsyncStorage.setItem(
          "auth",
          JSON.stringify(response.authentication)
        );
      };
      persistAuth();
    }
  }, [response]);

  useEffect(() => {
    const getPersistedAuth = async () => {
      const jsonValue = await AsyncStorage.getItem("auth");
      if (jsonValue != null) {
        const authFromJson = JSON.parse(jsonValue);
        setAuth(authFromJson);
        console.log(authFromJson);
      }
    };
    getPersistedAuth();
  }, []);

  const getUserData = async () => {
    console.log("getUserData");
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
      // navigation.navigate("home");
    });
  };

  // useEffect(() => {
  //   console.log("auth", auth);
  //   if (auth) {
  //     getUserData();
  //   }
  // }, [auth]);

  return (
    <View style={styles.container}>
      <View style={{ width: "60%" }}>
        <Image
          resizeMode="contain"
          source={images.logo}
          style={{ width: "100%" }}
        />
      </View>
      <Text style={styles.heading}>Your Growth Partner</Text>
      <TouchableOpacity
        onPress={
          accessToken
            ? getUserData
            : () => promptAsync({ useProxy: true, showInRecents: true })
        }
        style={{
          marginTop: 40,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1eae63",
          borderRadius: 8,
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      >
        <View>
          <Icon name="md-logo-google" color="white" size={30} />
        </View>
        <Text
          style={{
            color: "white",
            marginLeft: 10,
            fontSize: 14,
          }}
        >
          Login with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
