import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Modal
} from 'react-native';

import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

import { authenticate, confirmUserLogin } from '../../actions';
import { AppStyles } from '../../AppStyles';

import AuthInput from '../../components/AuthInput';
import Button from '../../components/Button';

class SignIn extends Component<{}> {
  static navigationOptions = {
    title: "Log into GymPal"
  };

  state = {
    controls: {
      email: {
        value: ""
      },
      password: {
        value: ""
      }
    }
  };

  // onChangeText = (key, value) => {
  //   this.setState({
  //     [key]: value
  //   });
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

  signIn() {
    const email = this.state.controls.email.value;
    const password = this.state.controls.password.value;
    this.props.dispatchAuthenticate(email, password);
  }

  render() {
    const { fontsLoaded } = this.state
    const { auth: {
      signInErrorMessage,
      isAuthenticating,
      signInError,
    }} = this.props
    return (
      <View style={styles.container}>
        <View style={styles.greetingContainer}>
          <Text style={[styles.greeting]}>
            Welcome back to GymPal!
          </Text>
          <Text style={[styles.greeting2]}>
            sign in to continue
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <AuthInput
            placeholder="Email Address"
            type='email'
            onChangeText={(val) => this.updateInputState("email", val)}
            value={this.state.email}
            placeholderTextColor={AppStyles.colors.grey}
          />
        </View>
        <View style={styles.inputContainer}>
          <AuthInput
            placeholder="Password"
            type='password'
            onChangeText={(val) => this.updateInputState("password", val)}
            value={this.state.password}
            secureTextEntry
            placeholderTextColor={AppStyles.colors.grey}
          />
        </View>

        <Button
          isLoading={isAuthenticating}
          title='Sign In'
          onPress={this.signIn.bind(this)}
        />
        <Text style={[styles.errorMessage, signInError && { color: 'black' }]}>Error logging in. Please try again.</Text>
        <Text style={[styles.errorMessage, signInError && { color: 'black' }]}>{signInErrorMessage}</Text>
      </View>
    );
  }
}

const mapDispatchToProps = {
  dispatchAuthenticate: (username, password) => authenticate(username, password)
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row'
  },
  headingImage: {
    width: 38,
    height: 38
  },
  inputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.colors.primary,
    borderRadius: AppStyles.borderRadius.main
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: 'transparent',
    fontFamily: AppStyles.fontName.main
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40
  },
  greetingContainer: {
    alignItems: 'flex-start'
  },
  greeting: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: AppStyles.fontName.main
  },
  greeting2: {
    color: '#666',
    fontSize: 24,
    marginTop: 5,
    fontFamily: AppStyles.fontName.main
  }
});
