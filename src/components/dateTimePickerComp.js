import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from 'react-native-vector-icons/dist/FontAwesome'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'

const DateTimePickerComp = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  }

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  }

  const showDatepicker = () => {
    showMode('date');
  }

  const showTimepicker = () => {
    showMode('time');
  }

  return (
    <View>
      <View>
        <Icon
          onPress={showDatepicker}
          name="calendar"
          color="black"
          style={{
            marginTop: hp('2%'),
            marginRight: wp('5%'),
            marginLeft: wp('5%'),
          }}
          size={20}
        />
      </View>
      <View>
        <Icon
          onPress={showTimepicker}
          name="clock-o"
          color="black"
          style={{
            marginTop: hp('2%'),
            marginRight: wp('5%'),
            marginLeft: wp('5%'),
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
  );
}

export default DateTimePickerComp;
