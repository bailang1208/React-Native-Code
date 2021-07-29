// App Global Status reducer -------

export const INITIAL_STATUS = {
  is_spinner: false,
  is_available: false,
};

export const ACTION_TYPES = {
  SPINNER_ON: 'on_loading_spinner',
  SPINNER_OFF: 'off_loading_spinner',
  AVAILABLE_ON: 'on_user_available_status',
  AVAILABLE_OFF: 'off_user_available_status',
};

const statusReducer = (state: any, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SPINNER_ON:
      return {...state, is_spinner: true};
    case ACTION_TYPES.SPINNER_OFF:
      return {...state, is_spinner: false};
    case ACTION_TYPES.AVAILABLE_ON:
      return {...state, is_available: true};
    case ACTION_TYPES.AVAILABLE_OFF:
      return {...state, is_available: false};
    default:
      throw new Error('Unexpected Action!');
  }
};

export default statusReducer;
