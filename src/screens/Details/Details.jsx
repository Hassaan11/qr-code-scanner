import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";
import { getEventDetail } from "../../Store/Admin/admin.action";
import FontAwesomeIcon from "react-native-vector-icons/MaterialIcons";

const Details = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { eventId } = route.params;

  const eventDetail = useSelector((state) => state.admin.event);

  useEffect(() => {
    dispatch(getEventDetail(eventId));
  }, []);

  return (
    <>
      <View style={styles.nav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" color="black" size={20} />
        </TouchableOpacity>
        <Text style={styles.heading}>Events Description</Text>
      </View>

      <View style={styles.view}>
        <View
          style={{
            position: "absolute",
            left: "50%",
            right: "50%",
            top: "-4%",
            backgroundColor: "#1eae63",
            borderRadius: 12,
            width: 60,
            height: 60,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesomeIcon name="event" color="white" size={40} />
        </View>
        <View>
          <View style={{ marginTop: 30 }}>
            <Text style={styles.title}>{eventDetail?.title}</Text>
            <Text style={styles.venue}>{eventDetail?.venue}</Text>
            <Text style={[styles.venue, { color: "#1eae63" }]}>
              {moment(eventDetail?.eventDate).format("MMM")}{" "}
              {moment(eventDetail?.eventDate).date()}
              {", "}
              {moment(eventDetail?.eventStartTime, "HH:mm:ss").format(
                "hh:mm A"
              )}
              {" - "}
              {moment(eventDetail?.eventEndTime, "HH:mm:ss").format("hh:mm A")}
            </Text>
          </View>
          <View
            style={{
              marginVertical: 15,
              borderBottomColor: "lightgray",
              borderBottomWidth: 0.5,
            }}
          />
          <View style={{ marginTop: 5 }}>
            <Text style={styles.text}>{eventDetail?.description}</Text>
          </View>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity
            style={{
              backgroundColor: "#1eae63",
              width: "100%",
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
            onPress={() =>
              navigation.navigate("qr", {
                eventId: eventDetail?.id,
              })
            }
          >
            <Text style={styles.qrText}>Scan Qr Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  nav: {
    marginTop: 0,
    marginLeft: 20,
    flexDirection: "row",
    height: 50,
    width: "100%",
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginLeft: 15,
  },
  view: {
    margin: 20,
    marginTop: 40,
    backgroundColor: "#FFFFFF",

    borderRadius: "25%",

    padding: 20,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    flex: 1,
    position: "relative",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  venue: {
    fontSize: 14,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
  center: {
    alignItems: "center",
  },
  r1: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  c1: {
    marginTop: 10,
    flexDirection: "column",
  },
  c2: {
    marginTop: 10,
    flexDirection: "column",
  },
  btn: {
    width: "100%",
    // justifyContent: "center",
    // alignItems: "center",

    marginVertical: 20,
  },
  qrText: {
    fontSize: 16,
    color: "white",
    padding: 5,
  },
});
