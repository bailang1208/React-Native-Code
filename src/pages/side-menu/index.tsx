import {DrawerActions} from '@react-navigation/native';
import * as React from 'react';
import ToggleSwitch from 'toggle-react-native';
import {OIcon, OIconButton, OText} from '../../components/shared';
import {IMAGES, STORAGE_KEY} from '../../config/constants';
import {AuthContext, AuthContextProps} from '../../contexts/AuthContext';

import ApiProvider from '../../providers/ApiProvider';
import {
  s_userInfo,
  _removeStoreData,
  _removeStoreKey,
  _setStoreData,
} from '../../providers/StoreUtil';
import {backgroundColors, labelTheme} from '../../globalStyles';
import {MenuItemsWrap, TopWrapper, Wrapper} from './styles';
import { StatusContext } from '../../contexts/StatusContext';
import { SpinnerContext } from '../../contexts/SpinnerContext';

type Props = {
  navigation: any;
  route: any;
};

const SideMenu: React.FC<Props> = (props) => {
  const { navigation } = props;
  const {signOut} = React.useContext(AuthContext) as AuthContextProps;

  const api = new ApiProvider();
  const { isOnline, updateOnOffLine } = React.useContext(StatusContext);
  const { setLoading } = React.useContext(SpinnerContext);
  
  const onSwitchStatus = async () => {
    setLoading(true);
    const is_updated = await api.updateUser({available: !isOnline});
    const res = api.parseResponse(is_updated);
    if (res.error) {
      // failed to update
    } else {
      const user = await s_userInfo();
      user.available = res.result.available;
      _setStoreData(STORAGE_KEY.USER, user);
      updateOnOffLine(user.available);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    s_userInfo('available').then((status) => {
      updateOnOffLine(status || false);
    });
  }, []);

  const onLogout = async () => {
    await _removeStoreKey(STORAGE_KEY.USER);
    navigation.dispatch(DrawerActions.closeDrawer());

    if (signOut != undefined) {
      signOut();
    }
  };

  return (
    <Wrapper>
      {/* <Spinner visible={g_status.is_spinner} /> */}
      <TopWrapper>
        <OIcon src={IMAGES.app_logo} width={190} height={90} />
        <OIcon
          src={IMAGES.avatar}
          width={100}
          height={100}
          style={{borderRadius: 14}}
        />

        <OText size={20} style={{marginTop: 15}}>
          {'Dragon Team'}
        </OText>
        <OText
          size={14}
          style={{marginTop: 12, marginBottom: 6, textTransform: 'uppercase'}}
          color={isOnline ? labelTheme.primary : 'grey'}>
          {isOnline ? "You're online" : "You're offline"}
        </OText>
        <ToggleSwitch
          isOn={isOnline}
          onColor={backgroundColors.primary}
          onToggle={onSwitchStatus}
        />
      </TopWrapper>
      <MenuItemsWrap>
        <OIconButton
          icon={IMAGES.menu_orders}
          title={'MyOrders'}
          style={{justifyContent: 'flex-start', height: 50}}
          borderColor={'transparent'}
          textStyle={{marginHorizontal: 20}}
          onClick={() => {
            navigation.navigate('MapOrders');
          }}
        />
        <OIconButton
          icon={IMAGES.menu_user}
          title={'Profile'}
          style={{justifyContent: 'flex-start', height: 50}}
          borderColor={'transparent'}
          textStyle={{marginHorizontal: 20}}
          onClick={() => {
            navigation.navigate('Profile');
          }}
        />
        <OIconButton
          icon={IMAGES.menu_help}
          title={'Supports'}
          style={{justifyContent: 'flex-start', height: 50}}
          borderColor={'transparent'}
          textStyle={{marginHorizontal: 20}}
          onClick={() => {
            navigation.navigate('Supports');
          }}
        />
        <OIconButton
          icon={IMAGES.menu_logout}
          title={'Logout'}
          style={{justifyContent: 'flex-start', height: 50}}
          borderColor={'transparent'}
          textStyle={{marginHorizontal: 20}}
          onClick={onLogout}
        />
      </MenuItemsWrap>
    </Wrapper>
  );
};

export default SideMenu;
