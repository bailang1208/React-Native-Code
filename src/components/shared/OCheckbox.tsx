import React from 'react';
import styled from 'styled-components/native';
import {backgroundColors, borderColors} from '../../globalStyles';

const Wrapper = styled.View``;
const Inner = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
const Box = styled.View`
  width: 20px;
  height: 20px;
  border: 1px solid grey;
  margin-right: 8px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;
const Check = styled.View`
  width: 12px;
  height: 7px;
  transform: rotate(-45deg);
  border: 3px solid grey;
  border-top-width: 0;
  border-right-width: 0;
  margin-top: -2px;
`;
const Title = styled.Text`
  font-family: 'Poppins-Regular';
`;
interface Props {
  label?: string;
  checked?: boolean;
  onChange?: any;
  checkColor?: string;
  textColor?: string;
  size?: number;
}

const OCheckbox = (props: Props) => {
  const { checked } = props;

  const checkToggle = (state: boolean) => {
    props.onChange(!state);
  };

  return (
    <>
      <Wrapper>
        <Inner onPress={() => checkToggle(checked || false)}>
          <Box
            style={{
              backgroundColor: checked ? backgroundColors.primary : 'white',
              borderColor: checked ? borderColors.primary : props.checkColor,
              width: props.size ? props.size + 5 : 20,
              height: props.size ? props.size + 5 : 20,
            }}>
            {checked ? <Check style={{borderColor: 'white'}} /> : null}
          </Box>
          <Title style={{color: props.textColor, fontSize: props.size}}>
            {props.label ? props.label : ''}
          </Title>
        </Inner>
      </Wrapper>
    </>
  );
};

OCheckbox.defaultProps = {
  checkColor: 'grey',
  textColor: 'black',
};

export default OCheckbox;
