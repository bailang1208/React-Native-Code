import * as React from 'react';
import styled from 'styled-components/native';
import {borderColors, labelTheme} from '../../globalStyles';

const Wrapper = styled.View`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${borderColors.lightGray};
`;
const Inner = styled.TextInput`
  height: 150px;
`;

type Props = {
  lines?: number;
  value?: string;
  placeholder?: string;
  onChangeValue?: (e:string) => void;
}

const OTextarea = (props: Props) => {
  return (
    <Wrapper>
      <Inner
        placeholder={props.placeholder}
        placeholderTextColor={labelTheme.lightGray}
        numberOfLines={props.lines}
        underlineColorAndroid={'transparent'}
        value={props.value}
        multiline={true}
        onChangeText={props.onChangeValue}
      />
    </Wrapper>
  );
};

export default OTextarea;
