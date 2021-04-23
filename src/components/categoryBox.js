import React from 'react';

import {StyleSheet, View, Text} from 'react-native';

import {Container, Header, Title, Left, Right, Button, Body} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CategoryBox = () => {
  return (
    <View style={styles.container}>
      <View style={styles.boxWrapper}>
        <Text style={styles.categoryName}>URGENT</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //justifyContent: 'center',
    //alignItems: 'center',
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    marginTop: wp('3%'),
    marginBottom: wp('3%'),
  },
  boxWrapper: {
    width: wp('20%'),
    height: hp('3%'),
    backgroundColor: 'green',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    textAlign: 'center',
    color: 'white',
  },
});

export default CategoryBox;
