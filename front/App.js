import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import ScanScreen from './components/ScanScreen';
import UsersScreen from './components/UsersScreen';
import ListUsersScreen from './components/ListUsers';
import UserDetailScreen from './components/UserDetailScreen';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const Stack = createNativeStackNavigator();

function Home({ navigation }) {
  return (
    <HomeScreen navigation={navigation}/>
  );
}

function Scan({ navigation }) {
  return (
    <ScanScreen navigation={navigation}/>
  );
}

function Users({ navigation, route }) {
  return (
    <UsersScreen navigation={navigation} route={ route } />
  );
}

function ListUsers({ navigation, route }) {
  return (
    <ListUsersScreen navigation={navigation} route={ route } />
  );
}

function UserDetail({ navigation, route }) {
  return (
    <UserDetailScreen navigation={navigation} route={route} />
  );
}

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Scan" component={Scan} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="ListUsers" component={ListUsers} />
          <Stack.Screen name="UserDetail" component={UserDetail} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>

  );
}

export default App;