import React, {useEffect, useState} from 'react';

import {
  Scene,
  Router,
  Actions,
  ActionConst,
  Overlay,
  Tabs,
  Modal,
  Drawer,
  Stack,
  Lightbox,
} from 'react-native-router-flux';

import {
  BackHandler,
} from 'react-native';

// page
import HomeScreen from './src/pages/home';
import AddTaskScreen from './src/pages/addTaskScreen';
import Trials from './src/pages/trials';
import SideBar from './src/components/sidebar';

import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [taskDetailsState, setTaskDetailsState] = useState({});
  /*
  const backActionHandler = () => {
    BackHandler.exitApp()
    return true;
  };

  useEffect(async () => {
    BackHandler.addEventListener("hardwareBackPress", backActionHandler);
    return () => BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
  }, []);
  */

  return (
    <Router>
      <Drawer drawerWidth={250} contentComponent={SideBar}>
        <Scene key="DrawerMenu">
          <Scene key="home" component={HomeScreen} hideNavBar={true} />
          <Scene key="addTaskScreen" component={AddTaskScreen} hideNavBar={true} />
          <Scene key="trials" component={Trials} hideNavBar={true} />
        </Scene>
      </Drawer>
    </Router>
  );
}

export default App;
