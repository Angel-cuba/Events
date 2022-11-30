import { StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import events from '../assets/data/events.json'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <Agenda items={events}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
