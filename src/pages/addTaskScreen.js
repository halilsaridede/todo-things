import React, { useState, useCallback, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Platform,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  KeyboardAvoidingView,
  Dimensions,
  StatusBar,
  BackHandler,
} from 'react-native';

import { Container, Button, Left, Input, Body } from 'native-base';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import { Actions } from 'react-native-router-flux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';

import AsyncStorage from '@react-native-async-storage/async-storage';

import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

// components
import HeaderComponent from '../components/header';
import TaskBox from '../components/taskBox';
import CategoryBox from '../components/categoryBox';

const { height } = Dimensions.get('window');

const AddTaskScreen = props => {
  const [taskNameInput, setTaskNameInput] = useState(props.taskNameProps);
  const [description, setDescription] = useState(props.descriptionProps);
  //const [showDate, setShowDate] = useState('Date not set');
  const [showDate, setShowDate] = useState(props.showDateProps);
  //const [showTime, setShowTime] = useState('Time not set');
  const [showTime, setShowTime] = useState(props.showTimeProps);

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  //DateTimePicker
  //const [date, setDate] = useState(new Date(1598051730000));
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  //Input
  // DateTimePicker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    //console.log(typeof date);
    Moment.locale('en');
    let dateFormat = Moment(currentDate).format('DD-MM-YYYY');
    let timeFormat = Moment(currentDate).format('hh:mm');
    setShowDate(dateFormat);
    setShowTime(timeFormat);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  // DateTimePicker
  const backActionHandler = () => {
    Actions.home();
    return true;
  };

  useEffect(async () => {
    BackHandler.addEventListener('hardwareBackPress', backActionHandler);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backActionHandler);
  }, []);

  const getTaskHandle = async () => {
    try {
      const categoryGetItem = await AsyncStorage.getItem('categoryItem');
      console.log(categoryGetItem);
      /*
      const itemsTask = await AsyncStorage.getItem('taskDetailsStorage');
      let parse = JSON.parse(itemsTask);
      console.log(parse);
      parse.map(val => {
        let a = new Date(val.showDateInt);
        console.log(a);
        //console.log(typeof new Date());
      });
      //await AsyncStorage.removeItem('taskDetailsStorage')
      //.then(response => console.log('remove item'))
      */
    } catch (error) {
      console.log(error);
    }
  };

  let arrays = [];

  const saveHandle = async () => {
    if (taskNameInput === '') {
      alert('Please enter task name');
    } else if (showDate === 'Date not set') {
      alert('Please enter date');
    } else if (showTime === 'Time not set') {
      alert('Please enter time');
    } else if (description === '') {
      alert('Please enter description');
    } else {
      try {
        const categoryGetItem = await AsyncStorage.getItem('categoryItem');
        console.log(categoryGetItem);
        let obj = {
          taskNameItem: taskNameInput.toString(),
          descriptionItem: description.toString(),
          showDateItem: showDate.toString(),
          showDateInt: date,
          showTimeItem: showTime.toString(),
          categoryItem: categoryGetItem.toString(),
        };

        arrays.push(obj);
        const itemsTask = await AsyncStorage.getItem('taskDetailsStorage');
        let itemsTaskCopy = itemsTask;
        let parse = JSON.parse(itemsTaskCopy);
        if (parse === null) {
          await AsyncStorage.setItem(
            'taskDetailsStorage',
            JSON.stringify(arrays),
          );
        } else {
          parse.push(obj);
          itemsTaskCopy = JSON.stringify(parse);
          await AsyncStorage.setItem('taskDetailsStorage', itemsTaskCopy);
        }
      } catch (e) {
        console.log(e);
      }
      setTaskNameInput('');
      setDescription('');
      Actions.home();
    }
  };

  AddTaskScreen.defaultProps = {
    taskNameProps: taskNameInput,
    descriptionProps: description,
    showDateProps: showDate,
    showTimeProps: showTime,
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="purple" />
      <View style={styles.topAreaContainer}>
        <View style={styles.backButtonWrapper}>
          <Icon
            onPress={() => Actions.pop()}
            name="chevron-left"
            color="white"
            style={{
              alignSelf: 'flex-start',
              marginTop: hp('1%'),
              marginLeft: wp('4%'),
            }}
            size={wp('5%')}
          />
        </View>
        <View style={styles.addTaskWriteWrapper}>
          <Text
            style={{
              fontSize: hp('3%'),
              fontWeight: 'bold',
              color: 'white',
              marginLeft: wp('4%'),
            }}>
            Add Task
          </Text>
        </View>
      </View>
      <KeyboardAvoidingView style={styles.bottomAreaContainer}>
        <ScrollView
          contentContainerStyle={{
            height,
          }}>
          <View
            style={{
              flex: 0.12,
            }}>
            <View style={styles.containerIn3}>
              <Input
                onChangeText={setTaskNameInput}
                value={taskNameInput}
                placeholder="Your Task Name"
              />
            </View>
          </View>
          <View
            style={{
              flex: 0.12,
            }}>
            <View style={styles.dateBox}>
              <Text style={styles.dateWrite}>Date</Text>
            </View>
            <View style={styles.dateDetailBox}>
              <Text style={styles.dateInputArea}>{showDate}</Text>
              <Icon
                onPress={showDatepicker}
                name="calendar"
                color="black"
                style={{
                  marginTop: hp('2%'),
                  marginRight: wp('5%'),
                }}
                size={20}
              />
            </View>
          </View>
          <View
            style={{
              flex: 0.12,
            }}>
            <View style={styles.dateBox}>
              <Text style={styles.dateWrite}>Clock</Text>
            </View>
            <View style={styles.dateDetailBox}>
              <Text placeholder="asdsad" style={styles.dateInputArea}>
                {showTime}
              </Text>
              <Icon
                onPress={showTimepicker}
                name="clock-o"
                color="black"
                style={{
                  marginTop: hp('2%'),
                  marginRight: wp('5%'),
                }}
                size={20}
              />
            </View>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
          <View
            style={{
              flex: Platform.OS === 'ios' ? 0.12 : 0.14,
            }}>
            <View
              style={
                ([styles.dateBox],
                {
                  position: 'absolute',
                })
              }>
              <Text style={styles.dateWrite}>Description</Text>
            </View>
            <View
              style={[
                styles.descriptionBox,
                {
                  zIndex: 2,
                },
              ]}>
              <Input
                style={styles.dateInputArea}
                onChangeText={setDescription}
                value={description}
              />
              <Icon
                name="calendar"
                color="#f0f4fd"
                style={{
                  marginTop: hp('2%'),
                  marginRight: wp('5%'),
                }}
                size={20}
              />
            </View>
          </View>
          <View
            style={{
              flex: 0.12,
            }}>
            <View style={styles.dateBox}>
              <Text style={styles.dateWrite}>Category</Text>
            </View>
            <View style={styles.dateDetailBox}>
              <CategoryBox displayStateCon="none" />
            </View>
          </View>
        </ScrollView>
        <View>
          <Button
            onPress={saveHandle}
            full
            danger
            style={{
              backgroundColor: 'purple',
              borderRadius: hp('1%'),
              marginLeft: wp('3%'),
              marginRight: wp('3%'),
              marginBottom: hp('5%'),
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '900',
              }}>
              Create New Task
            </Text>
          </Button>
        </View>
        <View>
          <Button
            onPress={getTaskHandle}
            full
            danger
            style={{
              backgroundColor: 'purple',
              borderRadius: hp('1%'),
              marginLeft: wp('3%'),
              marginRight: wp('3%'),
              marginBottom: hp('5%'),
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '900',
              }}>
              Get Task
            </Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'purple',
    paddingTop: Platform.OS === 'ios' ? hp('5%') : 0,
    //marginTop: StatusBar.currentHeight,
  },
  topAreaContainer: {
    flex: 0.2,
    backgroundColor: 'purple',
  },
  bottomAreaContainer: {
    flex: 1,
    backgroundColor: '#f0f4fd',
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
  },
  backButtonWrapper: {
    flex: 1,
  },
  addTaskWriteWrapper: {
    flex: 1,
  },
  containerIn3: {
    flex: 1,
    paddingLeft: wp('5%'),
    backgroundColor: '#f0f4fd',
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
  },
  dateBox: {
    backgroundColor: '#f0f4fd',
  },
  dateDetailBox: {
    flexDirection: 'row',
    backgroundColor: '#f0f4fd',
  },
  dateWrite: {
    alignSelf: 'flex-start',
    fontSize: hp('2%'),
    marginLeft: wp('4%'),
    color: 'gray',
  },
  dateInputArea: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: 'silver',
    marginLeft: wp('3%'),
    marginTop: hp('3%'),
  },
  descriptionBox: {
    flex: 1,
    marginRight: wp('10%'),
  },
});

export default AddTaskScreen;
