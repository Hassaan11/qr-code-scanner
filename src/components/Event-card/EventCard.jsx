import moment from "moment";

import { Text, StyleSheet, View } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";

const EventCard = ({ event }) => {
  return (
    <View style={styles.view}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesomeIcon name="calendar-alt" color="#1eae63" size={18} />
          <Text style={{ marginLeft: 5, fontSize: 14 }}>
            {" "}
            {""}
            {moment(event?.eventDate).format("ddd")}
            {", "}
            {moment(event?.eventDate).format("MMM")}{" "}
            {moment(event?.eventDate).date()}{" "}
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesomeIcon name="clock" color="#1eae63" size={18} />
          <Text style={{ marginLeft: 5, fontSize: 14 }}>
            {moment(event?.eventStartTime, "HH:mm:ss").format("hh:mm A")}
            {" - "}
            {moment(event?.eventEndTime, "HH:mm:ss").format("hh:mm A")}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginVertical: 15,
          borderBottomColor: "lightgray",
          borderBottomWidth: 0.5,
        }}
      />
      <View>
        <Text style={styles.title}>{event?.title}</Text>
        <Text style={styles.venue}>{event?.venue}</Text>
      </View>
    </View>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  view: {
    margin: 20,
    backgroundColor: "#FFFFFF",

    borderRadius: "25%",

    padding: 30,
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
