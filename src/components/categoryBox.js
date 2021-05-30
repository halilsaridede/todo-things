import React, { useState, useCallback } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Left,
  Right,
  Button,
  Body,
} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';

let categoryNameArray = [
  {
    categoryName: 'URGENT',
    color: '#f0a89e',
    backgroundColor: '#efe5ec',
    ind: 'flex',
  },
  {
    categoryName: 'RUNNING',
    color: 'white',
    backgroundColor: '#5bc09d',
    ind: 'none',
  },
  {
    categoryName: 'ONGOING',
    color: '#817ed7',
    backgroundColor: '#e1e4f8',
    ind: 'none',
  },
];

const CategoryBoxMap = props => {
  //const {displayState} = props;
  const [displayState, setDisplayState] = useState('none');
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  return categoryNameArray.map((val, index) => (
    //<View style={[styles.boxWrapper, {backgroundColor: val.backgroundColor}]}>
    <View
      style={{
        marginTop: hp('1%'),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={[
          {
            height: 15,
            width: 15,
            backgroundColor: val.backgroundColor,
            borderRadius: 10,
            alignItems: 'center',
            alignSelf: 'flex-end',
            justifyContent: 'center',
            display: val.ind, 
          },
        ]}>
        <Text
          style={{
            color: 'white',
          }}>
          ✓
        </Text>
      </View>
      <TouchableWithoutFeedback
        onPress={async() => {
          try {
            await AsyncStorage.setItem('categoryItem', val.categoryName);
          } catch (e) {
            console.log(e);
          }
          if(displayState !== val.ind) {
            setDisplayState('flex'); 
            val.ind = displayState;
            //categoryNameArray.map(val => (val.ind)) 
          }
          else {
            setDisplayState('none');
            val.ind = displayState;
          }
        }}>
        <View
          style={[styles.boxWrapper, { backgroundColor: val.backgroundColor }]}>
          <Text
            key={index}
            style={
              val.ind === 'yes'
                ? [styles.categoryName, { color: val.color }]
                : [styles.categoryNameClick, { color: val.color }]
            }>
            {val.categoryName}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  ));
};

const CategoryBox = props => {
  //const {displayStateCon} = props;
  const [click, setClick] = useState(0);
  const [categoryInDetails, setCategoryInDetails] = useState();
  let [categoryInDetailsItems, setCategoryInDetailsItems] = useState({
    categoryNameItem: [],
    colorItem: [],
    backgroundColorItem: [],
  });

  return (
    //<View style={[styles.boxWrapper, {backgroundColor: val.backgroundColor}]}>
    <View style={styles.container}>
      <CategoryBoxMap displayState="none" />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: wp('3%'),
          height: hp('4%'),
          width: wp('8%'),
          borderWidth: 1,
          borderRadius: hp('0.7%'),
          borderColor: 'gray',
        }}>
        <TouchableWithoutFeedback onPress={() => alert('Press add')}>
          <View>
            <Text
              style={{
                fontSize: hp('3%'),
                fontWeight: 'bold',
                color: 'gray',
              }}>
              +
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    marginBottom: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxWrapper: {
    width: wp('20%'),
    height: hp('3%'),
    backgroundColor: 'green',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginBottom: hp('1%'),
    marginLeft: hp('1%'),
  },
  categoryName: {
    textAlign: 'center',
    fontWeight: '700',
  },
  categoryNameClick: {
    textAlign: 'center',
    fontWeight: '700',
  },
});

export default CategoryBox;
