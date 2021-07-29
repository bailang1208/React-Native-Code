import styled from 'styled-components/native';
import {
  backgroundColors,
  borderColors,
  buttonTheme,
  labelTheme,
} from '../../../globalStyles';

const StyledButton = styled.View`
  background-color: ${backgroundColors.light};
  border-radius: 26px;
  border-width: 2px;
  height: 52px;
  border-color: ${borderColors.light};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 2px #00000020;
  elevation: 2;
  padding-left: 20px;
  padding-right: 20px;
  position: relative;
`;
const StyledButtonDisabled = styled(StyledButton)`
  background-color: ${backgroundColors.dark};
  border-color: ${backgroundColors.dark};
`;

const StyledText = styled.Text`
  font-size: 16px;
  color: ${buttonTheme.fontColor};
  margin-left: 10px;
  margin-right: 10px;
  font-family: 'Poppins-Regular';
`;

const StyledTextDisabled = styled(StyledText)`
  color: ${labelTheme.gray};
`;

const StyledImage = styled.Image`
  width: 24px;
  height: 24px;
  resize-mode: contain;
`;
const EndImage = styled.Image`
  width: 15px;
  height: 15px;
  resize-mode: contain;
  right 20px;
  position: absolute;
  right: 20px;
`;

export {
  StyledButton,
  StyledButtonDisabled,
  StyledText,
  StyledTextDisabled,
  StyledImage,
  EndImage,
};
