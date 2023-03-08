import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import AllEvents from "../screens/AllEvents/All-Events";
import Events from "../screens/Events/Events";
import Settings from "../screens/Settings/Settings";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Ongoing Events",
          tabBarIcon: () => <Icon name="home" color={"black"} size={20} />,
        }}
        name="home"
        component={Events}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Events",
          tabBarIcon: () => <Icon name="event" color={"black"} size={20} />,
        }}
        name="details"
        component={AllEvents}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: () => <Icon name="settings" color={"black"} size={20} />,
        }}
        name="settings"
        component={Settings}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
