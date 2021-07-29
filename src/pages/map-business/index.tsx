import React, { useState, useEffect, useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList, View } from 'react-native';
import BottomWrapper from '../../components/bottom-wrapper';
import OrderMap from '../../components/order-map';
import { OButton, OIcon, OText } from '../../components/shared';
import { IMAGES, ORDER_STATUS } from '../../config/constants';
import { SpinnerContext } from '../../contexts/SpinnerContext';
import { labelTheme } from '../../globalStyles';
import { api } from '../../providers/ApiProvider';
import { appData } from '../../utils/AppData';
import {
  Address,
  CircleMark,
  ContentWrap,
  DetailBtn,
  DistanceView,
  InfoWrap,
  InfoWrapper,
  InnerWrapper,
  ItemOrder,
  OrderNumber,
  TimeInfoWrapper,
  TimeInfoWrapperMulti,
  TimeInfoViewMulti,
  OptimizeRouteButton,
  TopActions,
  Wrapper,
} from './styles';
import { StyledButton, StyledImage } from '../../components/shared/OButton/styles';

type Props = {
  navigation: any;
  route: any;
}

const initOrderList: Array<any> = [];
const initOrder: any = null;
const initDestination: any = null;
const initWayPoints: Array<any> = [];
// const initWayPoints: Array<any> = [
//   { 
//     latitude: 40.7571862510993,
//     longitude: -73.98988634347916 
//   },
//   { 
//     latitude: 40.755817868196246,
//     longitude: -73.97277753800154 
//   }
// ];

