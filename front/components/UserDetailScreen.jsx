import { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Linking from 'expo-linking';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

export default function UserDetailScreen({ navigation, route }) {
  const [userData, setUserData] = useState('');

  useEffect(() => {
    console.log(route.params);
    if (route.params?.userData != null) {
      setUserData(route.params.userData);
    }
  }, []);

  function display_date(date) {
    let cutDate = date.split('T');
    let dateArray = cutDate[0].split('-');
    return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
  }

  return (
    <View style={styles.container}>
      {userData && userData.name != null ? (
        <View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={{ uri: userData.picture.large }}
              style={styles.image}
            />
          </View>
          <Text style={styles.majorInfos}>
            {userData.gender == 'female' ? '♀' : '♂'}
            {userData.name.first} {userData.name.last}
          </Text>
          <Text style={styles.majorInfos}>
            {display_date(userData.dob.date)} ({userData.dob.age} ans)
          </Text>
          <Pressable
            onPress={() => Linking.openURL(`mailto:${userData.email}`)}
          >
            <Text style={styles.emailInfo}>{userData.email}</Text>
          </Pressable>
          <Pressable onPress={() => Linking.openURL(`tel:${userData.phone}`)}>
            <Text style={styles.phoneInfo}>{userData.phone}</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              Linking.openURL(
                'google.navigation:q=' +
                  userData.location.coordinates.latitude +
                  '+' +
                  userData.location.coordinates.longitude
              )
            }
          >
            <Text style={styles.adressInfo}>
              {userData.location.street.number} {userData.location.street.name}{' '}
              {userData.location.postcode} {userData.location.city}{' '}
              {userData.location.country}
            </Text>
          </Pressable>
          <Text style={styles.adressInfo}></Text>
          <Text style={styles.adressInfo}></Text>

          {/* <View>
            <MapView
              style={{ height: 400, width: 400 }}
              initialRegion={{
                latitude: userData.location.coordinates.latitude,

                longitude: userData.location.coordinates.longitude,

                latitudeDelta: 0.0922,

                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: userData.location.coordinates.latitude,

                  longitude: userData.location.coordinates.longitude,
                }}
                title='Ma position'
              />
            </MapView>
          </View> */}
          <Pressable
            onPress={() => navigation.navigate('UserList')}
            style={styles.cancelButton}
          >
            <Text>Retourner à la liste</Text>
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
  emailInfo: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
  phoneInfo: {
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 10,
  },
  adressInfo: {
    fontSize: 15,
    textAlign: 'center',
    marginVertical: 5,
  },
});
