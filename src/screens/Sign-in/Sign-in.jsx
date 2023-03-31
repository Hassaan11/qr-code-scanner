import { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import {
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  EXPO_CLIENT_ID,
  EXPO_CLIENT_SECRET,
  REDIRECT_URI,
} from "@env";

import images from "../../../assets/index";
import { useDispatch } from "react-redux";
import { googleLogin, setTokens } from "../../Store/Admin/admin.action";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [accessToken, setAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState();
  const [auth, setAuth] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      androidClientId: ANDROID_CLIENT_ID,
      iodClientId: IOS_CLIENT_ID,
      expoClientId: EXPO_CLIENT_ID,
      scopes: [
        "profile",
        "email",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "openid",
        "https://www.googleapis.com/auth/calendar.events",
        "https://www.googleapis.com/auth/calendar.readonly",
        "https://www.googleapis.com/auth/calendar",
      ],
      responseType: "code",
      shouldAutoExchangeCode: false,
      extraParams: {
        access_type: "offline",
      },
      prompt: "consent",
    },
    {
      authorizationEndpoint: "https://accounts.google.com/o/oauth2/v1/auth",
      tokenEndpoint: "https://oauth2.googleapis.com/token",
    }
  );

  useEffect(() => {
    if (response?.type == "success") {
      console.log("response", response);
      console.log("request", request);
      // dispatch(loginCode(response.params.code, request.codeVerifier));
      const getTokens = async () => {
        const accessToken = new AuthSession.AccessTokenRequest({
          clientId: EXPO_CLIENT_ID,
          clientSecret: EXPO_CLIENT_SECRET,
          code: response.params.code,
          responseType: "token",
          grantType: "implicit",
          redirectUri: REDIRECT_URI,
          scopes: [
            "profile",
            "email",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
            "openid",
            "https://www.googleapis.com/auth/calendar.events",
            "https://www.googleapis.com/auth/calendar.readonly",
            "https://www.googleapis.com/auth/calendar",
          ],
          extraParams: { code_verifier: request.codeVerifier },
        });

        console.log("accessToken", accessToken);

        const exchangeCode = async () => {
          return await AuthSession.exchangeCodeAsync(accessToken, {
            tokenEndpoint: "https://oauth2.googleapis.com/token",
          });
        };
        const tokens = await exchangeCode();
        console.log("tokens", tokens.accessToken);
        dispatch(setTokens(tokens));
        setAccessToken(tokens);
        setAuth(tokens);
        // setAccessToken(response.authentication.accessToken);
        // dispatch(loginGoogle(response.authentication));
        getUserData(tokens);
        const persistAuth = async () => {
          await AsyncStorage.setItem("auth", JSON.stringify(tokens));
        };
        await persistAuth();
      };
      getTokens();
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

  const getUserData = async (tokens) => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: {
          Authorization: `Bearer ${
            auth ? auth?.accessToken : tokens.accessToken
          }`,
        },
      }
    );

    userInfoResponse.json().then((data) => {
      console.log("data", data);
      setUserInfo(data);
      dispatch(googleLogin(data, tokens));
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
