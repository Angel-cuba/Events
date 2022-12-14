import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Image, Platform, StyleSheet, Text } from 'react-native';
import { View } from '../components/Themed';
import users from '../assets/data/users.json';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { useQuery } from '@apollo/client';
import { getEvent } from './graphQueries/queries';

export default function ModalScreen({ route }: any) {
  const id = route?.params?.id;
  const onJoin = () => {};

  const { data, loading, error } = useQuery(getEvent, { variables: { id } });

  const event = data?.Events_by_pk;
  if (error) {
    return (
      <View>
        <Text style={styles.title}>Something went wrong.</Text>
        <Text style={styles.time}>Please try again later!!!</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (loading) {
    return <ActivityIndicator />;
  }

  const displayedUsers = users.slice(0, 7);

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
          {displayedUsers.map((user, index) => (
            <Image
              key={user.id}
              style={[styles.avatar, { transform: [{ translateX: -20 * index }] }]}
              source={{ uri: user.avatarUrl }}
            />
          ))}
          <View
            style={[styles.avatar, { transform: [{ translateX: -18 * displayedUsers.length }] }]}
          >
            <Text>+{users.length - displayedUsers.length}</Text>
          </View>
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
    marginRight: 3,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    backgroundColor: '#b6b2b261',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
