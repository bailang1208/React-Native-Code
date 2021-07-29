import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../pages/auth/login';
import Forgot from '../pages/auth/forgot';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Forgot"
        component={Forgot}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
