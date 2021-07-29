export const HTTP_CONF = {
  PAGE_SIZE: 5,
};

export const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export const ORDER_STATUS = {
  GROUPED: -1,
  PENDING: 0,
  COMPLETED: 1,
  REJECTED: 2,
  DRIVER_ARRIVED_BUSINESS: 3,
  READY_FOR_PICKUP: 4,
  REJECTED_BY_BUSINESS: 5,
  CANCELLED_BY_DRIVER: 6,
  ACCEPTED_BY_BUSINESS: 7,
  ACCEPTED_BY_DRIVER: 8,
  PICKUP_COMPLETED_BY_DRIVER: 9,
  PICKUP_FAILED_BY_DRIVER: 10,
  DELIVERY_COMPLETED_BY_DRIVER: 11,
  DELIVERY_FAILED_BY_DRIVER: 12,
  PREORDER: 13,
  ORDER_NOT_READY: 14,
  PICKUP_COMPLETED_BY_CUSTOMER: 15,
  CANCELED_BY_CUSTOMER: 16,
  NOT_PICKED_BY_CUSTOMER: 17,
  DRIVER_ALMOST_ARRIVED_TO_BUSINESS: 18,
  DRIVER_ALMOST_ARRIVED_TO_CUSTOMER: 19,
  CUSTOMER_ALMOST_ARRIVED_TO_BUSINESS: 20,
  CUSTOMER_ARRIVED_TO_BUSINESS: 21,
};

export const STATUS_GROUP = {
  PENDING: [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.READY_FOR_PICKUP,
    ORDER_STATUS.ACCEPTED_BY_BUSINESS,
  ],
  INPROGRESS: [
    ORDER_STATUS.DRIVER_ARRIVED_BUSINESS,
    ORDER_STATUS.ACCEPTED_BY_DRIVER,
  ],
  COMPLETE: [
    ORDER_STATUS.COMPLETED,
    ORDER_STATUS.PICKUP_COMPLETED_BY_DRIVER,
    ORDER_STATUS.DELIVERY_COMPLETED_BY_DRIVER,
  ],
  CANCEL: [
    ORDER_STATUS.REJECTED,
    ORDER_STATUS.REJECTED_BY_BUSINESS,
    ORDER_STATUS.CANCELLED_BY_DRIVER,
    ORDER_STATUS.PICKUP_FAILED_BY_DRIVER,
    ORDER_STATUS.DELIVERY_FAILED_BY_DRIVER,
  ],
};

export const DECIMAL = {
  // They are no longer configured from the builder, by default they are "Point" and "2"
  separator: '.',
  length: 2,
  currency: '$',
};

export const STORAGE_KEY = {
  ONLINE: 'app_is_online',
  USER: 'user_information',
  IS_SPINNER: 'app_calling_api_spinner',
};

export const DIRECTION = {
  RIGHT: 'right',
  LEFT: 'left',
  CENTER: 'center'
};

export const USER_TYPE = {
  ADMINISTRATOR: 0,
  BUSINESS: 2,
  CUSTOMER: 3,
  DRIVER: 4,
};

export const MessageType = {
  NONE: 0,
  ORDER_STATUS_CHANGE: 1,
  COMMENTS: 2,
  IMAGES: 3,
  SIGNATURE1: 4,
  SIGNATURE2: 5
}

export const IMAGES = {
  menu: require('../assets/icons/menu.png'),
  lunch: require('../assets/icons/lunch.png'),
  avatar: require('../assets/images/avatar.jpg'),
  arrow_up: require('../assets/icons/arrow_up.png'),
  arrow_left: require('../assets/icons/arrow_left.png'),
  map: require('../assets/icons/map.png'),
  marker: require('../assets/images/marker.png'),
  email: require('../assets/icons/ic_email.png'),
  lock: require('../assets/icons/ic_lock.png'),
  camera: require('../assets/icons/camera.png'),
  support: require('../assets/icons/help.png'),
  trash: require('../assets/icons/trash.png'),
  phone: require('../assets/icons/phone.png'),
  mail: require('../assets/icons/mail.png'),
  chat: require('../assets/icons/chat.png'),
  home: require('../assets/icons/home.png'),
  pending: require('../assets/icons/pending.png'),
  inprogress: require('../assets/icons/inprogress.png'),
  completed: require('../assets/icons/completed.png'),
  canceled: require('../assets/icons/canceled.png'),
  home_bg: require('../assets/images/home_bg.png'),
  dropdown: require('../assets/icons/drop_down.png'),
  group: require('../assets/icons/group.png'),
  calendar: require('../assets/icons/calendar.png'),
  app_logo: require('../assets/images/app-logo.png'),
  menu_orders: require('../assets/icons/menu-orders.png'),
  menu_user: require('../assets/icons/menu-user.png'),
  menu_help: require('../assets/icons/menu-help.png'),
  menu_logout: require('../assets/icons/menu-logout.png'),
  cash: require('../assets/icons/wallet.png'),
  paypal: require('../assets/icons/paypal.png'),
  card: require('../assets/icons/card.png'),
  customer: require('../assets/images/customer.png'),
  alert: require('../assets/icons/alert.png'),
  arrow_right: require('../assets/icons/arrow_right.png'),
  checkmark: require('../assets/icons/checkmark.png'),
  close: require('../assets/icons/close.png'),
  upload: require('../assets/icons/upload.png'),
  pin_outline: require('../assets/icons/pin_outline.png'),
  image: require('../assets/icons/image.png'),
  autograph: require('../assets/icons/autograph.png'),
  send: require('../assets/icons/send.png'),
  checkmark_rect: require('../assets/icons/checkmark-rect.png'),
  home_line: require('../assets/icons/home-line.png'),
  tutor_1: require('../assets/images/tutor_1.png'),
  tutor_2: require('../assets/images/tutor_2.png'),
  ic_position: require('../assets/icons/ic_position.png'),
};
