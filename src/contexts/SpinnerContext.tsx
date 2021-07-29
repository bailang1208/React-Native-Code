import * as React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import styled from 'styled-components/native';

const MainWrapper = styled.View`
  flex: 1;
`;

type SpinnerTypes = {
  is_loading: boolean,
  setLoading: (state: boolean) => void;
};

export const SpinnerContext = React.createContext<SpinnerTypes>({is_loading: false, setLoading: () => false});

type Props = {
  children: React.ReactNode;
};

const SpinnerProvider: React.FC<Props> = (props) => {
  const { children } = props;
  const [isLoading, setLoading] = React.useState(false);
  const initial = {
    is_loading: isLoading,
    setLoading
  }
  return (
    <SpinnerContext.Provider value={initial}>
      <MainWrapper>
        {children}
        <Spinner visible={isLoading} />
      </MainWrapper>
    </SpinnerContext.Provider>
  );
};

export default SpinnerProvider;
