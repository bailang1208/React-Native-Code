import * as React from 'react';
import {ImageSourcePropType, ImageStyle, TextStyle, ViewStyle} from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex-direction: row;
  alignItems: center;
`;
const Icon = styled.Image`
  resize-mode: contain;
  tint-color: black;
  margin-right: 5px;
`;
const Label = styled.Text`
  flex-wrap: wrap;
  color: black;
  font-size: 14px;
  font-family: 'Poppins-Regular';
`;

interface Props {
  icon?: ImageSourcePropType;
  text?: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
  imgStyle?: ImageStyle;
  textStyle?: TextStyle;
}

const OIconText = (props: Props) => {
  return (
    <Wrapper style={props.style}>
      {props.icon ? (
        <Icon
          source={props.icon}
          style={{
            width: props.size ? props.size : 18,
            height: props.size ? props.size : 18,
            tintColor: props.color,
            ...props.imgStyle,
          }}
        />
      ) : null}
      <Label
        style={{
          fontSize: props.size ? props.size : 14,
          color: props.color,
          ...props.textStyle,
        }}>
        {props.text}
      </Label>
    </Wrapper>
  );
};

OIconText.defaultProps = {};

export default OIconText;
