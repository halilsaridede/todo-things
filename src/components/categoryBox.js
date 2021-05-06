import React, {useState} from 'react';

import {StyleSheet, View, Text, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';

import {Container, Header, Title, Left, Right, Button, Body} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';


const CategoryBox = (props) => {
    //const {displayStateCon} = props;
  const [click, setClick] = useState(0);
  const [categoryInDetails, setCategoryInDetails] = useState();
  let [categoryInDetailsItems, setCategoryInDetailsItems] = useState({
      categoryNameItem: [],
      colorItem: [],
      backgroundColorItem: [],
  });


  let categoryNameArray = [
    {
      categoryName: 'URGENT',
      color: '#f0a89e',
      backgroundColor: '#efe5ec',
      ind: 0,
    },
    {
      categoryName: 'RUNNING',
      color: 'white',
      backgroundColor: '#5bc09d',
      ind: 1,
    },
    {
      categoryName: 'ONGOING',
      color: '#817ed7',
      backgroundColor: '#e1e4f8',
      ind: 2,
    },
  ];

    const CategoryBoxMap = (props) => {
        //const {displayState} = props;
      const [displayTrial, setDisplayTrial] = useState('none');
      return categoryNameArray.map((val, index) => (
          //<View style={[styles.boxWrapper, {backgroundColor: val.backgroundColor}]}>
          <View style={{
            marginTop: hp('1%'),
            alignItems: 'center',
              justifyContent: 'center',
          }}>
                  <View style={[{
                    height: 15,
                    width: 15,
                    backgroundColor: val.backgroundColor,
                    borderRadius: 10,
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                    justifyContent: 'center',
                  }, {display: 'flex'}]}>
                  <Text style={{
                      color: 'white',
                  }}>✓</Text>
              </View>
              <TouchableWithoutFeedback
                onPress={() => {
                  index ? setDisplayTrial('flex') : '';
                }}
              >
              <View style={[styles.boxWrapper, {backgroundColor: val.backgroundColor}]}>
                  <Text
                  key={index}
                  style={
                    click === 1
                        ? [styles.categoryName, {color: val.color}]
                        : [styles.categoryNameClick, {color: val.color}]
                  }
              >
                  {val.categoryName}
                </Text>
              </View>
          </TouchableWithoutFeedback>
          </View>
      ));
    };

      return (
          //<View style={[styles.boxWrapper, {backgroundColor: val.backgroundColor}]}>
          <View style={styles.container}>
              <CategoryBoxMap displauState={props.displayStateCon} />
              <View style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: wp('3%'),
                  height: hp('4%'),
                  width: wp('8%'),
                  borderWidth: 1,
                  borderRadius: hp('0.7%'),
                  borderColor: 'gray',
              }}>
              <TouchableWithoutFeedback
            onPress={() => alert('Press add')}
          >
              <View>
                  <Text style={{
                    fontSize: hp('3%'),
                      fontWeight: 'bold',
                      color: 'gray',
                  }}>+</Text>
              </View>
          </TouchableWithoutFeedback>
              </View>
          </View>
  );
};

/*
          <TouchableWithoutFeedback>
              <View>
                <Text>+</Text>
              </View>
          </TouchableWithoutFeedback>
     */

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
