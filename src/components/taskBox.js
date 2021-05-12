import React, {useState, useEffect} from 'react';

import {StyleSheet, View, Text, UIManager, findNodeHandle} from 'react-native';

import {Container, Header, Title, Left, Right, Button, Body} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const TaskBox = () => {
  const [taskNameState, setTaskNameState] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [descriptionState, setDescriptionState] = useState([]);
  const [showDateState, setShowDateState] = useState([]);
  const [showTimeState, setShowTimeState] = useState([]);
  const [taskDetailsState, setTaskDetailsState] = useState({});
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  let parse;

  const getTaskHandle = async(e) => {
    //e.preventDefault();
    //try {
      await AsyncStorage.getItem('taskDetailsStorage')
      .then(response => JSON.parse(response))
      .then(data => {
        setTaskDetailsState(data)
        //setIsLoading(false);
      })
      .done();
      //setTaskDetailsState(JSON.parse(taskDetails));
  //  } catch (err) {
    //  console.log(err);
    //}
  };

  useEffect(async() => {
      //getTaskHandle();
      //console.log(taskDetails)
    //try {
      await AsyncStorage.getItem('taskDetailsStorage')
      .then(response => {
        const parsedTodos = JSON.parse(response);
        if (!parsedTodos || typeof parsedTodos !== 'object') return;
        setTaskDetailsState(parsedTodos);
        setIsLoading(false);
      })
      .catch (err =>{
        console.warn('Error restoring todos from async');
        console.warn(err);
      });
      console.log(taskDetailsState);
      ///.then(data => setIsLoading(false)
          //isLoading === false ? setTaskDetailsState(data) : setIsLoading(false)
      /*
      let taskDetails = await AsyncStorage.getItem('taskDetailsStorage');
      setTaskDetailsState(taskDetails);
      */
      //taskDetails !== null ? taskItem = JSON.parse(taskDetails) : '';
      /*
        taskDetails = await AsyncStorage.getItem('taskDetailsStorage');
        setTaskDetailsState(JSON.parse(taskDetails));
        taskDetailsState.map(v => console.log(v));
        */
      /*
        const itemsTask = await AsyncStorage.getItem("taskDetailsStorage");
        setTaskDetailsState(JSON.parse(itemsTask));
        console.log(taskDetailsState);
        */
  //  } catch (e) {
   //   console.log('ERROR ' + e);
//}
      //setTaskName(taskName);
  }, []);

  /*
    /*
    return taskDetailsState && taskDetailsState.map((val, ind) =>
    <View style={styles.container}>
      <View style={styles.containerBox}>
        <View style={styles.taskBoxSection1}>
          <Text style={styles.categoryName}>Running</Text>
        </View>
        <View style={styles.taskBoxSection2}>
          <View style={styles.taskDetailsBox}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                borderLeftWidth: 1,
                borderColor: 'orange',
                borderLeftWidth: 4,
              }}>
              <View
                style={{
                  flex: 1,
                }}>
                <View
                  style={{
                    flex: 1,
                    marginLeft: wp('3%'),
                    marginRight: wp('3%'),
                    marginTop: hp('1%'),
                  }}>
                {
                    val.taskNameItem.map((value, index) => (
                        <Text style={styles.taskTitle}>{value}</Text>
                    ))
                }
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                }}>
                <View
                  style={{
                    flex: 1,
                    marginLeft: wp('3%'),
                    marginRight: wp('3%'),
                  }}>
                {
                    val.taskNameItem.map((value, index) => (
                        <Text style={styles.taskDetaiWrite}>{value}</Text>
                    ))
                }
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 0.2,
              }}>
              <View
                style={{
                  flex: 1,
                  marginTop: wp('3%'),
                }}>
                <MenuProvider>
                  <Menu onSelect={value => alert(`Selected number: ${value}`)}>
                      <MenuTrigger>
                          <Text>
                        <Icon
                          name="ellipsis-v"
                          color="gray"
                          style={{
                            alignSelf: 'flex-end',
                          }}
                          size={20}
                        />
                          </Text>
                      </MenuTrigger>
                    <MenuOptions
                      style={{
                        justifyContent: 'flex-start',
                      }}>
                      <MenuOption value={1} text="Edit" />
                      <MenuOption value={2}>
                        <Text
                          style={{
                            color: 'red',
                          }}>
                          Remove
                        </Text>
                      </MenuOption>
                      <MenuOption value={3} disabled={true} text=" " />
                    </MenuOptions>
                  </Menu>
                </MenuProvider>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.taskBoxSection3}>
          <View style={styles.inClockBox}>
            <Icon name="clock-o" color="black" size={20} />
                {
                    val.showDateItem.map((value, index) => (
                        <Text style={{ marginLeft: 5}}>{value}</Text>
                    ))
                }
          </View>
          <View style={styles.inDateBox}>
            <Icon name="calendar" color="black" size={20} />
                {
                    val.showTimeItem.map((value, index) => (
                        <Text style={{ marginLeft: 5}}>{value}</Text>
                    ))
                }
          </View>
        </View>
      </View>
    </View>
     )
    */
    //console.log(taskDetailsState);
    //let convert = Object.entries(taskDetailsState);
    //convert && convert.map(e => console.log(e))


    /*
 const TaskPrint = () => {
   return taskDetailsState && taskDetailsState.allTask.map((val, ind) => (
    <View style={styles.container}>
      <View style={styles.containerBox}>
        <View style={styles.taskBoxSection1}>
          <Text style={styles.categoryName}>Running</Text>
        </View>
        <View style={styles.taskBoxSection2}>
          <View style={styles.taskDetailsBox}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                borderLeftWidth: 1,
                borderColor: 'orange',
                borderLeftWidth: 4,
              }}>
              <View
                style={{
                  flex: 1,
                }}>
                <View
                  style={{
                    flex: 1,
                    marginLeft: wp('3%'),
                    marginRight: wp('3%'),
                    marginTop: hp('1%'),
                  }}>
                <Text style={styles.taskTitle}>{val.taskNameItem}</Text>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                }}>
                <View
                  style={{
                    flex: 1,
                    marginLeft: wp('3%'),
                    marginRight: wp('3%'),
                  }}>
                <Text style={styles.taskDetaiWrite}>{val.descriptionItem}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 0.2,
              }}>
              <View
                style={{
                  flex: 1,
                  marginTop: wp('3%'),
                }}>
                <MenuProvider>
                  <Menu onSelect={value => alert(`Selected number: ${value}`)}>
                      <MenuTrigger>
                          <Text>
                        <Icon
                          name="ellipsis-v"
                          color="gray"
                          style={{
                            alignSelf: 'flex-end',
                          }}
                          size={20}
                        />
                          </Text>
                      </MenuTrigger>
                    <MenuOptions
                      style={{
                        justifyContent: 'flex-start',
                      }}>
                      <MenuOption value={1} text="Edit" />
                      <MenuOption value={2}>
                        <Text
                          style={{
                            color: 'red',
                          }}>
                          Remove
                        </Text>
                      </MenuOption>
                      <MenuOption value={3} disabled={true} text=" " />
                    </MenuOptions>
                  </Menu>
                </MenuProvider>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.taskBoxSection3}>
          <View style={styles.inClockBox}>
            <Icon name="clock-o" color="black" size={20} />
            <Text style={{ marginLeft: 5}}>{val.showDateItem}</Text>
          </View>
          <View style={styles.inDateBox}>
            <Icon name="calendar" color="black" size={20} />
            <Text style={{ marginLeft: 5}}>{val.showTimeItem}</Text>
          </View>
        </View>
      </View>
    </View>
      ))
    };
*/
    /*
  const renderedGoods = taskDetailsState && taskDetailsState.allTask.map(value => {
      return <View><Text>{value.taskNameItem}</Text></View>
  });
  */
  //console.log(taskDetailsState)

 const TaskPrint = () => {
  if(isLoading) {
    return <View><Text>Loading...</Text></View>
  }
   return taskDetailsState && taskDetailsState.map((val, ind) => (
    <View style={styles.container}>
        <Text>{val.descriptionItem}</Text>
    </View>
   ))
 };

    return (
        <View>
          <TaskPrint />
        </View>
     )
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    flex: 1,
  },
  containerBox: {
    height: hp('20%'),
    backgroundColor: 'white',
    borderRadius: wp('5%'),
    margin: wp('3%'),
  },
  taskBoxSection1: {
    flex: 1,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    justifyContent: 'center',
    paddingLeft: wp('2%'),
    borderBottomWidth: 0.2,
    borderStyle: 'solid',
    borderColor: 'gray',
    borderRadius: hp('1%'),
  },
  taskBoxSection2: {
    flex: 2,
    alignItems: 'center',
  },
  taskBoxSection3: {
    flex: 1,
    flexDirection: 'row',
  },
  inClockBox: {
    flex: 1,
    borderBottomLeftRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  inDateBox: {
    flex: 1,
    borderBottomRightRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  taskDetailsBox: {
    flex: 1,
    flexDirection: 'row',
  },
  taskDetailsWriteBox: {
    flex: 1,
    width: wp('80%'),
    margin: wp('3%'),
    justifyContent: 'center',
    flexDirection: 'column',
    paddingLeft: wp('3%'),
    borderLeftWidth: 2,
    borderStyle: 'solid',
    borderColor: 'orange',
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    color: 'orange',
  },
  taskTitle: {
    fontWeight: '700',
    fontSize: hp('2.5%'),
  },
  taskDetailsWrite: {
    fontWeight: '300',
    fontSize: hp('2%'),
    color: 'gray',
  },
});

export default TaskBox;
