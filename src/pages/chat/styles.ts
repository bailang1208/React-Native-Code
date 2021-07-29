import styled from 'styled-components/native';
import {borderColors} from '../../globalStyles';

const Wrapper = styled.View`
  flex: 1;
`;
const Inner = styled.ScrollView`
  background-color: white;
  padding: 16px;
`;
const ActionWrapper = styled.View`
  flex-direction: row;
`;
const InputWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${borderColors.lightGray};
  border-radius: 25px;
  padding-horizontal: 14px;
`;
const SignatureWrap = styled.View`
  height: 179px;
  padding-bottom: 12px;
`;
const SignatureWrapInner = styled.View`
  margin-top: 5px;
  height: 87%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${borderColors.primary};
`;

export {
  Wrapper,
  Inner,
  ActionWrapper,
  InputWrapper,
  SignatureWrap,
  SignatureWrapInner,
};
