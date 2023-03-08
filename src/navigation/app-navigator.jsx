import Details from "../screens/Details/Details";
import Events from "../screens/Events/Events";
import QrScanner from "../screens/Qr-scanner/Qr-scanner";
import BottomNavigator from "./Bottom-tab-navigator";

const {
  createNativeStackNavigator,
} = require("@react-navigation/native-stack");

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="bottomNavigator"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={"bottomNavigator"} component={BottomNavigator} />

      <Stack.Screen name="home" component={Events} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="qr" component={QrScanner} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
