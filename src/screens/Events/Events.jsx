import axios from "axios";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import Card from "../../components/Card/Card";
import { useNavigation } from "@react-navigation/native";
import { getOngoingEvents } from "../../Store/Admin/admin.action";
import { useDispatch, useSelector } from "react-redux";
import SearchEvents from "../../components/Search-bar/Search-bar";
import OngoignEventsCard from "../../components/OngoingEvent/OngoingEvent";

const Events = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [allEvents, setAllEvents] = useState([]);

  const events = useSelector((state) => state.admin.onGoingEvents);

  // "http://10.10.4.26:5000/api/admin/eventshappeningnow";
  // const getAllEvent = async () => {
  //   const { data } = await axios.get(
  //     "http://10.10.4.26:5000/api/admin/eventshappeningnow"
  //   );
  //   setEvents(data);
  // };
  useEffect(() => {
    dispatch(getOngoingEvents());
  }, []);

  useEffect(() => {
    setAllEvents(events);
  }, [events]);

  return (
    <>
      <SearchEvents
        setEvents={setAllEvents}
        events={allEvents}
        eventsArray={events}
      />
      <Text style={styles.heading}>OnGoing Events</Text>
      <ScrollView>
        {events && events.length > 0 ? (
          events?.map((event) => {
            return (
              <TouchableOpacity
                key={event.id}
                onPress={() =>
                  navigation.navigate("Details", {
                    eventId: event.id,
                  })
                }
              >
                <OngoignEventsCard event={event} />
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={{ textAlign: "center" }}>No event is happening now</Text>
        )}
      </ScrollView>
    </>
  );
};

export default Events;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});
