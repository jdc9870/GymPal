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
import { onNameDispatched } from '../../actions';
import AuthInput from '../../components/AuthInput';
import { AppStyles, AppLayout } from '../../AppStyles';
import Button from '../../components/Button';

class EnterNameScreen extends Component {
  static navigationOptions = {
    title: "Log into GymPal"
  };

  constructor(props) {
    super(props)
    this.state = {
      controls: {
        name: {
          value: ''
        }
      }
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

  enterNameHandler = () => {
    this.props.dispatchEnterName(this.state.controls.name.value)
    //this.props.navigation.navigate('EnterAge')
  }

  render() {
    const isEnabled = this.state.controls.name.value.length > 0;
    return (
      <View style={styles.container}>
        <View style={AppLayout.greetingContainer}>
          <Text style={AppLayout.greeting}>My first name is</Text>
        </View>
        <View style={styles.inputContainer}>
          <AuthInput
            value={this.state.controls.name.value}
            placeholder="First Name"
            type='name'
            onChangeText={(val) => this.updateInputState("name", val)}
          />
        </View>
        <Button
          isLoading={false}
          title="Continue"
          isEnabled={!isEnabled}
          onPress={this.enterNameHandler}
        />
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

const mapDispatchToProps = {
  dispatchEnterName: (name) => onNameDispatched(name)
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterNameScreen)
