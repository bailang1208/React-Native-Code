import {
  Dimensions,
  StatusBar,
  Platform
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
let STATUS_BAR_HEIGHT : number = StatusBar.currentHeight ? StatusBar.currentHeight : 0;
let MARGIN_TOP = 0;
if(Platform.OS == "ios") {
  const dimen = Dimensions.get('window');
  if(!Platform.isPad && !Platform.isTVOS && ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))) {
    MARGIN_TOP = 44;
  }
  else {
    MARGIN_TOP = 20;
  }
}

if(isNaN(STATUS_BAR_HEIGHT)) {
  STATUS_BAR_HEIGHT = 0;
}
let SCREEN_HEIGHT = DEVICE_HEIGHT - STATUS_BAR_HEIGHT;

const ACTION_BAR_HEIGHT = 52;
const ACTION_BAR_PADDING = 20;

const PADDING = 20;
const C_WIDTH = DEVICE_WIDTH - PADDING * 2;

export const Device = {
  width: DEVICE_WIDTH,
  height: DEVICE_HEIGHT,
  statusBarHeight: STATUS_BAR_HEIGHT,
  actionBarHeight: 52,
  actionBarPadding: 20,
  marginTop: MARGIN_TOP,
  visibleHeight: SCREEN_HEIGHT,
  padding: PADDING,
  contentWidth: C_WIDTH,
  contentHeight: SCREEN_HEIGHT - MARGIN_TOP - ACTION_BAR_HEIGHT - ACTION_BAR_PADDING
}