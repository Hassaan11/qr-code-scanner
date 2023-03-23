import axios from "axios";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import DatePicker from "react-native-datepicker";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents, updateSuccess } from "../../Store/Admin/admin.action";
import SearchEvents from "../../components/Search-bar/Search-bar";
import EventCard from "../../components/Event-card/EventCard";
import moment from "moment";
import FontAwesomeIcon from "react-native-vector-icons/Ionicons";

const AllEvents = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [allEvents, setAllEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const events = useSelector((state) => state.admin.events);

  // const getAllEvent = async () => {
  //   const { data } = await axios.get("http://10.10.4.26:5000/api/admin/events");
  //   setEvents(data);
  // };
  useEffect(() => {
    dispatch(getAllEvents());
    // getAllEvent();
  }, []);

  useEffect(() => {
    setAllEvents(events);
  }, [events]);

  useEffect(() => {
    return () => {
      // Your cleanup code to be executed when the screen is unfocused
      dispatch(updateSuccess());
    };
  }, [isFocused]);

  const onSubmit = () => {
    const res = events.filter(
      (e) =>
        (moment(e?.eventDate).isBetween(moment(startDate), moment(endDate)) ||
          moment(e?.eventDate).isSame(moment(startDate)) ||
          moment(e?.eventDate).isSame(moment(endDate))) &&
        e
    );

    // {
    //   if (moment(e?.eventDate).isBetween(moment(startDate), moment(endDate))) {
    //     return e;
    //   }
    // });
    setAllEvents(res);
  };

  return (
    <>
      <SearchEvents
        setEvents={setAllEvents}
        events={allEvents}
        eventsArray={events}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Text style={styles.heading}>All Events</Text>
        <Text
          style={{
            position: "absolute",
            right: 20,
            top: 15,
          }}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesomeIcon name="filter" color="#1eae63" size={30} />
        </Text>
      </View>
      <ScrollView>
        {allEvents && allEvents.length > 0 ? (
          allEvents?.map((event) => {
            return (
              <TouchableOpacity
                key={event?.id}
                onPress={() =>
                  navigation.navigate("Details", {
                    eventId: event.id,
                    showScan: false,
                  })
                }
              >
                <EventCard event={event} />
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No event is happening now
          </Text>
        )}
      </ScrollView>
      <Modal
        style={{ margin: 0, marginTop: 40 }}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        animationInTiming={1000}
        animationOutTiming={300}
        isVisible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        customBackdrop={<View style={{ flex: 1 }} />}
      >
        <TouchableOpacity
          style={{
            // flex: 1,
            height: "100%",
            width: "100%",
            backgroundColor: "black",
            opacity: modalVisible ? 0.2 : 1,
          }}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        />
        <View style={styles.modal}>
          <View style={{ marginTop: 20 }}>
            <Text
              style={{ textAlign: "center", fontSize: 18, fontWeight: "700" }}
            >
              Filter{" "}
            </Text>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.text}>Start Date :</Text>

              <DatePicker
                style={styles.datePickerStyle}
                date={startDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    right: -5,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    borderColor: "gray",
                    alignItems: "flex-start",
                    borderWidth: 0,
                    borderBottomWidth: 1,
                  },
                  placeholderText: {
                    fontSize: 17,
                    color: "gray",
                  },
                  dateText: {
                    fontSize: 17,
                  },
                }}
                onDateChange={(date) => {
                  setStartDate(date);
                }}
              />
              <Text style={[styles.text, { marginTop: 10 }]}>End Date :</Text>
              <DatePicker
                style={styles.datePickerStyle}
                date={endDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={startDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    right: -5,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    borderColor: "gray",
                    alignItems: "flex-start",
                    borderWidth: 0,
                    borderBottomWidth: 1,
                  },
                  placeholderText: {
                    fontSize: 17,
                    color: "gray",
                  },
                  dateText: {
                    fontSize: 17,
                  },
                }}
                onDateChange={(date) => {
                  setEndDate(date);
                }}
              />

              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: "#1eae63",
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 30,
                }}
                onPress={onSubmit}
              >
                <Text style={{ color: "white" }}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AllEvents;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  modal: {
    height: "100%",
    // height: "auto",
    width: "50%",
    marginLeft: "auto",
    marginTop: "auto",
    backgroundColor: "white",

    borderRadius: 8,
    padding: 8,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
    alignItems: "center",
    paddingBottom: 50,
  },
});
