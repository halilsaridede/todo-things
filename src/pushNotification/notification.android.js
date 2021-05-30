import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import { Button, Platform, Vibration, View } from 'react-native';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS,
];

const PATTERN_DESC =
  Platform.OS === 'android'
    ? 'wait 1s, vibrate 2s, wait 3s'
    : 'wait 1s, vibrate, wait 2s, vibrate, wait 3s';

const showNotification = (title, message) => {
  try {
    Vibration.vibrate(10000);
    PushNotification.localNotification({
      title: title,
      message: message,
      channelId: '0', // (required) channelId, if the channel doesn't exist, notification will not trigger.
      ticker: 'My Notification Ticker', // (optional)
      showWhen: true, // (optional) default: true
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
      largeIconUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      //bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
      //subText: 'This is a subText', // (optional) default: none
      bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
      bigLargeIcon: 'ic_launcher', // (optional) default: undefined
      bigLargeIconUrl: 'https://www.example.tld/bigicon.jpg', // (optional) default: undefined
      color: 'red', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: 'group', // (optional) add group to message
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      priority: 'high', // (optional) set notification priority, default: high
      visibility: 'private', // (optional) set notification visibility, default: private
      ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
      shortcutId: 'shortcut-id', // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
      onlyAlertOnce: false,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleScheduleNotification = (title, message, date, id) => {
  PushNotification.localNotificationSchedule({
    title: title,
    id: JSON.stringify(id),
    message: message,
    channelId: 'todo', // (required) channelId, if the channel doesn't exist, notification will not trigger.channel_idto1'
    ticker: 'My Notification Ticker', // (optional)
    showWhen: true, // (optional) default: true
    autoCancel: true, // (optional) default: true
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
    largeIconUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    //bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
    //subText: 'This is a subText', // (optional) default: none
    bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
    bigLargeIcon: 'ic_launcher', // (optional) default: undefined
    bigLargeIconUrl: 'https://www.example.tld/bigicon.jpg', // (optional) default: undefined
    color: 'red', // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 1000, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: 'some_tag', // (optional) add tag to message
    group: 'group', // (optional) add group to message
    groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    priority: 'high', // (optional) set notification priority, default: high
    visibility: 'private', // (optional) set notification visibility, default: private
    ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
    shortcutId: 'shortcut-id', // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
    onlyAlertOnce: false,
    date: date,
  });
};

const handleCancel = () => {
  PushNotification.cancelAllLocalNotification();
};

const handleDeleteChannel = (channel_id) => {
  PushNotification.deleteChannel(channel_id);
};

export { showNotification, handleScheduleNotification, handleCancel, handleDeleteChannel };
