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
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { onBirthdateDispatched } from '../../actions';
import AuthInput from '../../components/AuthInput';
import { AppStyles, AppLayout } from '../../AppStyles';
import Button from '../../components/Button';

class EnterAgeScreen extends Component {
  static navigationOptions = {
    title: "Log into GymPal"
  };

  constructor(props) {
    super(props)
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    this.state = {
      date: yyyy+'/'+mm+'/'+dd,
      currentDate: yyyy+'/'+mm+'/'+dd
    }
  }

  enterDateHandler = () => {
    this.props.dispatchEnterBirthdate(this.state.date)
    this.props.navigation.navigate('EnterGender');
  }

  render() {
    const { auth: {
      signInErrorMessage,
      isAuthenticating,
      signInError,
    }} = this.props
    const isEnabled = this.state.date.length > 0;
    return (
      <View style={styles.container}>
        <View style={AppLayout.greetingContainer}>
          <Text style={AppLayout.greeting}>My birthdate is</Text>
        </View>
        <View style={styles.dateContainer}>
          <DatePicker
            style={{width: wp('80%')}}
            date={this.state.date}
            mode="date"
            showIcon={false}
            placeholder="select date"
            maxDate={this.state.currentDate}
            format="YYYY/MM/DD"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateInput: {
                borderWidth: 1,
                borderRadius: 25,
                margin: 30,
                borderColor: AppStyles.colors.primary,
                height: hp('10%'),
              },
              dateText: {
                fontFamily: AppStyles.fontName.main,
                color: AppStyles.colors.text,
                fontSize: hp('3%')
              },
              btnTextConfirm: {
                color: AppStyles.colors.primary,
                fontFamily: AppStyles.fontName.main
              },
              btnTextCancel: {
                fontFamily: AppStyles.fontName.main
              }
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />
        </View>
        <View>
          <Button
            isLoading={isAuthenticating}
            title="Continue"
            isEnabled={!isEnabled}
            onPress={this.enterDateHandler}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: "#fff",
  },
  dateContainer: {
    height: hp('15%'),
    paddingTop: hp('7%')
  }
});

const mapDispatchToProps = {
  dispatchEnterBirthdate: (date) => onBirthdateDispatched(date),
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterAgeScreen)
