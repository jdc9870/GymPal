import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { onPreferenceDispatched } from '../../actions';
import Checkbox from 'react-native-modest-checkbox';
import { AppStyles, AppLayout } from '../../AppStyles';
import Button from '../../components/Button';

class EnterPreferenceScreen extends Component {
  static navigationOptions = {
    title: "Log into GymPal"
  };

  constructor(props) {
    super(props)
    this.state = {
      male: false,
      female: false,
      nonBinary: false,
      preferences: []
    }
  }

  createPreferenceArray = () => {
    if (this.state.male) {
      this.state.preferences.push("Male")
    }
    if (this.state.female) {
      this.state.preferences.push("Female")
    }
    if (this.state.nonBinary) {
      this.state.preferences.push("Non-binary")
    }
  }

  enterPreferenceHandler = () => {
    this.createPreferenceArray();
    this.props.dispatchEnterPreference(this.state.preferences)
    //this.props.navigation.navigate('EnterPicture');
  }

  render() {
    const isEnabled = this.state.male === false && this.state.female === false
      && this.state.nonBinary === false;
    const check = <Ionicons name="ios-checkbox-outline" size={25} color="#fff" />;
    const uncheck = <Ionicons name="ios-square-outline" size={25} color="#fff" />
    return (
      <View style={styles.container}>
        <View style={[AppLayout.greetingContainer, {paddingBottom: hp('4%')}]}>
          <Text style={AppLayout.greeting}>My matching preferences are</Text>
        </View>
        <View style={styles.check}>
          <Checkbox
            label='Male'
            checkedComponent={check}
            uncheckedComponent={uncheck}
            containerStyle={styles.checkBoxContainer}
            labelStyle={styles.checkBoxText}
            checkboxStyle={styles.checkBox}
            checked={this.state.male}
            onChange={() => this.setState({male:
              !this.state.male})}
          />
        </View>
        <View style={styles.check}>
          <Checkbox
            label='Female'
            checkedComponent={check}
            uncheckedComponent={uncheck}
            checked={this.state.female}
            checkboxStyle={styles.checkBox}
            containerStyle={styles.checkBoxContainer}
            labelStyle={styles.checkBoxText}
            onChange={() => this.setState({female:
              !this.state.female})}
          />
        </View>
        <View style={styles.check}>
          <Checkbox
            label='Non-binary'
            checkedComponent={check}
            uncheckedComponent={uncheck}
            containerStyle={styles.checkBoxContainer}
            labelStyle={styles.checkBoxText}
            checkboxStyle={styles.checkBox}
            checked={this.state.nonBinary}
            onChange={() => this.setState({nonBinary:
              !this.state.nonBinary})}
          />
        </View>
        <Button
          isLoading={false}
          title="Continue"
          isEnabled={isEnabled}
          onPress={this.enterPreferenceHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  checkBoxContainer: {
    width: AppStyles.buttonWidth.main,
    height: AppStyles.buttonHeight.main,
    borderRadius: AppStyles.borderRadius.main,
    backgroundColor: AppStyles.colors.primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkBoxText: {
    fontSize: AppStyles.fontSize.content,
    fontFamily: AppStyles.fontName.main,
    color: AppStyles.colors.white,
    paddingLeft: 10
  },
  check: {
    paddingBottom: hp('4%')
  },
});

const mapDispatchToProps = {
  dispatchEnterPreference: (preferences) => onPreferenceDispatched(preferences)
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterPreferenceScreen)
