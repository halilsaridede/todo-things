import React, {useState} from 'react';
import {View, Text, Button, Platform} from 'react-native';

import DateTimePickerComp from '../components/dateTimePickerComp';

// Push Notification
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const Trials = () => {
  
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    PushNotificationIOS.addEventListener('notification', onRemoteNotification);
  });

  const onRemoteNotification = (notification) => {
    const isClicked = notification.getData().userInteraction === 1;

    if (isClicked) {
      // Navigate user to another screen
    } else {
      // Do something else with push notification
    }
  };

  return (
    <View
      style={{
        marginTop: 50,
      }}>
      <DateTimePickerComp />
    </View>
  );
}

export default Trials;
