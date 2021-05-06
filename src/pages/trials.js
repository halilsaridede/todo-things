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
    let [items, setItems] = useState({
        tasks: []
    });

    const addItemsHandle = async () => {
        try {
            setItems(prevState => {
                return {
                    tasks: [...prevState.tasks, input]
                };
            });
            await AsyncStorage.setItem("MySuperStore", JSON.stringify(items.tasks));
        } catch (error) {
          console.log(error);
        }
          setInput('');
    };

    const getItemHandle = async () => {
        //items.tasks.map(e => console.log(e));
        console.log(items.tasks);
        try {
          const itemsTask = await AsyncStorage.getItem("MySuperStore");
          //console.log(itemsTask);
          if (itemsTask !== '') {
            let itemsTaskJSONParse = JSON.parse(itemsTask);
            itemsTaskJSONParse.map((item, index) => {
                console.log(item, index);
            });
          }
        } catch (error) {
          console.log(error);
        }
    };
    /*
    useEffect(async () => {
        try {
          const myArray = await AsyncStorage.getItem("MySuperStore");
          if (myArray !== '') {
            let a = JSON.parse(myArray);
            a.map((item, index) => {
                //console.log(item);
            });
          }
        } catch (error) {
          console.log(error);
        }
    });
    */

  return (
    <View
      style={{
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
    <TextInput placeholder="Enter" value={input} onChangeText={setInput} />
    <Button title="Press" onPress={addItemsHandle} />
    <Button title="Get item" onPress={getItemHandle} />
      <Button title="Click me to get notification"
      onPress={() => showNotification('hello', 'message')} />
    </View>
  );
}


export default Trials;
