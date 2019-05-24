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
} from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { onCodeDispatched } from '../../actions';
import CodeField from 'react-native-confirmation-code-field';
import { AppStyles, AppLayout } from '../../AppStyles';
import Button from '../../components/Button';

class ConfirmNumberScreen extends Component {
  static navigationOptions = {
    title: "Log into GymPal"
  };

  constructor(props) {
    super(props)
    this.state = {
      codeInput: ''
    }
  }

  onFinishCheckingCode = code => {
    this.setState({codeInput: code});
  };

  componentWillReceiveProps(newProps) {
    if(newProps.auth.newUser) {
      this.props.navigation.navigate('EnterName');
    }
  }


  confirmCodeHandler = () => {
    this.props.dispatchCodeDispatched(this.state.codeInput)
  }

  containerProps = { style: styles.inputWrapStyle}
  render() {
    const { fontsLoaded } = this.state
    const { auth: {
      signInErrorMessage,
      isAuthenticating,
      signInError,
    }} = this.props
    const isEnabled = this.state.codeInput.length > 5;
    return (
      <View style={styles.container}>
        <View style={AppLayout.greetingContainer}>
          <Text style={AppLayout.greeting}>Enter your code here</Text>
        </View>
        <CodeField
          codeLength={6}
          autoFocus={true}
          keyboardType="number-pad"
          activeColor="black"
          blurOnSubmit={true}
          inactiveColor={AppStyles.colors.primary}
          containerProps={this.containerProps}
          onFulfill={this.onFinishCheckingCode}
        />
        <View style={styles.nextButton}>
          <Button
            isLoading={isAuthenticating}
            title="Confirm"
            isEnabled={!isEnabled}
            onPress={this.confirmCodeHandler}
          />
        </View>
        <Text style={[styles.errorMessage, signInError && { color: 'black' }]}>
          Error logging in. Please try again.
        </Text>
        <Text style={[styles.errorMessage, signInError && { color: 'black' }]}>
          {signInErrorMessage}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#fff",
  },
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.colors.primary,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 40,
    height: 42,
    alignItems: 'center'
  },
  facebookText: {
    color: AppStyles.colors.white,
    fontSize: AppStyles.fontSize.button
  },
  inputWrapStyle: {
    maxHeight: '15%',
    marginTop: 30,
  },
  nextButton: {
    height: '20%',
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: 'transparent',
    fontFamily: AppStyles.fontName.main
  },
});

const mapDispatchToProps = {
  dispatchCodeDispatched: (code) => onCodeDispatched(code)
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmNumberScreen)
