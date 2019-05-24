import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  CONFIRM_LOGIN,
  CODE_SENT,
  CODE_SENT_ERROR,
  CODE_DISPATCHED,
  CODE_CONFIRM_ERROR,
  NEW_USER,
  NEW_USER_CREATED
} from './reducers/auth'

import { Alert } from 'react-native';
import firebase from 'react-native-firebase';

function signUp() {
  return {
    type: SIGN_UP
  }
}

function newUser() {
  return {
    type: NEW_USER,
  }
}

function newUserCreated() {
  return {
    type: NEW_USER_CREATED,
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

// export function createUser(fullname, password, email, phone_number) {
//   return (dispatch) => {
//     dispatch(signUp())
//     let phone
//     const firstTwoDigits = phone_number.substring(0, 2)
//     if (firstTwoDigits === '+1') {
//       phone = phone_number
//     } else {
//       phone = '+1' + phone_number
//     }
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(email,password)
//       .then(userCredentials => {
//         console.log('data from signUp: ', userCredentials)
//         const data = {
//           email: email,
//           fullname: fullname,
//           phone: phone,
//           appIdentifier: "rn-android-universal-listings"
//         };
//         user_uid = userCredentials.user._user.uid;
//         firebase
//           .firestore()
//           .collection("users")
//           .doc(user_uid)
//           .set(data);
//         firebase
//           .firestore()
//           .collection("users")
//           .doc(user_uid)
//           .get();
//         if (userCredentials.user) {
//           userCredentials.user.updateProfile({
//             displayName: fullname
//           }).then((res) => {
//             dispatch(signUpSuccess(firebase.auth().currentUser));
//           })
//         }
//         //dispatch(signUpSuccess(userCredentials.user))
//       })
//       .catch(err => {
//         console.log('error signing up: ', err)
//         dispatch(signUpFailure(err))
//       })
//   }
// }

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

// export function authenticate(email, password) {
//   return (dispatch) => {
//     dispatch(logIn())
//     // Make firebase version
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password)
//       .then(response => {
//         user_uid = response.user._user.uid;
//         firebase
//           .firestore()
//           .collection("users")
//           .doc(user_uid)
//           .get()
//           .then(function(user) {
//             if (user.exists) {
//               console.log("logInSuccess user is in!")
//               dispatch(logInSuccess(response.user))
//               dispatch(confirmLogIn())
//             } else {
//               alert("User does not exist! Please try again.")
//             }
//           })
//           .catch(err => {
//             console.log("error from signIn: ", err)
//             dispatch(logInFailure(err))
//           })
//       })
//       .catch(err => {
//         const {code, message} = err;
//         dispatch(logInFailure(err))
//       });
//   }
// }

// On phone login
export function authenticate(phone_number) {
  return (dispatch) => {
    dispatch(logIn())
    firebase
      .auth()
      .signInWithPhoneNumber(phone_number)
      // sign in success!
      .then(confirmResult => {
        dispatch(onCodeSent(confirmResult))
      })
      // sign in error!
      .catch(err => {
        console.log("error from signIn: ", err)
        dispatch(logInFailure(err))
      })
  }
}

function onCodeSent(confirmResult) {
  return {
    type: CODE_SENT,
    payload: confirmResult
  }
}

function onCodeSentError(err) {
  return {
    type: CODE_SENT_ERROR,
    error: err
  }
}

function onCodeConfirmError(err) {
  return {
    type: CODE_CONFIRM_ERROR,
    error: err
  }
}

export function onCodeDispatched(code) {
  return (dispatch, getState) => {
      dispatch(logIn())
      getState().auth.confirmResult.confirm(code)
      .then(user => {
        user_uid = user._user.uid;
        firebase
          .firestore()
          .collection("users")
          .doc(user_uid)
          .get()
          .then(function(user) {
            // Not a first time user
            if (user.exists) {
              console.log("user exists")
              dispatch(logInSuccess(user));
              dispatch(confirmLogIn());
            }
            // First time user
            else {
              dispatch(newUser());
            }
        })
        .catch(error => {
          onCodeConfirmError(error);
        })
      })
      .catch(error => {
        onCodeConfirmError(error);
      });
  }
}

export function onNameDispatched(name) {
  return (dispatch) => {
    user_uid = firebase.auth().currentUser._user.uid;
    const data = {
      firstname: name
    }
    firebase
      .firestore()
      .collection("users")
      .doc(user_uid)
      .set(data)
  }
}

export function enterGender() {

}

function confirmLogIn() {
  return {
    type: CONFIRM_LOGIN
  }
}
