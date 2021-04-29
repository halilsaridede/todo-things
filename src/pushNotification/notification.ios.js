import PushNotificationIOS from '@react-native-community/push-notification-ios';

const showNotification = (title, message) => {
    PushNotificationIOS.presentLocalNotification({
        alerTitle: title,
        alertBody: message,
    });
};

const handleScheduleNotification = (title, message) => {
    const date = new Date();
    date.setSeconds(date.getSeconds() + 5);
    PushNotificationIOS.scheduleLocalNotification({
        alertTitle: title,
        alertBody: message,
        fireDate: date.toISOString(),
    });
};

const handleCancel = () => {
    PushNotificationIOS.removeAllDeliveredNotification();
};

export { showNotification, handleScheduleNotification, handleCancel };
