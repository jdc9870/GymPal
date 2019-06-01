export const LOG_IN = 'LOG_IN'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'
export const LOG_OUT = 'LOG_OUT'

export const CODE_SENT = 'CODE_SENT'
export const CODE_SENT_ERROR = 'CODE_SENT_ERROR'
export const CODE_DISPATCHED = 'CODE_DISPATCHED'
export const CODE_CONFIRM_ERROR = 'CODE_CONFIRM_ERROR'

export const INPUT_NAME = 'INPUT_NAME';
export const INPUT_NAME_SUCCESS = 'INPUT_NAME_SUCCESS';

export const INPUT_BIRTHDAY = 'INPUT_BIRTHDAY';
export const INPUT_BIRTHDAY_SUCCESS = 'INPUT_BIRTHDAY_SUCCESS';

export const INPUT_GENDER = 'INPUT_GENDER';
export const INPUT_GENDER_SUCCESS = 'INPUT_GENDER_SUCCESS';

export const INPUT_PREFERENCE = 'INPUT_PREFERENCE';
export const INPUT_PREFERENCE_SUCCESS = 'INPUT_PREFERENCE_SUCCESS';

export const UPLOAD_PICTURE = 'UPLOAD_PICTURE';
export const PICTURE_UPLOAD_ERROR = 'PICTURE_UPLOAD_ERROR';

export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const NEW_USER = 'NEW_USER';
export const NEW_USER_CREATED = 'NEW_USER_CREATED';

export const CONFIRM_SIGNUP = 'CONFIRM_SIGNUP'
export const CONFIRM_SIGNUP_SUCCESS = 'CONFIRM_SIGNUP_SUCCESS'
export const CONFIRM_SIGNUP_FAILURE = 'CONFIRM_SIGNUP_FAILURE'

export const CONFIRM_LOGIN = 'CONFIRM_LOGIN'
export const CONFIRM_LOGIN_SUCCESS = 'CONFIRM_LOGIN_SUCCESS'
export const CONFIRM_LOGIN_FAILURE = 'CONFIRM_LOGIN_FAILURE'

const initialState = {
  isAuthenticating: false,
  user: {},

  message: '',
  loading: false,
  codeInput: '',
  confirmResult: null,
  newUser: false,
  progress: 0,

  signUpError: false,
  signInError: false,

  confirmSignUpError: false,
  confirmLoginError: false,

  signInErrorMessage: '',
  signUpErrorMessage: '',
}

export default (state = initialState, action) => {
  switch(action.type) {
    case CONFIRM_SIGNUP:
      return {
        ...state,
        isAuthenticating: false
      }
    case NEW_USER:
      return {
        ...state,
        newUser: true,
        isAuthenticating: false,
      }
    case NEW_USER_CREATED:
      return {
        ...state,
        newUser: false,
        user: action.user,
        isAuthenticating: false,
      }
    case SIGN_UP:
      return {
        ...state,
        isAuthenticating: true,

      }
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        user: action.user,
      }
    case SIGN_UP_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        signUpError: true,
        signUpErrorMessage: action.error.message
      }
    case CODE_DISPATCHED:
      return {
        ...state,
        isAuthenticating: true,
        message: ''
      }
    case CODE_SENT:
      return {
        ...state,
        isAuthenticating: false,
        message: 'Code has been sent!',
        confirmResult: action.payload
      }
    case CODE_SENT_ERROR:
      return {
        ...state,
        isAuthenticating: false,
        message: action.error.message,
        confirmResult: null
      }
    case CODE_CONFIRM_ERROR:
      return {
        ...state,
        isAuthenticating: false,
        message: action.error.message
      }
    case LOG_IN:
      return {
        ...state,
        isAuthenticating: true,
        signInError: false
      }
    case LOG_IN_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        user: action.user,
      }
    case LOG_IN_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        signInError: true,
        signInErrorMessage: action.error.message
      }
    case CONFIRM_LOGIN: {
      return {
        ...state,
        isAuthenticating: true
      }
    }
    case LOG_OUT:
      return {
        ...initialState,
      }
    case INPUT_NAME:
      return {
        ...state,
        isAuthenticating: true
      }
    case INPUT_NAME_SUCCESS:
      return {
        ...state,
        isAuthenticating: false
      }
    case INPUT_BIRTHDAY:
      return {
        ...state,
        isAuthenticating: true
      }
    case INPUT_BIRTHDAY_SUCCESS:
      return {
        ...state,
        isAuthenticating: false
      }
    case INPUT_GENDER:
      return {
        ...state,
        isAuthenticating: true
      }
    case INPUT_GENDER_SUCCESS:
      return {
        ...state,
        isAuthenticating: false
      }
    case INPUT_PREFERENCE:
      return {
        ...state,
        isAuthenticating: true
      }
    case INPUT_PREFERENCE_SUCCESS:
      return {
        ...state,
        isAuthenticating: false
      }
    case PICTURE_UPLOAD_ERROR:
      return {
        ...state,
        message: action.error.message
      }
    case UPLOAD_PICTURE:
      return {
        ...state,
        isAuthenticating: true
      }
    default:
      return state
  }
}
