import { StatusBar } from 'expo-status-bar';
import { Image, Platform, StyleSheet, Text } from 'react-native';
import { View } from '../components/Themed';
import event from '../assets/data/event.json';
import users from '../assets/data/users.json';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';

export default function ModalScreen() {
  const onJoin = () => {
    console.warn('Join');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.time}>
        <AntDesign name="calendar" size={24} color="black" />
        {'  '}
        {new Date(event.date).toDateString()}
      </Text>
      <View style={styles.footer}>
        {/*  User avatars */}
        <View style={styles.user}>
          {users.map((user) => (
            <Image style={styles.avatar} source={{ uri: user.avatarUrl }} />
          ))}
        </View>
        <CustomButton text="Join" onPress={onJoin} />
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 15,
    paddingBottom: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  time: {
    color: '#5c5e62',
    fontSize: 20,
  },
  footer: {
    marginTop: 'auto',
  },
  user: {
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
  }
});
