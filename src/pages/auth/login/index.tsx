import * as React from 'react';
import {Platform} from 'react-native';
import LoginForm from '../../../components/login-form';
import {IMAGES} from '../../../config/constants';
import {backgroundColors, buttonTheme} from '../../../globalStyles';
import {BgWrapper, KeyboardView, LoginWrapper} from './styles';

const Login = ({navigation}: any) => {
  return (
    <BgWrapper source={IMAGES.home_bg}>
      <KeyboardView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <LoginWrapper>
          <LoginForm
            navigation={navigation}
            title="Welcome to login!"
            subTitle="Let's start your delivery orders!"
            wrapperStyle={{padding: 20}}
            border="1px solid"
            borderRadius={20}
            backgroundColor={backgroundColors.secondary}
            loginButtonText="Login"
            registerButtonText="Register"
            forgotButtonText="Forgot password?"
            loginButtonBackground={buttonTheme.backgroundColor}
          />
        </LoginWrapper>
      </KeyboardView>
    </BgWrapper>
  );
};

export default Login;
