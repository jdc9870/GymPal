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
import {  } from '../../actions';
import AuthInput from '../../components/AuthInput';
import { AppStyles, AppLayout } from '../../AppStyles';
import Button from '../../components/Button';

class EnterAgeScreen extends Component {
  static navigationOptions = {
    title: "Log into GymPal"
  };

  constructor(props) {
    super(props)
    this.state = {
    }
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

  // enterNameHandler = () => {
  //   this.props.dispatchEnterName(this.state.controls.name.value)
  //   this.props.navigation.navigate('')
  // }

  render() {
    return (
      <View style={styles.container}>
        <View style={AppLayout.greetingContainer}>
          <Text style={AppLayout.greeting}>My birthdate is</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  inputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.colors.primary,
    borderRadius: AppStyles.borderRadius.main
  }
});

// const mapDispatchToProps = {
//   dispatchEnterName: (name) => onNameDispatched(name)
// }
//
// const mapStateToProps = state => ({
//   auth: state.auth
// })
//
// export default connect(mapStateToProps, mapDispatchToProps)(EnterNameScreen)
export default EnterAgeScreen;
