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
import ImagePicker from 'react-native-image-picker';
import { onPictureDispatched } from '../../actions';
import AuthInput from '../../components/AuthInput';
import { AppStyles, AppLayout } from '../../AppStyles';
import Button from '../../components/Button';

class EnterPreferenceScreen extends Component {
  static navigationOptions = {
    title: "Log into GymPal"
  };

  constructor(props) {
    super(props)
    this.state = {
      imgSource: null,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={AppLayout.greetingContainer}>
          <Text style={AppLayout.greeting}>My matching preferences are</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  }
});

const mapDispatchToProps = {
  dispatchEnterPicture: (imageSrc, imageUri) => onPictureDispatched(imageSrc, imageUri)
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterPictureScreen)
