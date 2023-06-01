import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const LeftSwipeActions = () => {
  return (
    <View
      style={{
        backgroundColor: '#802C6E',
      }}
    >
      <Text
        style={{
          color: '#802C6E',
        }}
      >
        Test
      </Text>
    </View>
  );
};
const rightSwipeActions = () => {
  return (
    <View
      style={{
        backgroundColor: '#802C6E',
      }}
    >
      <Text
        style={{
          color: '#802C6E',
        }}
      >
        Test
      </Text>
    </View>
  );
};
const HomeScreen = ({ navigation }) => {
  function swipeFromLeftOpen() {
    navigation.navigate('Scan');
  }
  function swipeFromRightOpen() {
    navigation.navigate('ListUsers');
  }
  return (
    <SafeAreaView style={styles.container}>
      <Swipeable
        renderLeftActions={LeftSwipeActions}
        onSwipeableLeftOpen={() => swipeFromLeftOpen()}
        renderRightActions={rightSwipeActions}
        onSwipeableRightOpen={() => swipeFromRightOpen()}
      >
        <View
          style={{
            backgroundColor: '#802C6E',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 0,
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              padding: 20,
              fontWeight: 'bold',
            }}
          >
            People Around Me
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              position: 'absolute',
              bottom: 20,
            }}
          >
            Swipe to the left to scan a new user
          </Text>
          <Text
            style={{
              color: '#fff',
              fontSize: 16,
              position: 'absolute',
              bottom: 50,
            }}
          >
            Swipe to the right to see people
          </Text>
        </View>
      </Swipeable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default HomeScreen;
