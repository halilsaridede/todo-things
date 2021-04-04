import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Container,  Title, Left, Right, Body} from 'native-base';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//components
import HeaderComponent from '../components/header';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>Rockstar</Text>
      <View style={styles.containerIn1}>
        <Text>1</Text>
      </View>
      <View style={styles.containerIn2}>
        <Text>1</Text>
      </View>
      <View style={styles.containerIn3}>
        <Text>1</Text>
      </View>
      <View style={styles.containerIn4}>
        <Text>1</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: hp('5%'),
    flex: 1,
    backgroundColor: 'orange',
  },
  containerIn1: {
    flex: 1,
    backgroundColor: 'pink',
  },
  containerIn2: {
    flex: 1,
    backgroundColor: 'orange',
  },
  containerIn3: {
    flex: 1,
    backgroundColor: 'orange',
  },
  containerIn4: {
    flex: 1,
    backgroundColor: 'gray',
  },
});

export default Home;
