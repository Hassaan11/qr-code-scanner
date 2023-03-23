import { useEffect, useState } from "react";
import { ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  getOngoingEvents,
  updateSuccess,
} from "../../Store/Admin/admin.action";
import { useDispatch, useSelector } from "react-redux";
import SearchEvents from "../../components/Search-bar/Search-bar";
import OngoignEventsCard from "../../components/OngoingEvent/OngoingEvent";
import { useIsFocused } from "@react-navigation/native";

const Events = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [allEvents, setAllEvents] = useState([]);

  const events = useSelector((state) => state.admin.onGoingEvents);

  useEffect(() => {
    dispatch(getOngoingEvents());
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
                    showScan: true,
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
