import moment from "moment";

import { Text, StyleSheet, View } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/MaterialIcons";

const Card = ({ event }) => {
  return (
    <View style={styles.view}>
      <View style={styles.center}>
        <FontAwesomeIcon name="event" color="black" size={40} />
        <Text style={styles.title}>{event?.title}</Text>
      </View>
      <View style={styles.r1}>
        <View style={styles.c1}>
          <Text style={{ fontWeight: "bold" }}>Venue</Text>
          <Text style={styles.text}>{event?.venue}</Text>
        </View>
        <View style={styles.c1}>
          <Text style={{ fontWeight: "bold" }}>Date</Text>
          <Text style={styles.text}>
            {moment(event.eventDate).format("DD-MM-YYYY")}
          </Text>
        </View>
      </View>
      <View style={styles.r1}>
        <View style={styles.c1}>
          <Text style={{ fontWeight: "bold" }}>Start Time</Text>
          <Text style={styles.text}>{event?.eventStartTime}</Text>
        </View>
        <View style={styles.c1}>
          <Text style={{ fontWeight: "bold" }}>End Time</Text>
          <Text style={styles.text}>{event?.eventEndTime}</Text>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  view: {
    margin: 20,
    backgroundColor: "#FFFFFF",

    borderRadius: 8,

    padding: 20,
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
    fontWeight: "700",
  },
  text: {
    fontSize: 12,
  },
  center: {
    alignItems: "center",
  },
  r1: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  c1: {
    marginTop: 10,
    flexDirection: "column",
    // alignItems: "center",
  },
});
