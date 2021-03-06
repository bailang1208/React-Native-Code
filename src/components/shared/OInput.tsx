import * as React from 'react';
import {
  ImageSourcePropType,
  ImageStyle,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';
import OIcon from './OIcon';
import {backgroundColors} from '../../globalStyles';

const Wrapper = styled.View`
  background-color: ${backgroundColors.light};
  border-radius: 25px;
  border-width: 1px;
  padding-horizontal: 16px;
  height: 50px;
  flex-direction: row;
  align-items: center;
`;
const Input = styled.TextInput`
  flex-grow: 1;
  min-height: 30px;
  font-size: 15px;
  font-family: 'Poppins-Regular';
`;

interface Props {
  default?: TextInputProps;
  bgColor?: string;
  borderColor?: string;
  isRequired?: boolean;
  requiredMsg?: string;
  isDisabled?: boolean;
  isSecured?: boolean;
  style?: ViewStyle;
  placeholder?: string;
  icon?: ImageSourcePropType;
  iconColor?: string;
  iconStyle?: ImageStyle;
  value?: string;
  onChange?: any;
}

const OInput = (props: Props): React.ReactElement => {
  return (
    <Wrapper
      style={{
        backgroundColor: props.bgColor,
        borderColor: props.borderColor,
        ...props.style,
      }}>
      {props.icon ? (
        <OIcon
          src={props.icon}
          color={props.iconColor}
          width={20}
          height={20}
          style={{marginHorizontal: 10}}
        />
      ) : null}
      <Input
        {...props.default}
        secureTextEntry={props.isSecured}
        onChangeText={(txt) => props.onChange(txt)}
        defaultValue={props.value}
        placeholder={props.placeholder ? props.placeholder : ''}
      />
    </Wrapper>
  );
};

OInput.defaultProps = {
  iconColor: '#959595',
  bgColor: 'white',
  borderColor: 'white',
};

export default OInput;
