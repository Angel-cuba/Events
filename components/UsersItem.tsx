import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

type UserItemProps = {
  user: any,
};

const UserItem = ({ user }: UserItemProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatarUrl.slice(-5) === 'blank' ? 'https://res.cloudinary.com/dqaerysgb/image/upload/v1651333819/Earth-Planet-PNG-Picture_btbdtv.png' : user.avatarUrl }} style={styles.image} />
      <Text style={styles.name}>{user.displayName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    margin: 5,
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  image: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
  },
  name: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default UserItem;