import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SearchBar } from "react-native-elements";

const SearchEvents = ({ eventsArray, events, setEvents }) => {
  const [searchValue, setSearchValue] = useState("");

  const searchFunction = (text) => {
    const updatedData = eventsArray?.filter((item) => {
      const item_data = `${item.title.toUpperCase()})`;
      const text_data = text.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setEvents(updatedData);
    setSearchValue(text);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search Here..."
        platform={Platform.OS}
        lightTheme
        round
        value={searchValue}
        onChangeText={(text) => searchFunction(text)}
        // autoCorrect={false}
      />
    </View>
  );
};

export default SearchEvents;

const styles = StyleSheet.create({
  container: {
    // marginTop: 30,
    backgroundColor: "#fafafa",
    padding: 2,
  },
});
