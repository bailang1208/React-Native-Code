import React, { useState, useRef, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import io from 'socket.io-client';
import BottomWrapper from '../../components/bottom-wrapper';
import NavBar from '../../components/nav-bar';
import { OIconButton, OInput, OText } from '../../components/shared';
import OChatBubble from '../../components/shared/OChatBubble';
import { API, IMAGES, MessageType, USER_TYPE } from '../../config/constants';
import { backgroundColors, borderColors, labelTheme } from '../../globalStyles';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';
import {
  ActionWrapper,
  Inner,
  InputWrapper,
  SignatureWrap,
  SignatureWrapInner,
  Wrapper,
} from './styles';
import { api } from '../../providers/ApiProvider';
import { s_accessToken, s_userInfo } from '../../providers/StoreUtil';
import { ToastType, useToast } from '../../providers/ToastProvider';
import { appData } from '../../utils/AppData';

interface Props {
  navigation: any;
  route: any;
  onOK: (signature: any) => void;
}

const Chat = (props: Props) => {
  const { showToast } = useToast();

  const socket = useRef<any>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(appData.userId());
  const [orderData] = useState(props.route.params.data);
  const [type] = useState(props.route.params.type);
  const [showSignPad, onOffSignature] = useState(false);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const ref = useRef<SignatureViewRef>(null);

  useEffect(() => {
    initSocket();

    fetchMessage();

    return () => {

    }
  }, [])

  const initSocket = async () => {
    console.log('===== init socket =====');
    let accessToken = await s_accessToken();
    console.log(accessToken);
    let extraHeaders = {
      Authorization: `Bearer ${accessToken}`
    }
    console.log(extraHeaders);
    socket.current = io(API.SOCKET_URL, {
      extraHeaders: extraHeaders,
      query: `token=${accessToken}&project=${API.PROJECT}`,
      transports: ['websocket']
    });

    console.log('===== socket: ', socket.current);
    socket.current.on("connect", () => {
      console.log('===== connect =====');
    });

    // socket.current.on("message", () => {
    //   console.log('===== message =====');
    // });

    // socket.current.on('error', (err: any) => {
    //   console.log('===== error =====');
    //   console.log(err);
    // })

    // socket.current.on('connect_error', (err: any) => {
    //   console.log('===== connect error =====');
    //   console.log(err);
    // })

    socket.current.connect();
  }

  const fetchMessage = () => {
    setIsLoading(true);
    api.getOrderMessages(orderData.id).then((res) => {
      setIsLoading(false);
      if (res?.content.error) {
        console.log('===== get order message res error =====');
        console.log(res.content)
        showToast(ToastType.Error, res.content.error);
      }
      else {
        console.log('===== get order message =====');
        setMessageList(res?.content.result);
        // console.log(res?.content.result);
      }
    }).catch((err) => {
      setIsLoading(false);
      console.log('===== get order message error =====');
      console.log(err);
      showToast(ToastType.Error, err.message);
    });
  }

  const handleSignature = (signature: any) => {
    console.log(signature);
    // props.onOK(signature);
  }

  const onClearSign = () => {
    ref.current?.clearSignature();
  }

  const onReadSign = () => {
    ref.current?.readSignature();
    onClearSign();
  }

  const padStyle = `
    .m-signature-pad--body {
        bottom: 0;
    }
    .m-signature-pad--footer {
        background: red;
        display: none;
    }
  `;

  const goBack = () => {
    props.navigation.goBack();
  }

  const addImage = () => { };

  const addSignToggle = () => {
    onOffSignature(!showSignPad);
  }

  const onSend = async () => {
    if (message == '') {
      return '';
    }
    console.log(message);

    let canSee = type == USER_TYPE.BUSINESS ? '0,2,4' : '0,3,4';
    let params = {
      author_id: userId,
      order_id: orderData.id,
      type: MessageType.COMMENTS,
      can_see: canSee,
      comment: message
    }
    setIsLoading(true);
    api.addOrderMessage(orderData.id, params).then((res) => {
      setIsLoading(false);
      if (res?.content.error) {
        console.log(res.content);
        showToast(ToastType.Error, res.content.error);
      }
      else {
        setMessage('');
      }
    }).catch((err) => {
      setIsLoading(false);
      console.log(err);
      showToast(ToastType.Error, err.message);
    })
  }

  return (
    <Wrapper>
      <Spinner visible={isLoading} />
      <NavBar
        title={
          type == USER_TYPE.CUSTOMER
            ? orderData.customer.name
            : orderData.business.name
        }
        subTitle={
          <OText color={labelTheme.primary} size={17}>
            {'online'}
          </OText>
        }
        titleAlign={'left'}
        withIcon={true}
        icon={
          type == USER_TYPE.CUSTOMER
            ? orderData.customer.photo
            : orderData.business.logo
        }
        onActionLeft={goBack}
      />
      <Inner>
        {messageList.map((item: any, index: number) => <OChatBubble
          key={index}
          userId={userId}
          message={item}
        />)}
      </Inner>
      <BottomWrapper>
        {showSignPad ? (
          <SignatureWrap>
            <OText style={{ textTransform: 'uppercase' }}>
              {'Customer Signature'}
            </OText>
            <SignatureWrapInner>
              <SignatureScreen
                webStyle={padStyle}
                ref={ref}
                onOK={handleSignature}
                autoClear={false}
              />
            </SignatureWrapInner>
            <OIconButton
              icon={IMAGES.trash}
              borderColor={borderColors.clear}
              bgColor={backgroundColors.clear}
              style={{
                position: 'absolute',
                bottom: 16,
                left: -5,
              }}
              onClick={onClearSign}
            />
          </SignatureWrap>
        ) : null}
        <ActionWrapper>
          <InputWrapper>
            <OInput
              placeholder={'write a message...'}
              style={{ flex: 1, paddingHorizontal: 0 }}
              value={message}
              onChange={setMessage}
            />
            <OIconButton
              onClick={addImage}
              iconColor={labelTheme.lightGray}
              icon={IMAGES.image}
              style={{ borderWidth: 0, paddingLeft: 10, paddingRight: 0 }}
            />
          </InputWrapper>
          <OIconButton
            onClick={addSignToggle}
            icon={IMAGES.autograph}
            borderColor={borderColors.lightGray}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              marginHorizontal: 10,
            }}
          />
          <OIconButton
            onClick={onSend}
            icon={IMAGES.send}
            borderColor={borderColors.primary}
            bgColor={backgroundColors.primary}
            style={{ width: 50, height: 50, borderRadius: 25 }}
            iconStyle={{ marginTop: 3, marginRight: 2 }}
          />
        </ActionWrapper>
      </BottomWrapper>
    </Wrapper>
  )
}

export default Chat;