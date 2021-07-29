import styled from 'styled-components/native';

const Wrapper = styled.ScrollView`
  background-color: white;
  padding: 0px 16px;
`;
const UnderLineWrap = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #e6e6e6;
  padding-vertical: 15px;
`;
const InlineWrapper = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 4px;
`;

export {Wrapper, UnderLineWrap, InlineWrapper};
