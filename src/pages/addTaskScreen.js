import React, {useState, useCallback} from 'react';
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
} from 'react-native';

import {
Container, Button, Left, Input, Body
} from 'native-base';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {Actions} from 'react-native-router-flux';

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

import AsyncStorage from '@react-native-async-storage/async-storage';

import DateTimePicker from '@react-native-community/datetimepicker';
import Moment from 'moment';

// components
import HeaderComponent from '../components/header';
import TaskBox from '../components/taskBox';
import CategoryBox from '../components/categoryBox';

const {height} = Dimensions.get('window');

const AddTaskScreen = () => {
  const [taskName, setTaskName] = useState();
  const [clockText, setClockText] = useState();
  const [description, setDescription] = useState();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  //DateTimePicker
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showDate, setShowDate] = useState('Date not set');
  const [showTime, setShowTime] = useState('Time not set');

  // DateTimePicker
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
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

  const taskSaveHandle = async () => {
    if (taskName === '' && description === '') {
      alert('Not null');
    } else {
      try {
        await AsyncStorage.setItem('taskName', taskName);
        await AsyncStorage.setItem('description', description);
        Actions.home();
      } catch (error) {
        console.log(error);
      }
      setTaskName('');
      setDescription('');
      forceUpdate();
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
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
                onChangeText={text => setTaskName(text)}
                value={taskName}
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
              <Text
                //onChangeText={text => setDate(text)}
                style={styles.dateInputArea}
                // placeholder="April 14, 2021"
              >
                {showDate}
              </Text>
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
              <Text
                //onChangeText={text => setClockText(text)}
                style={styles.dateInputArea}
                //placeholder="10:00 PM"
              >
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
              flex: 0.12,
            }}>
            <View style={styles.dateBox}>
              <Text style={styles.dateWrite}>Description</Text>
            </View>
            <View style={styles.descriptionBox}>
              <Input
                style={styles.dateInputArea}
                onChangeText={text => setDescription(text)}
                placeholder=""
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
              <CategoryBox />
            </View>
          </View>
        </ScrollView>
        <View>
          <Button
            onPress={taskSaveHandle}
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
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#5b57ca',
    backgroundColor: 'purple',
    paddingTop: Platform.OS === 'ios' ? hp('5%') : 0,
  },
  topAreaContainer: {
    flex: 0.2,
    //backgroundColor: '#5b57ca',
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
