import * as React from 'react';
import {ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Wrapper} from './styles';

interface Props {
  style?: ViewStyle;
  children: any;
}

const BottomWrapper = (props: Props) => {
  const safeAreaInset = useSafeAreaInsets();
  return (
    <Wrapper
      style={{paddingBottom: safeAreaInset.bottom || 16, ...props.style}}>
      {props.children}
    </Wrapper>
  );
};

export default BottomWrapper;
