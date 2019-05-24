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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { authenticate, onCodeDispatched } from '../../actions';
import { AppStyles, AppLayout } from '../../AppStyles';
import ModalPickerImage from '../../components/ModalPickerImage';
import PhoneInput from "react-native-phone-input";
import Button from '../../components/Button';

class SignIn extends Component {
  static navigationOptions = {
    title: "Log into GymPal"
  };

  constructor(props) {
    super(props);
    this.onPressFlag = this.onPressFlag.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.state = {
      controls: {
        phone_number: {
          value: ''
        }
      },
      pickerData: null,
    };
  }
  componentDidMount() {
    this.phone.focus();
    this.setState({
      pickerData: this.phone.getPickerData(),
    });
  }

  onPressFlag() {
     this.myCountryPicker.open();
  }

  selectCountry(country) {
     this.phone.selectCountry(country.iso2);
  }

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
    const phone = this.state.controls.phone_number.value;
    this.props.dispatchAuthenticate(phone);
    this.props.navigation.navigate('ConfirmNumber');
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
        <View style={AppLayout.greetingContainer}>
          <Text style={AppLayout.greeting}>Enter your mobile number</Text>
        </View>
        <View style={styles.phoneContainer}>
          <PhoneInput
            style={styles.phoneInput}
            ref={(ref) => { this.phone = ref; }}
            type="phone_number"
            onChangePhoneNumber={(val) => this.updateInputState("phone_number", val)}
            value={this.state.controls.phone_number.value}
            flagStyle={{width: 50, height: 30, borderWidth:1, borderColor: 'black'}}
            textStyle={{fontSize: 20, fontFamily: AppStyles.fontName.main}}
            onPressFlag={this.onPressFlag}
          />
          <ModalPickerImage
            ref={(ref) => {
              this.myCountryPicker = ref;
            }}
            data={this.state.pickerData}
            onChange={(country) => {
              this.selectCountry(country);
            }}
            cancelText="Cancel"
          />
        </View>
        <Button
          isLoading={isAuthenticating}
          title='Next'
          onPress={this.signIn.bind(this)}
        />
      </View>
    );
  }
}

const mapDispatchToProps = {
  dispatchAuthenticate: (phone_number) => authenticate(phone_number)
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
  phoneContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  phoneInput: {
    height: '25%',
    backgroundColor: '#f5f5f5'
  },
  errorMessage: {
    fontSize: 12,
    marginTop: 10,
    color: 'transparent',
    fontFamily: AppStyles.fontName.main
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 40
  }
});
