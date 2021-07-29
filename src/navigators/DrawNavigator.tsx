import {createDrawerNavigator} from '@react-navigation/drawer';
import * as React from 'react';
import SideMenu from '../pages/side-menu';
import HomeNavigator from './HomeNavigator';

const Drawer = createDrawerNavigator();

const DrawNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props: any) => <SideMenu {...props} />}>
      <Drawer.Screen name="OrderView" component={HomeNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawNavigator;
