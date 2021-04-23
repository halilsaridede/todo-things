import React from 'react';

import {StyleSheet, View, Text} from 'react-native';

import {Container, Header, Title, Left, Right, Button, Body} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const HeaderComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>Todo Things</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: wp('5%'),
    fontWeight: '700',
  },
});

export default HeaderComponent;
