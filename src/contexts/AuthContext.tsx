import * as React from 'react';
import {initialState, Reducer} from '../providers/Reducer';
import {s_accessToken} from '../providers/StoreUtil';

export interface AuthContextProps {
  signIn: (data: any) => Promise<void>;
  signOut: () => void;
  signUp: (data: any) => Promise<void>;
}

export const AuthContext = React.createContext({});

const AuthProvider = ({children}: any) => {
  const [state, dispatch] = React.useReducer(Reducer, initialState);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await s_accessToken();
      } catch (e) {
        // Restoring token failed
      }
      console.log('----- Restored Token ---- : ' + userToken);
      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data: any) => {
        const token = await s_accessToken();
        dispatch({type: 'SIGN_IN', token: token});
        console.log('---- SIGN TOKEN -----' + token);
      },
      signOut: () => {
        dispatch({type: 'SIGN_OUT'});
        console.log('---- Sign Out function ------');
      },
      signUp: async (data: any) => {
        dispatch({type: 'SIGN_IN', token: await s_accessToken()});
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

// export default AuthProvider;
