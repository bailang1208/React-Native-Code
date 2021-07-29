import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {IMAGES} from '../../config/constants';
import {BgWrapper} from './styles';

const Stack = createStackNavigator();

const Splash = () => {
  return <BgWrapper source={IMAGES.home_bg} />;
};

export default Splash;
