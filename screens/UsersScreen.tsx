import { ActivityIndicator, FlatList, Text } from 'react-native';
import UserItem from '../components/UsersItem';
import { gql, useQuery } from '@apollo/client';

  const getUsersQuery = gql`
    query {
      users {
        id
        displayName
        avatarUrl
      }
    }
  `;
const UsersScreen = () => {
  const { data, loading, error } = useQuery(getUsersQuery);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>{error.message}</Text>;
  }

  return <FlatList data={data.users} renderItem={({ item }) => <UserItem user={item} />} />;
};

export default UsersScreen;
