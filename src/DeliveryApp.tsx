/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ToastProvider } from './providers/ToastProvider';
import { Toast } from './components/shared/OToast';
import { s_accessToken, _retrieveStoreData } from './providers/StoreUtil';
import DrawNavigator from './navigators/DrawNavigator';
import AuthNavigator from './navigators/AuthNavigator';
import { AuthContext } from './contexts/AuthContext';
import SplashNavigator from './navigators/SplashNavigator';
import SpinnerProvider from './contexts/SpinnerContext';
import AppStatusProvider from './contexts/StatusContext';
import { appData } from './utils/AppData';

const DeliveryApp = () => {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    appData.load();

    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await s_accessToken();
      } catch (e) {
        // Restoring token failed
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (token: string) => {
        dispatch({ type: 'SIGN_IN', token: token });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async (token: string) => {
        dispatch({ type: 'SIGN_IN', token: token });
      },
    }),
    [],
  );

  React.useEffect(() => {
    console.log('-------- State changed -----' + JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider value={authContext}>
      <SpinnerProvider>
        <ToastProvider>
          <NavigationContainer>
            {state.isLoading ? (
              <SplashNavigator />
            ) : state.userToken == null ? (
              <AuthNavigator />
            ) : (
              <AppStatusProvider>
                <DrawNavigator />
              </AppStatusProvider>
            )}
          </NavigationContainer>
          <Toast />
        </ToastProvider>
      </SpinnerProvider>
    </AuthContext.Provider>
  );
};

export default DeliveryApp;
