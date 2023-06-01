import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';

import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from 'react-native';
import axios from 'axios';

export default function ListUsers({ navigation, route }) {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const onLongPress = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log(event.target.value);
      alert('Utilisateur supprimé');
    }
  };

  function deleteUser(user) {
    axios
      .delete('http://10.74.1.68:8000/users/user/' + user.email)
      .then((res) => {
        console.log(res);
        getUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function getUsers() {
    setListUsers([]);
    await axios
      .get('http://10.74.1.68:8000/users/user')
      .then((res) => {
        setListUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <View style={styles.container}>
      {listUsers.length !== 0 ? (
        <View>
          {listUsers.map((user) => {
            return (
              <LongPressGestureHandler
                onHandlerStateChange={onLongPress}
                minDurationMs={800}
                onEnded={() => deleteUser(user)}
              >
                <Pressable
                  key={user.email}
                  onPress={() =>
                    navigation.navigate('UserDetail', { userData: user })
                  }
                >
                  <View style={styles.rowContainer}>
                    <Image
                      source={{ uri: user.picture.large }}
                      style={styles.roundImage}
                    />
                    <Text style={styles.majorInfos}>
                      {user.name.first} {user.name.last}
                      {user.gender == 'female' ? '♀' : '♂'}
                    </Text>
                    <Text style={styles.minorInfos}>{user.dob.age} ans</Text>
                  </View>
                </Pressable>
              </LongPressGestureHandler>
            );
          })}
        </View>
      ) : null}
      <Pressable
        onPress={() => navigation.navigate('Scan')}
        style={styles.scanBtn}
      >
        <Text>Scanner un nouvel utilisateur</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  roundImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 10,
  },
  majorInfos: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 30,
    width: '50%',
  },
  minorInfos: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 30,
    width: '20%',
  },
  scanBtn: {
    backgroundColor: '#EEEEEE',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
});
