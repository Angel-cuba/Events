import users from '../assets/data/users.json';
import { FlatList } from 'react-native';
import UserItem from '../components/UsersItem'

const UsersScreen = () => {
  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <UserItem user={item} />}
    />
  );
};

export default UsersScreen;