const MapBusiness: React.FC<Props> = (props) => {
  const { navigation } = props;
  const { top } = useSafeAreaInsets();
  const { setLoading } = useContext(SpinnerContext);
  const [orderList, setOrderList] = useState(initOrderList);
  const [order, setOrder] = useState(initOrder);
  const [destination, setDestination] = useState(initDestination);
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [wayPoints, setWayPoints] = useState(initWayPoints);

  const getLatLng = (obj: any) => {
    return { latitude: obj.lat, longitude: obj.lng }
  }

  useEffect(() => {
    console.log('===== map business =====');
    if (appData.getInprogressOrders().length > 0) {
      setOrderList(appData.getInprogressOrders());
      let curOrder = appData.getInprogressOrders()[0];
      setOrder(curOrder);
    }
  }, []);

  useEffect(() => {
    // console.log('===== changed order: ', order);
    if (order) {
      if (order.status == ORDER_STATUS.DRIVER_ARRIVED_BUSINESS) {
        setDestination(getLatLng(order.customer.location));
      }
      else {
        setDestination(getLatLng(order.business.location));
      }
    }
  }, [order]);

  const goOrders = () => {
    navigation.navigate('MapOrders', { is_order_list: true });
  };

  const onClickOrderDetail = (item: any) => {
    console.log('===== on click order detail =====');
    appData.setOrder(item);
    navigation.navigate('OrderDetail');
  };

  const changedMapData = React.useCallback((data) => {
    console.log(`Distance: ${data.distance} km`);
    console.log(`Duration: ${data.duration} min`);
    setDistance(data.distance);
    setDuration(data.duration);

    if (order && data.distance < 1) {
      if (order.status == ORDER_STATUS.DRIVER_ARRIVED_BUSINESS) {
        const options = {
          order_id: order.id,
          status: ORDER_STATUS.DELIVERY_COMPLETED_BY_DRIVER
        };
        setLoading(true);
        api.updateOrder(options).then((res) => {
          setLoading(false);
          console.log('===== order update success =====');
        }).catch((err) => {
          setLoading(false);
          console.log('===== order update error =====');
        });
      }
      else {
        const options = {
          order_id: order.id,
          status: ORDER_STATUS.DRIVER_ARRIVED_BUSINESS
        };
        setLoading(true);
        api.updateOrder(options).then((res) => {
          setLoading(false);
          console.log('===== order update success =====');
        }).catch((err) => {
          setLoading(false);
          console.log('===== order update error =====');
        });
      }
    }
  }, []);

  const onClickOptimizeRoute = () => {
    console.log('===== on click optimize route =====', orderList.length);
    if (orderList.length > 1) {
      let posList = [];
      for (let i = 0; i < orderList.length; i++) {
        let obj = orderList[i];
        if (obj.id != order.id) {
          if (obj.status == ORDER_STATUS.DRIVER_ARRIVED_BUSINESS) {
            posList.push(getLatLng(obj.customer.location));
          }
          else {
            posList.push(getLatLng(obj.business.location));
          }
        }
      }
      setWayPoints(posList);
    }
  }

  const onClickOrder = (item: any) => {
    console.log('===== on click order =====');
    setWayPoints([]);
    setOrder(item);
  }

  const renderItem = ({ item }: any) => {
    return (
      <ItemOrder onPress={() => { onClickOrder(item) }}>
        <OIcon
          url={item.business.logo}
          width={80}
          height={80}
          style={{
            borderRadius: 10,
            borderColor: '#e5e5e5',
            borderWidth: 1,
            marginRight: 10,
          }}
        />
        <InfoWrap>
          <OrderNumber>
            <OText size={22} weight={'600'}>
              {`#${item.id}`}
            </OText>
            <DetailBtn onPress={() => { onClickOrderDetail(item) }}>
              <OText
                color={labelTheme.primary}
                weight={'300'}
                style={{ textTransform: 'uppercase' }}>
                {'See Details'}
              </OText>
            </DetailBtn>
          </OrderNumber>
          <OText size={18} weight={'500'} style={{ marginTop: -6 }}>
            {item.business.name}
          </OText>
          <Address>
            <OIcon
              src={IMAGES.pin_outline}
              width={15}
              style={{ marginRight: 4 }}
            />
            <OText isWrap={true} weight={'300'} size={12.5}>
              {item.business.address}
            </OText>
          </Address>
        </InfoWrap>
      </ItemOrder>
    );
  };

  return (
    <>
      <Wrapper>
        <ContentWrap>
          <TopActions style={{ paddingTop: top || 16 }}>
            <InfoWrapper>
              <DistanceView>
                <OIcon src={IMAGES.upload} width={28} height={28} />
                <OText style={{ marginTop: 5 }}>{'128ft'}</OText>
              </DistanceView>
              <OText isWrap={true}>{'Qingnian Street Wenan Load No.22'}</OText>
            </InfoWrapper>
            <OText style={{ width: 15 }}>{''}</OText>
            <OButton
              isCircle={true}
              onClick={goOrders}
              imgRightSrc={null}
              imgLeftSrc={IMAGES.lunch}
            />
          </TopActions>
          <OrderMap
            destination={destination}
            wayPoints={wayPoints}
            changedMapData={changedMapData}
          />
        </ContentWrap>
        <BottomWrapper>
          {orderList.length > 1 && <TimeInfoWrapperMulti>
            {duration > 1 && <TimeInfoViewMulti>
              <OText size={19}>{duration > 0 ? `${Math.floor(duration)} min` : ''}</OText>
              <CircleMark />
              <OText size={19}>{distance > 0 ? `${parseFloat(distance.toFixed(1))} km` : ''}</OText>
            </TimeInfoViewMulti>}
            {duration <= 1 && <TimeInfoViewMulti>
              <OText size={19}>Arriving soon</OText>
            </TimeInfoViewMulti>}
            <OptimizeRouteButton onPress={onClickOptimizeRoute}>
              <StyledImage source={IMAGES.ic_position} />
              <OText>Optimize Route</OText>
            </OptimizeRouteButton>
          </TimeInfoWrapperMulti>}
          {orderList.length > 1 && <FlatList
            horizontal
            data={orderList}
            renderItem={renderItem}
          />}
          {orderList.length == 1 && duration > 1 && <TimeInfoWrapper>
            <OText size={19}>{duration > 0 ? `${Math.floor(duration)} min` : ''}</OText>
            <CircleMark />
            <OText size={19}>{distance > 0 ? `${parseFloat(distance.toFixed(1))} km` : ''}</OText>
          </TimeInfoWrapper>}
          {orderList.length == 1 && duration <= 1 && <TimeInfoWrapper>
            <OText size={19}>Arriving soon</OText>
          </TimeInfoWrapper>}
          {order && orderList.length == 1 ? (
            <InnerWrapper>
              <OIcon
                url={order.business.logo}
                width={80}
                height={80}
                style={{
                  borderRadius: 10,
                  borderColor: '#e5e5e5',
                  borderWidth: 1,
                  marginRight: 10,
                }}
              />
              <InfoWrap>
                <OrderNumber>
                  <OText size={22} weight={'600'}>
                    {`#${order.id}`}
                  </OText>
                  <DetailBtn onPress={onClickOrder}>
                    <OText
                      color={labelTheme.primary}
                      weight={'300'}
                      style={{ textTransform: 'uppercase' }}>
                      {'See Details'}
                    </OText>
                  </DetailBtn>
                </OrderNumber>
                <OText size={18} weight={'500'} style={{ marginTop: -6 }}>
                  {order.business.name}
                </OText>
                <Address>
                  <OIcon
                    src={IMAGES.pin_outline}
                    width={15}
                    style={{ marginRight: 4 }}
                  />
                  <OText isWrap={true} weight={'300'} size={12.5}>
                    {order.business.address}
                  </OText>
                </Address>
              </InfoWrap>
            </InnerWrapper>
          ) : null}
        </BottomWrapper>
      </Wrapper>
    </>
  );
};

export default MapBusiness;