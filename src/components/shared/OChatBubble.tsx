import * as React from 'react';
import styled from 'styled-components/native';
import { MessageType } from '../../config/constants';
import { backgroundColors, labelTheme } from '../../globalStyles';
import { checkNullString, getOrderStatus } from '../../providers/Utilities';
import OText from './OText';

const Wrapper = styled.View`
  flex: 1;
  border-radius: 35px;
  min-height: 50px;
  padding-horizontal: 25px;
  padding-vertical: 10px;
  max-width: 80%;
  margin-bottom: 14px;
`;

interface Props {
  userId: string,
  message?: any;
}

const OChatBubble = (props: Props) => {

  const ownerMessage = () => {
    if (props.message.author_id == props.userId) return true;
    return false;
  }

  const msgStyle = () => {
    if (props.message.type == MessageType.ORDER_STATUS_CHANGE || props.message.type == MessageType.NONE) {
      return {
        borderRadius: 5,
        backgroundColor: backgroundColors.gray,
        alignSelf: 'center',
      }
    }

    if (props.message.author_id == props.userId) {
      return {
        borderBottomRightRadius: 0,
        backgroundColor: backgroundColors.primary,
        alignSelf: 'flex-end',
      }
    }
    else {
      return {
        borderBottomLeftRadius: 0,
        backgroundColor: backgroundColors.gray,
        alignSelf: 'flex-start',
      }
    }
  }

  const content = () => {
    if (props.message.type == MessageType.NONE) {
      return `Order placed for ${props.message.created_at}`;
    }
    else if (props.message.type == MessageType.ORDER_STATUS_CHANGE) {
      if (props.message.change.attribute == 'driver_id' && props.message.driver != null) {
        return `${props.message.driver.name} ${checkNullString(props.message.driver.lastname)} was assigned as driver.`;
      }
      else {
        return `Order ${props.message.change.attribute} changed from ${getOrderStatus(props.message.change.old)} to ${getOrderStatus(props.message.change.new)}.`;
      }
    }
    else if (props.message.type == MessageType.COMMENTS) {
      return props.message.comment;
    }

    return '';
  }

  return (
    <Wrapper
      style={msgStyle()}>
      <OText
        color={ownerMessage() ? labelTheme.light : labelTheme.dark}>
        {content()}
      </OText>
      <OText
        color={ownerMessage() ? labelTheme.light : labelTheme.dark}
        style={{ textAlign: 'right' }}
        size={9}>
        {props.message.created_at}
      </OText>
    </Wrapper>
  );
};

export default OChatBubble;
