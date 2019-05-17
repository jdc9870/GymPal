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

//import { Auth } from 'aws-amplify'
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

import { authenticate, confirmUserLogin } from '../../actions';
import { fonts, colors } from '../../theme';

import Input from '../../components/Input';
import Button from '../../components/Button';

class SignIn extends Component<{}> {
  state = {
    email: '',
    password: '',
  };

  onChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  signIn() {
    const { email, password} = this.state;
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
        <View style={styles.heading}>
          <Image
            source={require('../../assets/shape.png')}
            style={styles.headingImage}
            resizeMode="contain"
          />
        </View>
        <Text style={[styles.greeting]}>
          Welcome back,
        </Text>
        <Text style={[styles.greeting2]}>
          sign in to continue
        </Text>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Email Address"
            type='email'
            onChangeText={this.onChangeText}
            value={this.state.email}
          />
          <Input
            placeholder="Password"
            type='password'
            onChangeText={this.onChangeText}
            value={this.state.password}
            secureTextEntry
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
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    flexDirection: 'row'
  },
  headingImage: {
    width: 38,
    height: 38
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: 'transparent',
    fontFamily: fonts.base
  },
  inputContainer: {
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  greeting: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: fonts.light
  },
  greeting2: {
    color: '#666',
    fontSize: 24,
    marginTop: 5,
    fontFamily: fonts.light
  }
});
