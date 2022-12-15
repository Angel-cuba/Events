import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Alert, Image, Platform, StyleSheet, Text } from 'react-native';
import { View } from '../components/Themed';
import users from '../assets/data/users.json';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { useQuery, useMutation } from '@apollo/client';
import { getEvent, JoinEvent } from './graphQueries/queries';
import { useUserId } from '@nhost/react';

export default function ModalScreen({ route }: any) {
  const id = route?.params?.id;
  const userId = useUserId();
  const onJoin = async () => {
    try {
      await justJoinEvent({ variables: { userId, eventId: id } });
    } catch (error: any) {
      Alert.alert('Error', 'Something went wrong', error?.message);
    }
  };

  const { data, loading, error } = useQuery(getEvent, { variables: { id } });

  const event = data?.Events_by_pk;

  const [justJoinEvent] = useMutation(JoinEvent);

  const joined = event?.EventObserver?.some((observer: any) => observer.user.id === userId);

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

  const displayedUsers = (event?.EventObserver || [])
    .slice(0, 7)
    .map((observer: any) => observer.user);

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
          {event &&
            displayedUsers.map((user: any, index: number) => (
              <Image
                key={user?.id}
                style={[styles.avatar, { transform: [{ translateX: -20 * index }] }]}
                source={{
                  uri:
                    user?.avatarUrl.slice(-5) !== 'blank'
                      ? user?.avatarUrl
                      : 'https://res.cloudinary.com/dqaerysgb/image/upload/v1648218398/istockphoto-1132926013-612x612_t1xwec.jpg',
                }}
              />
            ))}
          <View
            style={[styles.avatar, { transform: [{ translateX: -18 * displayedUsers.length }] }]}
          >
            <Text>+{event?.EventObserver.length - displayedUsers.length}</Text>
          </View>
        </View>
        {
          // Join button
          !joined ? <CustomButton text="Join" onPress={onJoin} /> : null
        }
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
