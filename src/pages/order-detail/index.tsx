import { StackActions } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { Linking } from 'react-native';
import BottomWrapper from '../../components/bottom-wrapper';
import NavBar from '../../components/nav-bar';
import OrderInfoCell from '../../components/order-info-cell';
import OrderProductCell from '../../components/order-product-cell';
import {
  OText,
  OIconText,
  OCheckbox,
  OIconButton,
} from '../../components/shared';
import { IMAGES, ORDER_STATUS, STATUS_GROUP, USER_TYPE } from '../../config/constants';
import { getOrderStatus, parsePrice } from '../../providers/Utilities';
import { backgroundColors, borderColors, labelTheme } from '../../globalStyles';
import { InlineWrapper, UnderLineWrap, Wrapper } from './styles';
import { StatusContext } from '../../contexts/StatusContext';
import Box from '../../components/shared/box';
import { appData } from '../../utils/AppData';
import { SpinnerContext } from '../../contexts/SpinnerContext';
import { api } from '../../providers/ApiProvider';
// import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

const PayIcons: PayProps = {
  cash: IMAGES.cash,
  paypal: IMAGES.paypal,
  card: IMAGES.card,
};

interface PayProps {
  cash: any;
  paypal: any;
  card: any;
}

type Props = {
  navigation: any;
  route: any;
  data?: any;
}

