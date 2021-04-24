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

// page
import HomeScreen from './src/pages/home';
import AddTaskScreen from './src/pages/addTaskScreen';
import Trials from './src/pages/trials';
import SideBar from './src/components/sidebar';

const App = () => {
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
