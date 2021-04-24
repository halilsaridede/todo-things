import React, {useState} from 'react';

import {StyleSheet, View, Text} from 'react-native';

import {Container, Header, Title, Left, Right, Button, Body} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CategoryBox = () => {

    const [click, setClick] = useState(0);

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


    const CategoryBoxPrint = () => {
      return categoryNameArray.map((val, index) => (
              <View style={[styles.boxWrapper, {backgroundColor: val.backgroundColor}]}>
                  <Text
                  style={
                    click === 1
                        ? [styles.categoryName, {color: val.color}]
                        : [styles.categoryNameClick, {color: val.color}]
                  }
                  onPress={() => {
                      //click === 0 ? setClick(1) : setClick(0);
                      val.ind === index ? setClick(val.ind) : '';
                  }}
                  //style={[styles.categoryName, {color: val.color}]}>
              >
                  {val.categoryName}
                </Text>
              </View>
      ));
    };

  return (
    <View style={styles.container}>
        <CategoryBoxPrint />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    marginTop: wp('5%'),
    marginBottom: wp('3%'),
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
