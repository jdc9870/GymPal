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

class EnterPictureScreen extends Component {
  static navigationOptions = {
    title: "Log into GymPal"
  };

  constructor(props) {
    super(props)
    this.state = {
      image:''
    }
  }

  enterPictureHandler = () => {
    //this.props.dispatchEnterPicture(this.state.image);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={AppLayout.greetingContainer}>
          <Text style={AppLayout.greeting}>I want my picture to be</Text>
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
  }
});

// const mapDispatchToProps = {
//   dispatcheEnterGender: (gender) => onGenderDispatched(gender)
// }
//
// const mapStateToProps = state => ({
//   auth: state.auth
// })
//
// export default connect(mapStateToProps, mapDispatchToProps)(EnterGenderScreen)
export default EnterPictureScreen;
