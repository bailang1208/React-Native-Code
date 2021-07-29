import styled from 'styled-components/native';
import { backgroundColors, borderColors } from '../../globalStyles';
import { Device } from '../../utils/Utils';

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
`;

const ContentWrap = styled.View`
  flex: 1;
`;

const TopActions = styled.View`
  position: absolute;
  width: 100%;
  min-height: 80px;
  background-color: transparent;
  padding: 40px 16px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  top: 0;
  z-index: 5;
`;

const InfoWrapper = styled.View`
  flex: 1;
  border-radius: 10px;
  background-color: white;
  box-shadow: 1px 1px 2px #00000020;
  padding: 10px;
  flex-direction: row;
`;

const DistanceView = styled.View`
  align-items: center;
  margin-right: 10px;
`;

const TimeInfoWrapper = styled.View`
  border: 1px solid transparent;
  border-bottom-color: ${borderColors.whiteGray};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-bottom: 7px;
  margin-bottom: 16px;
`;

const TimeInfoWrapperMulti = styled.View`
  border: 1px solid transparent;
  border-bottom-color: ${borderColors.whiteGray};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 7px;
  margin-bottom: 16px;
`;

const TimeInfoViewMulti = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center
`;

const OptimizeRouteButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border: 1px ${backgroundColors.primary};
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 20px;
`;

const CircleMark = styled.View`
  width: 16px;
  height: 16px;
  margin-horizontal: 10px;
  border-radius: 8px;
  background-color: ${backgroundColors.primary};
`;

const InnerWrapper = styled.View`
  flex-direction: row;
`;

const InfoWrap = styled.View`
  flex-grow: 1;
`;

const DetailBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Address = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const OrderNumber = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ItemOrder = styled.TouchableOpacity`
  width: ${Math.ceil(Device.width * 0.8)}px
  flex-direction: row;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 16px;
`;

export {
  DistanceView,
  TopActions,
  ContentWrap,
  Wrapper,
  OrderNumber,
  Address,
  DetailBtn,
  InfoWrap,
  InnerWrapper,
  CircleMark,
  TimeInfoWrapper,
  TimeInfoWrapperMulti,
  TimeInfoViewMulti,
  OptimizeRouteButton,
  InfoWrapper,
  ItemOrder,
};
