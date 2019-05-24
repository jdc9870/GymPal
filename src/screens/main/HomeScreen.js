import React, { Component } from 'react';
import {
  View,
  Text,
  Alert,
  TextInput,
  StyleSheet,
  Image,
  Button,
  Animated,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { logOut } from '../../actions';
import { AppStyles, AppIcon } from '../../AppStyles';
const { width, height } = Dimensions.get('window');

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

  render() {
    const user = firebase.auth().currentUser;
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  homeContainer: {
    alignItems: 'center'
  },
  welcome: {
    fontFamily: AppStyles.fontName.main,
    color: 'rgba(0, 0, 0, .85)',
    marginBottom: 26,
    fontSize: 22,
    textAlign: 'center'
  },
  registration: {
    fontFamily: AppStyles.fontName.main,
    color: 'rgba(0, 0, 0, .5)',
    marginTop: 20,
    fontSize: 16,
    paddingHorizontal: 20,
    textAlign: 'center'
  }
})

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {
  dispatchLogout: () => logOut()
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
