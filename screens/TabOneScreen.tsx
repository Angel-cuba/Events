import { Alert, FlatList, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Agenda, AgendaEntry, AgendaSchedule, DateData } from 'react-native-calendars';
import { View, Text } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import events from '../assets/data/events.json'
import { useState } from 'react';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [items, setItems] = useState<AgendaSchedule>({});


const renderEachItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "black" : "#43515c";

    return (
      <TouchableOpacity
        style={[styles.item, { height: reservation.height }]}
        onPress={() => Alert.alert(reservation.name)}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  const loadItems = (day: DateData) => {
    setItems(events);
  };

   const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Agenda items={events} renderItem={renderEachItem} renderEmptyDate={renderEmptyDate}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },

});
