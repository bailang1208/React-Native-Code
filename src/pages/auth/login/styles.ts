import styled from 'styled-components/native';

const BgWrapper = styled.ImageBackground`
  flex: 1;
`;
const LoginWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin-bottom: 0;
`;
const KeyboardView = styled.KeyboardAvoidingView`
  flex-grow: 1;
`;

export {BgWrapper, LoginWrapper, KeyboardView};
