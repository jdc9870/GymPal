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
  NEW_USER_CREATED,
  INPUT_NAME,
  INPUT_NAME_SUCCESS,
  INPUT_BIRTHDAY,
  INPUT_BIRTHDAY_SUCCESS,
  INPUT_GENDER,
  INPUT_GENDER_SUCCESS,
  INPUT_PREFERENCE,
  INPUT_PREFERENCE_SUCCESS,
  PICTURE_UPLOAD_ERROR,
  UPLOAD_PICTURE,
} from './reducers/auth'
import { Alert } from 'react-native';
import NavigationService from './NavigationService'
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

function newUserCreated(user) {
  return {
    type: NEW_USER_CREATED,
    user: user
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
        console.log("yeet")
        user_uid = user._user.uid;
        firebase
          .firestore()
          .collection("users")
          .doc(user_uid)
          .get()
          .then(function(user) {
            // Not a first time user
            if (user.exists) {
              console.log("user exists");
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

function inputName() {
  return {
    type: INPUT_NAME
  }
}

function inputNameSuccess() {
  return {
    type: INPUT_NAME_SUCCESS
  }
}

export function onNameDispatched(name) {
  return (dispatch) => {
    const user = firebase.auth().currentUser;
    user_uid = user._user.uid;
    const data = {
      firstname: name
    }
    firebase
      .firestore()
      .collection("users")
      .doc(user_uid)
      .set(data)
      .then(() => {
        user.updateProfile({
          displayName: name
        }).then(() => {
          console.log("displayName successfully updated")
        }).catch(error => {
          console.log(error)
        })
      })
    //dispatch(NavigationActions.navigate({ routeName: 'EnterAge' }));
    NavigationService.navigate('EnterAge')
  }
}

function inputBirthday() {
  return {
    type: INPUT_BIRTHDAY
  }
}

function inputBirthdaySuccess() {
  return {
    type: INPUT_BIRTHDAY_SUCCESS
  }
}

export function onBirthdateDispatched(date) {
  return (dispatch) => {
    user_uid = firebase.auth().currentUser._user.uid;
    const data = {
      birthdate: date
    }
    var db = firebase.firestore().collection("users").doc(user_uid);
    db.set(data, { merge: true });
    NavigationService.navigate('EnterGender')
    //dispatch(NavigationActions.navigate({ routeName: 'EnterGender' }));
  }
}

function inputGender() {
  return {
    type: INPUT_GENDER
  }
}

function inputGenderSuccess() {
  return {
    type: INPUT_GENDER_SUCCESS
  }
}

export function onGenderDispatched(gender) {
  return (dispatch) => {
    user_uid = firebase.auth().currentUser._user.uid;
    const data = {
      gender: gender
    }
    var db = firebase.firestore().collection("users").doc(user_uid);
    db.set(data, { merge: true });
    NavigationService.navigate('EnterPreference')
    //dispatch(NavigationActions.navigate({ routeName: 'EnterPreference' }));
  }
}

function pictureUploadError(err) {
  return {
    type: PICTURE_UPLOAD_ERROR,
    error: err
  }
}

function uploadingPicture() {
  return {
    type: UPLOAD_PICTURE
  }
}
export function onPictureDispatched(imgSource, imgUri) {
  return (dispatch, getState) => {
    dispatch(uploadingPicture())
    const user = firebase.auth().currentUser;
    const ext = imgUri.split('.').pop(); // Extract image extension
    const filename = `${user._user.uid}.${ext}`; // Generate unique name
    user.updateProfile({
      photoURL: filename
    }).then(function() {
        console.log("awww yeeet!")
    }).catch(function(error) {
        console.log("sad :(")
        alert(error)
    });
    firebase
      .storage()
      .ref(`images/${filename}`)
      .putFile(imgUri)
      .then(() => {
        dispatch(newUserCreated(user));
      })
      // .on(
      //   firebase.storage.TaskEvent.STATE_CHANGED,
      //   snapshot => {
      //     // let state = {};
      //     // state = {
      //     //   ...state,
      //       getState().auth.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100 // Calculate progress percentage
      //     //};
      //     if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
      //       // state = {
      //       //   ...state,
      //       //   uploading: false,
      //       //   imgSource: '',
      //       //   imgUri: '',
      //       //   progress: 0,
      //       // };
      //       getState().auth.progress = 0;
      //     }
      //     //this.setState(state);
      //   },
      //   error => {
      //     unsubscribe();
      //     alert('Sorry, Try again.');
      //   }
      // )
  }
}

function inputPreference() {
  return {
    type: INPUT_PREFERENCE
  }
}

function inputPreferenceSuccess() {
  return {
    type: INPUT_PREFERENCE_SUCCESS
  }
}

export function onPreferenceDispatched(preferences) {
  return (dispatch) => {
    user_uid = firebase.auth().currentUser._user.uid;
    const data = {
      preferences: preferences
    }
    var db = firebase.firestore().collection("users").doc(user_uid);
    db.set(data, { merge: true });
    NavigationService.navigate('EnterPicture')
    //dispatch(NavigationActions.navigate({ routeName: 'EnterPicture' }));
  }
}

function confirmLogIn() {
  return {
    type: CONFIRM_LOGIN
  }
}
