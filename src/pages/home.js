import React, {useEffect, useState, useCallback} from 'react';

import {ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';

import {Container, Button, Left, Right, Body} from 'native-base';

import {Actions} from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import CalendarStrip from 'react-native-calendar-strip';

import SplashScreen from 'react-native-splash-screen';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

//components
import HeaderComponent from '../components/header';
import TaskBox from '../components/taskBox';
import AddTaskScreen from './addTaskScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';

const CalendarStripSquare = () => (
    <View style={{
        flex: 1,
        borderBottomWidth: 1,
        marginLeft: wp('5%'),
        marginRight: wp('5%'),
        borderColor: 'silver'
    }}>
    <CalendarStrip
      scrollable
    style={{
        flex: 1,
        backgroundColor: '#f0f4fd',
    }}
    selectedDate={new Date()}
        markedDatesStyle={{backgroundColor: 'blue'}}
      calendarColor={'#3343CE'}
      calendarHeaderStyle={{color: 'black'}}
      dateNumberStyle={{color: 'black'}}
    dateNameStyle={{
        color: 'silver',
        fontSize: hp('1.5%')
    }}
      iconContainer={{flex: 0.1}}
    />
  </View>
);

const Home = () => {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const addTaskHandle = () => {
    Actions.addTaskScreen();
  };

  useEffect(async () => {
    SplashScreen.hide();
    forceUpdate();
  }, [forceUpdate])

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="white"
      />
      <View style={styles.containerIn1}>
        <HeaderComponent />
      </View>
      <Container style={styles.containerIn2}>
        <View style={styles.inContainer1}>
          <View style={styles.leftInTopSquareDateDetailsArticle}>
            <Body style={styles.dateAtDayMouthYearArticle}>
              <Left />
              <Text
                style={{
                  fontSize: 14,
                  color: 'gray',
                }}>
                May 01, 2021
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: '900',
                }}>
                Today
              </Text>
              <Right />
            </Body>
          </View>
          <View style={styles.rightInTopSquareDateDetailsArticle}>
            <Body style={styles.addTaskButtonCss}>
              <Left />
              <Button warning style={{
                backgroundColor: '#ef6850',
                  width: wp('30%'),
                  marginRight: wp('10%'),
                      justifyContent: 'center',
                  borderRadius: hp('1.5%'),
              }} onPress={addTaskHandle}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '800',
                      textAlign: 'center',
                      justifyContent: 'center',
                  }}>
                  {' '}
                  + Add Task{' '}
                </Text>
              </Button>
              <Right />
            </Body>
          </View>
        </View>
        <View style={styles.inContainer2}>
          <CalendarStripSquare />
        </View>
      </Container>
      <View style={styles.containerIn3}>
        <ScrollView>
          <TaskBox />
        </ScrollView>
      </View>
      <View style={styles.containerIn4} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: hp('5%'),
    flex: 1,
    backgroundColor: '#f0f4fd',
  },
  containerIn1: {
    flex: 0.2,
  },
  containerIn2: {
    flex: 1,
  },
  containerIn3: {
    flex: 2,
    width: '100%',
  },
  containerIn4: {
    flex: 0.5,
    display: 'none',
  },
  inContainer1: {
    flex: 1,
    backgroundColor: '#f0f4fd',
    flexDirection: 'row',
  },
  inContainer2: {
    flex: 1,
    backgroundColor: '#f0f4fd',
  },
  leftInTopSquareDateDetailsArticle: {
    flex: 1,
    backgroundColor: '#f0f4fd',
  },
  rightInTopSquareDateDetailsArticle: {
    flex: 1,
  },
  dateAtDayMouthYearArticle: {
    marginLeft: wp('-20%'),
  },
  textCss: {
    fontWeight: '600',
    fontSize: 20,
  },
  square: {
    width: wp('15%'),
    height: hp('7%'),
    backgroundColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: hp('1%'),
  },
  squareWrap: {
    marginBottom: hp('10%'),
  },
  sumCss: {
    fontSize: hp('4%'),
  },
  addListCss: {
    fontSize: 17,
    marginTop: hp('2%'),
  },
  addTaskButtonCss: {
    marginRight: wp('-20%'),
  },
});

export default Home;
