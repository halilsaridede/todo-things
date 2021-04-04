import React from 'react';

import {StyleSheet, View, Text} from 'react-native';

import {Container, Header, Title, Left, Right, Button, Body} from 'native-base';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import LinearGradient from 'react-native-linear-gradient';

const HeaderComponent = () => {
  return (
    <View style={styles.container}>
      <Text>Rockstar</Text>
      <View style={styles.containerIn1}>
        <Text>1</Text>
      </View>
      <View style={styles.containerIn2}>
        <Text>1</Text>
      </View>
      <View style={styles.containerIn3}>
        <Text>1</Text>
      </View>
      <View style={styles.containerIn4}>
        <Text>1</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //marginTop: wp('5%'),
  },
  headerContainer: {
    backgroundColor: 'purple',
    flex: 1,
  },
  containerIn1: {
    flex: 2,
    backgroundColor: 'pink',
  },
  containerIn2: {
    flex: 1,
    backgroundColor: 'black',
  },
  containerIn3: {
    flex: 1,
    backgroundColor: 'orange',
  },
  containerIn4: {
    flex: 1,
    backgroundColor: 'gray',
  },
});

export default HeaderComponent;
