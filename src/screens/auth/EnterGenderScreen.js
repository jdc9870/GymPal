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
import Button from 'react-native-button';
import { onGenderDispatched } from '../../actions';
import { AppStyles, AppLayout } from '../../AppStyles';

class EnterGenderScreen extends Component {
  static navigationOptions = {
    title: "Log into GymPal"
  };

  constructor(props) {
    super(props)
    this.state = {
      gender: ''
    }
  }

  enterGenderHandler = (gender) => {
    this.props.dispatchEnterGender(gender)
    //this.props.navigation.navigate('EnterPreference');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={AppLayout.greetingContainer}>
          <Text style={AppLayout.greeting}>I identify as</Text>
        </View>
        <Button
            containerStyle={styles.buttonContainer}
            style={styles.buttonText}
            onPress={() => this.enterGenderHandler("Male")}
        >
          Male
        </Button>
        <Button
            containerStyle={styles.buttonContainer}
            style={styles.buttonText}
            onPress={() => this.enterGenderHandler("Female")}
        >
          Female
        </Button>
        <Button
            containerStyle={styles.buttonContainer}
            style={styles.buttonText}
            onPress={() => this.enterGenderHandler("Non-binary")}
        >
          Non-binary
        </Button>
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
  buttonContainer: {
    width: wp('70%'),
    backgroundColor: AppStyles.colors.primary,
    borderRadius: AppStyles.borderRadius.main,
    padding: hp('1%'),
    marginTop: hp('6%')
  },
  buttonText: {
    color: AppStyles.colors.white
  }
});

const mapDispatchToProps = {
  dispatchEnterGender: (gender) => onGenderDispatched(gender)
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterGenderScreen)
