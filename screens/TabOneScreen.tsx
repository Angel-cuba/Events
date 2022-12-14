import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Agenda, AgendaEntry, AgendaSchedule, DateData } from 'react-native-calendars';
import { View, Text } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getEvents } from './graphQueries/queries';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [items, setItems] = useState<AgendaSchedule>({});

  const getEventsSchedule = (events: []): AgendaSchedule => {
  const items: AgendaSchedule = {};

  events.forEach((event: any) => {
    const day = event.date.slice(0, 10)

    if (!items[day]) {
      items[day] = [];
    }
    items[day].push({ ...event as any, day, height: 50 });
  });

  return items;
};
  const { data, loading, error } = useQuery(getEvents);

  const events = data && getEventsSchedule(data.Events);

  const renderEachItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        style={[styles.item, { height: reservation.height }]}
        onPress={() => navigation.navigate('Modal', { id: reservation.id })}
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

  if(loading) {
    return <ActivityIndicator />;
  }
  if(error) {
      Alert.alert('Error', 'Something went wrong', error.message as any)
  }

  return (
    <View style={styles.container}>
      <Agenda
        items={events}
        renderItem={renderEachItem}
        renderEmptyDate={renderEmptyDate}
        showOnlySelectedDayItems
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 5,
    flex: 1,
    paddingTop: 30,
    paddingLeft: 10,
    marginTop: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});
