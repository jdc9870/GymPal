import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';
import firebase from 'react-native-firebase';
import { AppStyles, AppIcon } from '../../AppStyles';
import Button from 'react-native-button';
const { width, height } = Dimensions.get('window');

class ProfileScreen extends Component {
  static navigationOptions = {
    header: "Profile"
  };

  render() {
    return(
      <View style={styles.container}>
        <Text>Profile Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
});


export default ProfileScreen;
