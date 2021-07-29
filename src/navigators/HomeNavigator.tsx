import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OrderDetail from '../pages/order-detail';
import Forgot from '../pages/auth/forgot';
import Reject from '../pages/reject';
import Accept from '../pages/accept';
import MapBusiness from '../pages/map-business';
import Chat from '../pages/chat';
import Profile from '../pages/profile';
import Supports from '../pages/supports';
import MapOrders from '../pages/map-orders';
import { appData } from '../utils/AppData';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={appData.getInprogressOrders().length > 0 ? 'MapBusiness' : 'MapOrders'}
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#621FF7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="MapOrders"
        component={MapOrders}
        options={{title: 'Recieve Order', headerShown: false}}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{title: 'Order Detail', headerShown: false}}
      />
      <Stack.Screen
        name="Forgot"
        component={Forgot}
        options={{title: 'Forgot Password', headerShown: false}}
      />
      <Stack.Screen
        name="Reject"
        component={Reject}
        options={{title: 'Reject Order', headerShown: false}}
      />
      <Stack.Screen
        name="Accept"
        component={Accept}
        options={{title: 'Accept Order', headerShown: false}}
      />
      <Stack.Screen
        name="MapBusiness"
        component={MapBusiness}
        options={{title: 'Map Business', headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{title: 'Chat Screen', headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{title: "User's Profile", headerShown: false}}
      />
      <Stack.Screen
        name="Supports"
        component={Supports}
        options={{title: 'FAQ and Supports', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
