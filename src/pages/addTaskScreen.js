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
  let [taskDetailItems, setTaskDetailItems] = useState({
    taskNameItem: [],
    descriptionItem: [],
    showDateItem: [],
    showTimeItem: [],
  });
 /*
  let [taskDetail, setTaskDetail] = useState([
      { id: [], value: [] },
  ]);
  */
  const [task, setTask] = useState([]);
  const [taskDetailsState, setTaskDetailsState] = useState([]);
  const [taskNameInput, setTaskNameInput] = useState('');
  const [description, setDescription] = useState('');
  const [showDate, setShowDate] = useState('Date not set');
  const [showTime, setShowTime] = useState('Time not set');
  /*
  let [taskNameItems, setTaskNameItems] = useState({
    taskNameItem: []
  });
  let [descriptionItems, setDescriptionItems] = useState({
    descriptionItem: []
  });
  let [showDateItems, setShowDateItems] = useState({
    showDateItem: []
  });
  let [showTimeItems, setShowTimeItems] = useState({
    showTimeItem: []
  });
  */
  /*
  const [collection, setCollection] = useState({
    taskNameItem: {
      item: [],
    },
    description: {
      item: [],
    },
  });
  */

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  //DateTimePicker
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  //Input

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

    const getTaskHandle = async () => {
        try {
          const itemsTask = await AsyncStorage.getItem("taskDetailsStorage");
          let parse = JSON.parse(itemsTask);
            console.log(parse)
            //parse.map(c => console.log(c))
            /*
          const itemsTask = await AsyncStorage.getItem("taskDetailsStorage");
          let parse = JSON.parse(itemsTask);
          parse.taskNameItem.map(val => console.log(val))
          */
          //taskDetail.map(v => console.log(v))
          /*
          const itemsTask = await AsyncStorage.getItem("taskDetailsStorage");
          let itemsTaskParse = JSON.parse(itemsTask);
          */
          /*
          Object.entries(itemsTaskParse).map(val =>
            val.map(v => console.log(v))
          )
          */
            //Object.values(collection).map(val => console.log(val.item))
          //let collectionAssign = Object.keys(collection);
          //collection.map(val => console.log(val))
          /*
          const itemsTask = await AsyncStorage.getItem("taskDetailsStorage");
          let itemsTaskParse = JSON.parse(itemsTask);
          setTaskDetailsState(itemsTaskParse);
          taskDetailsState && taskDetailsState.map(val => console.log(val))
          //let itemsTaskParse = JSON.parse(itemsTask);
          //console.log(itemsTaskParse.descriptionItem);
          //let keysItems = Object.keys(itemsTaskParse);
          /*
          itemsTaskParse.map((value, index) => {
            console.log(value);
          });
          */
            /*
          if (itemsTask !== '') {
            let itemsTaskJSONParse = JSON.parse(itemsTask);
            itemsTaskJSONParse.map((item, index) => {
                // console.log(item);
            });
          }
          */
        } catch (error) {
          console.log(error);
        }
    };
    let arrayItems = [];
  const saveHandle = async () => {
    if (taskNameInput === '') {
      alert('Please enter task name');
    }
    else if (showDate === 'Date not set') {
     alert('Please enter date');
    }
    else if (showTime === 'Time not set') {
     alert('Please enter time');
    }
    else if (description === '') {
     alert('Please enter description');
    }
    else {
        try {
          setTaskDetailItems(prevState => {
            return {
              taskNameItem: [...prevState.taskNameItem, taskNameInput],
              descriptionItem: [...prevState.descriptionItem, description],
              showDateItem: [...prevState.showDateItem, showDate],
              showTimeItem: [...prevState.showTimeItem, showTime],
            };
          });
            //arrayItems.push(taskDetailItems);
            setTask(
                [taskDetailItems]
              );
            await AsyncStorage.setItem("taskDetailsStorage", JSON.stringify(task));
          /*
          setTaskDetail(prevState => {
            taskDetail[0].id.push([...prevState.id, taskNameInput]);
            taskDetail[0].value.push([...prevState.value, description]);
            */
            /*
            return {
              id: [...prevState.id, taskNameInput],
              value: [...prevState.value, description],
            };
          });
          await AsyncStorage.setItem("taskDetailsStorage", JSON.stringify(taskDetailItems));
          */
          /*
          setCollection(prevState => {
            return {
              taskNameItem: [...prevState.taskNameItem, taskNameInput],
              description: [...prevState.taskNameItem, description],
            }
          });
          await AsyncStorage.setItem("taskDetailsStorage", JSON.stringify(collection));
          */
          /*
          await AsyncStorage.setItem("taskDetailsStorage", JSON.stringify({
            task: [
              taskName: [taskNameInput],
              description: [description],
            ]
          }));
          */
          /*
          setTaskDetailItems(prevState => {
            return {
              items: {taskNameItem: [...prevState.items.taskNameItem, taskNameInput],
                      descriptionItem: [...prevState.items.descriptionItem, description]}
              items: {taskNameItem: [taskNameInput], descriptionItem: [description]}
            }
          });
           */
          /*
            //TasknameInput
            setTaskNameItems(prevState => {
                return {
                    taskNameItem: [...prevState.taskNameItem, taskNameInput]
                };
            });
            await AsyncStorage.setItem("taskNameStorage", JSON.stringify(taskNameItems.taskNameItem));
            //DateInput
            setShowDateItems(prevState => {
                return {
                    showDateItem: [...prevState.showDateItem, showDate]
                };
            });
            await AsyncStorage.setItem("dateStorage", JSON.stringify(showDateItems.showDateItem));
            //TimeInput
            setShowTimeItems(prevState => {
                return {
                    showTimeItem: [...prevState.showTimeItem, showTime]
                };
            });
            await AsyncStorage.setItem("timeStorage", JSON.stringify(showTimeItems.showTimeItem));
            //Description
            setDescriptionItems(prevState => {
                return {
                    descriptionItem: [...prevState.descriptionItem, description]
                };
            });
            await AsyncStorage.setItem("descriptionStorage", JSON.stringify(descriptionItems.descriptionItem));
        */
          setTaskNameInput('');
          setDescription('');
          forceUpdate();
          //Actions.home();
        } catch (error) {
          console.log(error);
        }
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
              <Text
                style={styles.dateInputArea}
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
                style={styles.dateInputArea}
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
              flex:  Platform.OS === 'ios' ? 0.12 : 0.14,
            }}>
          <View style={[styles.dateBox], {
              position: 'absolute',
          }}>
              <Text style={styles.dateWrite}>Description</Text>
            </View>
            <View style={[styles.descriptionBox, {
                zIndex: 2,
            }]}>
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
            <CategoryBox
                 displayStateCon="flex"
            />
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
