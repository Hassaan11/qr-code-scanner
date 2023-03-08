import moment from "moment";

import { Text, StyleSheet, View } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";

const OngoignEventsCard = ({ event }) => {
  return (
    <View style={styles.view}>
      <View style={{ padding: 30 }}>
        <Text style={styles.title}>{event?.title}</Text>
        <Text style={styles.venue}>{event?.venue}</Text>
      </View>
      <View
        style={{
          backgroundColor: "#1eae63",

          paddingHorizontal: 30,
          paddingVertical: 20,
          borderBottomRightRadius: "25%",
          borderBottomLeftRadius: "25%",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "500",
            marginBottom: 10,
            color: "white",
          }}
        >
          Arrival Time
        </Text>
        <Text style={{ fontSize: 14, color: "white" }}>
          {moment(event?.eventStartTime, "HH:mm:ss").format("hh:mm A")}
          {" - "}
          {moment(event?.eventEndTime, "HH:mm:ss").format("hh:mm A")}
        </Text>
      </View>
    </View>
  );
};

export default OngoignEventsCard;

const styles = StyleSheet.create({
  view: {
    zIndex: 1000,
    margin: 20,
    backgroundColor: "#FFFFFF",

    borderRadius: "25%",

    // padding: 30,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },

  venue: {
    fontSize: 14,
  },
});