const OrderDetail: React.FC<Props> = (props) => {
  const { navigation, route, data } = props;

  const { setLoading } = useContext(SpinnerContext);
  const [order, setOrder] = useState(appData.getOrder());
  const [isArrived, setIsArrived] = useState(false);
  const products: Array<any> = order.products;

  const { curOrderStatus, updateOrderStatus } = useContext(StatusContext);

  useEffect(() => {
    api.getOrder(order.id).then((res) => {
      if (res?.content.error) {
        console.log('===== get order error =====');
      }
      else {
        console.log('===== get order success =====');
        setOrder(res?.content.result);
      }
    }).catch((err) => {
      console.log('===== get order error =====');
    })
  }, [])

  useEffect(() => {
    if(order) {
      updateOrderStatus(order.status);
      if(order.status == ORDER_STATUS.DRIVER_ARRIVED_BUSINESS) {
        console.log('===== order status change: ', order.status);
        setIsArrived(true);
      }
    }
  }, [order]);

  const onBack = () => {
    let stack = StackActions.pop(1);
    navigation.dispatch(stack);
  };

  const onContact = () => {
    navigation.navigate('Contact');
  };

  const onCheckArrived = (checked: boolean) => {
    const options = {
      order_id: order.id,
      status: ORDER_STATUS.DRIVER_ARRIVED_BUSINESS
    };
    setLoading(true);
    api.updateOrder(options).then((res) => {
      setLoading(false);
      if (res?.content.error) {
        console.log('===== update order error =====');
      }
      else {
        console.log('===== order update success =====');
        setIsArrived(true);
      }
    }).catch((err) => {
      setLoading(false);
      console.log('===== order update error =====');
    });
  };

  const onReject = () => {
    navigation.navigate('Reject', order);
  };

  const onAccept = () => {
    appData.setOrder(order);
    navigation.navigate('Accept', { orderId: order.id });
  };

  const onStartDelivery = () => {
    appData.setOrder(order);
    // navigation.navigate('MapBusiness', { order: order });
    let stack = StackActions.pop(1);
    navigation.dispatch(stack);
  };

  const bCall = () => {
    Linking.openURL(
      `tel:${order.business.cellphone || order.business.phone}`,
    );
  };

  const cCall = () => {
    Linking.openURL(
      `tel:${order.customer.cellphone || order.customer.phone}`,
    );
  };

  const bChat = () => {
    navigation.navigate('Chat', { type: USER_TYPE.BUSINESS, data: order });
  };

  const cChat = () => {
    navigation.navigate('Chat', { type: USER_TYPE.CUSTOMER, data: order });
  };

  const acceptItem = (
    <OCheckbox
      label={'Arrived at business'}
      size={16}
      checked={isArrived}
      onChange={onCheckArrived}
    />
  );

  const dateTime = <OText>{order.delivery_datetime}</OText>;

  const isInProgress = (status: number): boolean => {
    if (status == 3 || status == 8) {
      return true;
    } else {
      return false;
    }
  };

  // calculate prices ----------------------------------
  const subTotal = (products: Array<any>): number => {
    var total = 0;
    products.map((item) => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const serviceFee = (subTotal(order.products) * order.service_fee) / 100;
  const tax = order.tax_type == 1 ? order.tax : (subTotal(order.products) * order.tax) / 100;
  const total =
    subTotal(order.products) +
    serviceFee +
    tax +
    order.delivery_zone_price;

  useEffect(() => {
    // console.log('Current Order Status -------- ' + curOrderStatus);
  }, [curOrderStatus]);

  return (
    <>
      <NavBar
        title={`# ${order.id}`}
        subTitle={isInProgress(order.status) ? acceptItem : dateTime}
        titleAlign={'left'}
        onActionLeft={onBack}
        navigation={navigation}
        showCall={true}
      />
      <Wrapper>
        <OrderInfoCell
          title={'Business'}
          name={order.business.name}
          address={order.business.address}
          logo={order.business.logo}
          canContact={!STATUS_GROUP.COMPLETE.includes(curOrderStatus) && !STATUS_GROUP.CANCEL.includes(curOrderStatus)}
          onCall={bCall}
          onChat={bChat}
        />
        <OrderInfoCell
          title={'Customer'}
          name={`${order.customer.name} ${order.customer.lastname}`}
          address={order.customer.address}
          logo={order.customer.photo}
          dummy={IMAGES.customer}
          canContact={!STATUS_GROUP.COMPLETE.includes(curOrderStatus) && !STATUS_GROUP.CANCEL.includes(curOrderStatus)}
          onCall={cCall}
          onChat={cChat}
        />

        <UnderLineWrap>
          <OText style={{ textTransform: 'uppercase' }} size={15} weight={'500'}>
            {'Orders'}
          </OText>
        </UnderLineWrap>
        <UnderLineWrap>
          <OText color={labelTheme.primary} style={{ marginBottom: 10 }}>
            {'Paymethod'}
          </OText>
          <OIconText
            icon={
              PayIcons[order.paymethod.gateway as keyof PayProps]
                ? PayIcons[order.paymethod.gateway as keyof PayProps]
                : PayIcons.card
            }
            text={order.paymethod.name}
            imgStyle={{ marginRight: 8 }}
          />
        </UnderLineWrap>
        <UnderLineWrap>
          {products && products.length > 0
            ? products.map((item, index) => (
              <OrderProductCell key={index} data={item} />
            ))
            : null}
        </UnderLineWrap>
        <UnderLineWrap>
          <InlineWrapper>
            <OText>{'Subtotal'}</OText>
            <OText>{parsePrice(subTotal(order.products))}</OText>
          </InlineWrapper>
          <InlineWrapper>
            <OText>
              {order.tax_type == 1
                ? `Tax ${parsePrice(order.tax)}`
                : `Tax ${order.tax}%`}
            </OText>
            <OText>{parsePrice(tax)}</OText>
          </InlineWrapper>
          {order.delivery_zone_price > 0 ? (
            <InlineWrapper>
              <OText>{'Delivery Fee'}</OText>
              <OText>{parsePrice(order.delivery_zone_price)}</OText>
            </InlineWrapper>
          ) : null}
          <InlineWrapper>
            <OText>{`Service Fee (${order.service_fee}%)`}</OText>
            <OText>{parsePrice(serviceFee)}</OText>
          </InlineWrapper>
        </UnderLineWrap>
        <InlineWrapper style={{ marginBottom: 40 }}>
          <OText weight={'500'} size={18}>
            {'Total'}
          </OText>
          <OText weight={'500'} size={18} color={labelTheme.primary}>
            {parsePrice(total)}
          </OText>
        </InlineWrapper>
      </Wrapper>
      <BottomWrapper>
        {STATUS_GROUP.PENDING.includes(curOrderStatus) ? (
          <>
            <Box height={40} alignItems="center">
              <OIconText
                size={17}
                icon={order.status == ORDER_STATUS.PENDING ? IMAGES.pending : IMAGES.checkmark}
                color={labelTheme.primary}
                text={getOrderStatus(order.status)} />
            </Box>
            <Box flexDirection="row" justifyContent="space-between">
              <OIconButton
                style={{ flex: 0.3 }}
                height={46}
                onClick={onReject}
                bgColor={backgroundColors.error}
                borderColor={borderColors.error}
                icon={IMAGES.alert}
              />
              <OText style={{ width: 20 }} />
              <OIconButton
                title={'Accept Order'}
                onClick={onAccept}
                style={{ flex: 1 }}
                height={46}
                color={labelTheme.primary}
                textColor={labelTheme.light}
              />
            </Box>
          </>
        ) : STATUS_GROUP.INPROGRESS.includes(curOrderStatus) ? (
          <>
            <Box height={40} alignItems="center">
              <OIconText
                size={17}
                icon={isArrived ? IMAGES.home_line : IMAGES.checkmark_rect}
                color={labelTheme.primary}
                text={isArrived ? 'Driver arrived by Business' : 'Accepted by Driver'} />
            </Box>
            <Box height={50} flexDirection="row" justifyContent="space-between">
              <OIconButton
                style={{ flex: 0.3 }}
                onClick={onReject}
                height={46}
                bgColor={backgroundColors.error}
                borderColor={borderColors.error}
                icon={IMAGES.alert}
              />
              <OText style={{ width: 20 }} />
              <OIconButton
                title={'Start delivery'}
                style={{ flex: 1 }}
                onClick={onStartDelivery}
                height={46}
                disabled={!isArrived}
                color={labelTheme.primary}
                textColor={labelTheme.light}
                iconStyle={{ width: 12, marginRight: 20 }}
                icon={IMAGES.arrow_right}
              />
            </Box>
          </>
        ) : STATUS_GROUP.COMPLETE.includes(curOrderStatus) ? (
          <OIconText
            style={{ justifyContent: 'center', alignItems: 'center' }}
            icon={IMAGES.checkmark}
            textStyle={{ marginHorizontal: 10 }}
            size={17}
            color={labelTheme.primary}
            text={'Order Completed'}
          />
        ) : STATUS_GROUP.CANCEL.includes(curOrderStatus) ? (
          <OIconText
            style={{ justifyContent: 'center', alignItems: 'center' }}
            icon={IMAGES.close}
            color={labelTheme.error}
            textStyle={{ marginHorizontal: 10 }}
            size={17}
            text={'Order Failed'}
          />
        ) : null}
      </BottomWrapper>
    </>
  );
};

OrderDetail.defaultProps = {};

export default OrderDetail;
