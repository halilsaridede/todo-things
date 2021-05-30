import React, { useState, useEffect } from 'react';

import {
  StyleSheet,
  View,
  Text,
  UIManager,
  findNodeHandle,
  Dimensions,
} from 'react-native';

import {
  Container,
  Header,
  Title,
  Left,
  Right,
  Button,
  Body,
  Spinner,
} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';
import { Actions } from 'react-native-router-flux';

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
  const [isLoading, setIsLoading] = useState(true);
  const [taskDetailsState, setTaskDetailsState] = useState({});
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const { height } = Dimensions.get('window');

  useEffect(async () => {
    await AsyncStorage.getItem('taskDetailsStorage')
      .then(response => {
        const parsedTodos = JSON.parse(response);
        if (!parsedTodos || typeof parsedTodos !== 'object') return;
        setTaskDetailsState(parsedTodos);
        setIsLoading(false);
      })
      .catch(err => {
        console.warn('Error restoring todos from async');
        console.warn(err);
      });
  }, []);

  const TaskPrint = () => {
    if (isLoading) {
      return (
        <View
          style={{
            flex: 1,
            marginTop: height / 6,
          }}>
          <Spinner color="danger.500" />
        </View>
      );
    }
    return (
      taskDetailsState &&
      taskDetailsState.map((val, ind) => (
        <View style={styles.container}>
          <View style={styles.containerBox}>
            <View style={styles.taskBoxSection1}>
              <Text style={styles.categoryName}>{val.categoryItem}</Text>
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
                      <Text style={styles.taskDetaiWrite}>
                        {val.descriptionItem}
                      </Text>
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
                      <Menu
                        onSelect={value => alert(`Selected number: ${value}`)}>
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
                          <MenuOption
                            value={1}
                            text="Edit"
                            onSelect={() => {
                              //alert(val.taskNameItem);
                              Actions.addTaskScreen({
                                taskNameProps: val.taskNameItem,
                                descriptionProps: val.descriptionItem,
                                showDateProps: val.showDateItem,
                                showTimeProps: val.showTimeItem,
                              });
                            }}
                          />
                          <MenuOption
                            value={2}
                            onSelect={async () => {
                              const rawValue = await AsyncStorage.getItem(
                                'taskDetailsStorage',
                              );
                              try {
                                const jsonValue = JSON.parse(rawValue) || []; // avoid undefined or null
                                const finalValue = [
                                  ...jsonValue.slice(0, ind),
                                  ...jsonValue.slice(ind + 1),
                                ];
                                console.log('working');
                                await AsyncStorage.setItem(
                                  'taskDetailsStorage',
                                  JSON.stringify(finalValue),
                                ); // add await here
                                Actions.home();
                              } catch (e) {
                                console.log('Parsing failed', e);
                              }
                            }}>
                            <Text
                              style={{
                                color: 'red',
                              }}>
                              Remove
                            </Text>
                          </MenuOption>
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
                <Text style={{ marginLeft: 5 }}>{val.showDateItem}</Text>
              </View>
              <View style={styles.inDateBox}>
                <Icon name="calendar" color="black" size={20} />
                <Text style={{ marginLeft: 5 }}>{val.showTimeItem}</Text>
              </View>
            </View>
          </View>
        </View>
      ))
    );
  };

  return (
    <View>
      <TaskPrint />
    </View>
  );
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
