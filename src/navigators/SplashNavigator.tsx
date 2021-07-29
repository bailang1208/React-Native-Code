import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../pages/splash';

const Stack = createStackNavigator();

const SplashNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Splash'}
        component={Splash}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default SplashNavigator;
