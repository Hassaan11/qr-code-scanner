import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useNavigation } from "@react-navigation/native";
import * as AuthSession from "expo-auth-session";
import { useDispatch } from "react-redux";
import { signout } from "../../Store/Admin/admin.action";

const Settings = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const logout = async () => {
    const jasonAuth = await AsyncStorage.getItem("auth");
    const auth = JSON.parse(jasonAuth);
    console.log("auth", auth);
    await AuthSession.revokeAsync(
      {
        token: auth.accessToken,
      },
      {
        revocationEndpoint: "https://oauth2.googleapis.com/revoke",
      }
    );

    await AsyncStorage.removeItem("auth");
    dispatch(signout());
  };

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "700" }}>
        Settings
      </Text>
      <View style={styles.list}>
        <TouchableOpacity onPress={logout} style={styles.singleItem}>
          <>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.text}>Logout</Text>
            </View>
            <Fontisto name="angle-right" size={22} color={"#1eae63"} />
          </>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fafafa",
  },
  list: {
    marginTop: 10,
    width: "90%",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "lightgray",
    marginBottom: 10,
  },
  singleItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    paddingVertical: 15,
    paddingLeft: 10,
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 15,
    paddingLeft: 10,
    fontWeight: "700",
  },
});
