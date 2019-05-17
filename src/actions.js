import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CONFIRM_LOGIN,
} from './reducers/auth'

import { Alert } from 'react-native';
import firebase from 'react-native-firebase';

function signUp() {
  return {
    type: SIGN_UP
  }
}

function signUpSuccess(user) {
  return {
    type: SIGN_UP_SUCCESS,
    user
  }
}

function signUpFailure(err) {
  return {
    type: SIGN_UP_FAILURE,
    error: err
  }
}

export function createUser(fullname, password, email, phone_number) {
  return (dispatch) => {
    dispatch(signUp())
    let phone
    const firstTwoDigits = phone_number.substring(0, 2)
    if (firstTwoDigits === '+1') {
      phone = phone_number
    } else {
      phone = '+1' + phone_number
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email,password)
      .then(userCredentials => {
        console.log('data from signUp: ', userCredentials)
        const data = {
          email: email,
          fullname: fullname,
          phone: phone,
          appIdentifier: "rn-android-universal-listings"
        };
        user_uid = userCredentials.user._user.uid;
        firebase
          .firestore()
          .collection("users")
          .doc(user_uid)
          .set(data);
        firebase
          .firestore()
          .collection("users")
          .doc(user_uid)
          .get();
        if (userCredentials.user) {
          userCredentials.user.updateProfile({
            displayName: fullname
          }).then((s) => {
            dispatch(signUpSuccess(userCredentials.user))
          })
        }
        // dispatch(signUpSuccess(userCredentials))
      })
      .catch(err => {
        console.log('error signing up: ', err)
        dispatch(signUpFailure(err))
      })
  }
}

function logIn() {
  return {
    type: LOG_IN
  }
}

export function logOut() {
  return {
    type: LOG_OUT
  }
}

function logInSuccess(user) {
  return {
    type: LOG_IN_SUCCESS,
    user: user
  }
}

function logInFailure(err) {
  return {
    type: LOG_IN_FAILURE,
    error: err
  }
}

export function authenticate(email, password) {
  return (dispatch) => {
    dispatch(logIn())
    // Make firebase version
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        user_uid = response.user._user.uid;
        firebase
          .firestore()
          .collection("users")
          .doc(user_uid)
          .get()
          .then(function(user) {
            if (user.exists) {
              dispatch(logInSuccess(user))
              dispatch(confirmLogIn())
            } else {
              alert("User does not exist! Please try again.")
            }
          })
          .catch(err => {
            console.log("error from signIn: ", err)
            dispatch(logInFailure(err))
          })
      })
      .catch(err => {
        const {cpde, message} = error;
        alert(message);
      });
  }
}

function confirmLogIn() {
  return {
    type: CONFIRM_LOGIN
  }
}
