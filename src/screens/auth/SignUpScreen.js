import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Modal
} from 'react-native';

import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

import { AppStyles } from '../../AppStyles';
import { createUser, confirmUserSignUp } from '../../actions';

import AuthInput from '../../components/AuthInput';
import Button from '../../components/Button';

const initialState = {
  controls: {
    fullname: {
      value: ''
    },
    password: {
      value: ''
    },
    email: {
      value: ''
    },
    phone_number: {
      value: ''
    },
  }
};

class SignUp extends Component {
  state = initialState

  // onChangeText = (key, value) => {
  //   this.setState({
  //     [key]: value
  //   })
  // }

  updateInputState = (key, value) => {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          [key]: {
            ...prevState.controls[key],
            value: value,
          }
        }
      };
    });
  }

  signUp() {
    const fullname = this.state.controls.fullname.value;
    const password = this.state.controls.password.value;
    const email = this.state.controls.email.value;
    const phone_number = this.state.controls.phone_number.value;
    this.props.dispatchCreateUser(fullname, password, email, phone_number)
  }

  // confirm() {
  //   const { authCode, fullname } = this.state
  //   this.props.dispatchConfirmUser(fullname, authCode)
  // }

  componentWillReceiveProps(nextProps) {
    const { auth: { showSignUpConfirmationModal }} = nextProps
    if (!showSignUpConfirmationModal && this.props.auth.showSignUpConfirmationModal) {
      this.setState(initialState)
    }
  }

  render() {
    const { auth: {
      showSignUpConfirmationModal,
      isAuthenticating,
      signUpError,
      signUpErrorMessage
    }} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>
            Welcome,
          </Text>
          <Text style={styles.greeting2}>
            sign up to continue
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <AuthInput
            value={this.state.controls.fullname.value}
            placeholder="Full Name"
            type='fullname'
            onChangeText={(val) => this.updateInputState("fullname", val)}
          />
        </View>
        <View style={styles.inputContainer}>
          <AuthInput
            value={this.state.controls.email.value}
            placeholder="Email"
            type='email'
            onChangeText={(val) => this.updateInputState("email", val)}
          />
        </View>
        <View style={styles.inputContainer}>
          <AuthInput
            value={this.state.controls.password.value}
            placeholder="Password"
            secureTextEntry
            type='password'
            onChangeText={(val) => this.updateInputState("password", val)}
          />
        </View>
        <View style={styles.inputContainer}>
          <AuthInput
            placeholder="Phone Number"
            type='phone_number'
            keyboardType='numeric'
            onChangeText={(val) => this.updateInputState("phone_number", val)}
            value={this.state.controls.phone_number.value}
          />
        </View>
        <Button
          title='Sign Up'
          onPress={this.signUp.bind(this)}
          isLoading={isAuthenticating}
        />
        <Text style={[styles.errorMessage, signUpError && { color: 'black' }]}>Error logging in. Please try again.</Text>
        <Text style={[styles.errorMessage, signUpError && { color: 'black' }]}>{signUpErrorMessage}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {
  //dispatchConfirmUser: (fullname, authCode) => confirmUserSignUp(fullname, authCode),
  dispatchCreateUser: (fullname, password, email, phone_number) =>
    createUser(fullname, password, email, phone_number)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
  inputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.colors.primary,
    borderRadius: AppStyles.borderRadius.main
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 40
  },
  greetingContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  greeting: {
    marginTop: 20,
    fontFamily: AppStyles.fontName.main,
    fontSize: 24
  },
  greeting2: {
    fontFamily: AppStyles.fontName.main,
    color: '#666',
    fontSize: 24,
    marginTop: 5
  },
  heading: {
    flexDirection: 'row'
  },
  headingImage: {
    width: 38,
    height: 38
  },
  errorMessage: {
    fontFamily: AppStyles.fontName.main,
    fontSize: 12,
    marginTop: 10,
    color: 'transparent'
  }
});
