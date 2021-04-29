import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, Button, Platform} from 'react-native';

import DateTimePickerComp from '../components/dateTimePickerComp';

// Push Notification
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { showNotification, handleScheduleNotification, handleCancel } from '../pushNotification/notification';

const Trials = () => {
    const [input, setInput] = useState();
    const [array, setArray] = useState([]);

    let myArray = [];

    const printHandle = async () => {
        try {
            //let myArraym = myArray.push(input);
          setArray(oldArray => [...oldArray, input]);
          myArraym.map(item => console.log(item));
          await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(myArraym));
        } catch (error) {
          // Error saving data
          console.log(error);
        }
          setInput('');
    };


    useEffect(async () => {

        try {
          const myArray = await AsyncStorage.getItem('@MySuperStore:key');
          if (myArray !== null) {
            // We have data!!
            let a = JSON.parse(myArray);
            a.map((item, index) => {
                console.log(item);
            });
          }
        } catch (error) {
          // Error retrieving data
          console.log(error);
        }
    });

  return (
    <View
      style={{
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
    <TextInput placeholder="Enter" onChange={text => setInput(text)} />
    <Button title="Press" onPress={printHandle} />
      <Button title="Click me to get notification"
      onPress={() => showNotification('hello', 'message')} />
    </View>
  );
}

export default Trials;
