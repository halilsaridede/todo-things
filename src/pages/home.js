import React, { useEffect, useState, useCallback } from 'react';

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  BackHandler,
} from 'react-native';

import { Container, Button, Left, Right, Body } from 'native-base';

import PushNotification from 'react-native-push-notification';

import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import CalendarStrip from 'react-native-calendar-strip';

import SplashScreen from 'react-native-splash-screen';

import Moment from 'moment';

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

import {
  showNotification,
  handleScheduleNotification,
  handleCancel,
  handleDeleteChannel,
} from '../pushNotification/notification';

const { height } = Dimensions.get('window');

const NoTaskView = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        marginTop: height / 6,
      }}>
      <Icon name="tasks" color="gray" size={hp('10%')} />
      <Text
        style={{
          textAlign: 'center',
          color: 'gray',
        }}>
        No Tasking
      </Text>
    </View>
  );
};

const CalendarStripSquare = () => (
  <View
    style={{
      flex: 1,
      borderBottomWidth: 1,
      marginLeft: wp('5%'),
      marginRight: wp('5%'),
      borderColor: 'silver',
    }}>
    <CalendarStrip
      scrollable
      style={{
        flex: 1,
        backgroundColor: '#f0f4fd',
      }}
      selectedDate={new Date()}
      markedDatesStyle={{ backgroundColor: 'blue' }}
      calendarColor={'#3343CE'}
      calendarHeaderStyle={{ color: 'black' }}
      dateNumberStyle={{ color: 'black' }}
      dateNameStyle={{
        color: 'silver',
        fontSize: hp('1.5%'),
      }}
      iconContainer={{ flex: 0.1 }}
    />
  </View>
);

const Home = () => {
  const [taskDetailsState, setTaskDetailsState] = useState([]);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const addTaskHandle = () => {
    Actions.addTaskScreen({taskNameProps: '', showDateProps: 'Date not set', showTimeProps: 'Time not set', descriptionProps: ''});
  };

  let todosSet;

  useEffect(async () => {
    //SplashScreen.hide();
    await AsyncStorage.getItem('taskDetailsStorage')
      .then(response => {
        const parsedTodos = JSON.parse(response);
        if (!parsedTodos || typeof parsedTodos !== 'object') return;
        todosSet = parsedTodos;
        setTaskDetailsState(parsedTodos);
      })
      .catch(err => {
        console.warn('Error restoring todos from async');
        console.warn(err);
      });
  }, []);

  try {
    taskDetailsState &&
      taskDetailsState.map((val, ind) => {
        let dateConvertObject = new Date(val.showDateInt);
        console.log(dateConvertObject);
        let newDateStr = new Date();
        const myPromise = new Promise((resolve, reject) => {
          handleScheduleNotification(
            val.taskNameItem,
            val.descriptionItem,
            dateConvertObject,
            ind,
          );
          resolve('done');
        });

        myPromise
          .then(async(response) => {
            //PushNotification.cancelAllLocalNotifications();
            //PushNotification.cancelLocalNotifications({id: JSON.stringify(ind)});
            await AsyncStorage.setItem('categoryItem', 'FINISH');
            console.log('work');
          })
          .catch(error => console.log(error));
        //PushNotification.cancelAllLocalNotifications();
        /*
          .then(() => {
            PushNotification.cancelLocalNotifications({id: ind.toString()});
          })
          .catch(e => console.log(e));
          */
        /*
          if (dateConvertObject === newDateStr) {
           showNotification(val.taskNameItem, val.descriptionItem)
           .then(() => {
            PushNotification.cancelLocalNotifications({id: '' + ind});
           })
           .catch((e) => console.log(e));
           console.log('WORK');
          }
          */
      });
  } catch (e) {
    console.log(e);
  }

  const backActionHandler = () => {
    BackHandler.exitApp();
    return true;
  };

  useEffect(async () => {
    BackHandler.addEventListener('hardwareBackPress', backActionHandler);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backActionHandler);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#f0f4fd" />
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
                {Moment().format('MMM Do YY')}
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
              <Button
                warning
                style={{
                  backgroundColor: '#ef6850',
                  width: wp('30%'),
                  marginRight: wp('10%'),
                  justifyContent: 'center',
                  borderRadius: hp('1.5%'),
                }}
                onPress={addTaskHandle}>
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
        {taskDetailsState.length === 0 ? (
          <NoTaskView />
        ) : (
          <ScrollView>
            <TaskBox />
          </ScrollView>
        )}
      </View>
      <View style={styles.containerIn4} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? hp('5%') : 0,
    backgroundColor: '#f0f4fd',
    //marginTop: StatusBar.currentHeight,
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
