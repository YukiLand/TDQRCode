import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ScanScreen({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    getPermission();
  }, []);

  async function getPermission() {
    const { status } = await Camera.requestCameraPermissionsAsync();
    console.log('status :>> ', status);

    if (status === 'granted') {
      console.log('in');
    } else {
      alert('Permission to access camera was denied');
    }
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function handleBarCodeScanned({ data }) {
    setScanned(true);
    console.log('data :>> ', data);
    navigation.navigate('Users', { urlApi: data });
    setScanned(false);
  }

  const isFocused = useIsFocused();
  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera
          style={styles.camera}
          type={type}
          onBarCodeScanned={(result) => {
            handleBarCodeScanned(result);
            setScanned(!scanned);
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: 2000,
    marginVertical: 60,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
