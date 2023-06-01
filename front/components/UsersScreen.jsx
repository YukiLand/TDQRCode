import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
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

export default function ScanScreen({ navigation, route }) {
  const [urlApi, setUrlApi] = useState('');
  const [userScan, setUserScan] = useState({});

  useEffect(() => {
    if (route.params?.urlApi != null && route.params?.urlApi != '') {
      setUrlApi(route.params.urlApi);
    }
  }, []);

  useEffect(() => {
    axios.get(urlApi).then((res) => {
      setUserScan(res.data.results[0]);
    });
  }, [urlApi]);

  function registerUser(data) {
    axios
      .post('http://10.74.1.68:8000/users/user', data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    navigation.navigate('Home');
  }

  function display_date(date) {
    let cutDate = date.split('T');
    let dateArray = cutDate[0].split('-');
    return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
  }

  return (
    <View style={styles.container}>
      {userScan && userScan.name != null ? (
        <View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={{ uri: userScan.picture.large }}
              style={styles.image}
            />
          </View>
          <Text style={styles.majorInfos}>
            {userScan.gender == 'female' ? '♀' : '♂'}
            {userScan.name.first} {userScan.name.last}
          </Text>
          <Text style={styles.majorInfos}>
            {display_date(userScan.dob.date)} ({userScan.dob.age} ans)
          </Text>
          {/* <MapView
            style={{ flex: 1, height: 400, width: '100%' }}
            initialRegion={{
              latitude: 17,
              longitude: 18,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: 17,
                longitude: 18,
              }}
              title='Ma position'
            />
          </MapView> */}

          <Pressable
            onPress={() => registerUser(userScan)}
            style={styles.submitButton}
          >
            <Text>Enregistrer</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Scan')}
            style={styles.scanBtn}
          >
            <Text>Scanner à nouveau</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Home')}
            style={styles.cancelButton}
          >
            <Text>Retourner à l'accueil</Text>
          </Pressable>
        </View>
      ) : (
        <Text>Scan QR Code</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: '50%',
    height: 200,
    borderRadius: 10,
    margin: 10,
  },
  majorInfos: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  scanBtn: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
