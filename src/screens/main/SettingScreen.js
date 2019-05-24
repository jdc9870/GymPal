import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { logOut } from '../../actions';
import { AppStyles, AppIcon } from '../../AppStyles';
import Button from 'react-native-button';
const { width, height } = Dimensions.get('window');

class SettingScreen extends Component {
  static navigationOptions = {
    header: "Settings"
  };

  logout() {
    firebase.auth().signOut()
      .then(() => {
        this.props.dispatchLogout()
      })
      .catch(err => {
        console.log('err: ', err)
      });
  }

  render() {
    return(
      <ScrollView>
        <View style={styles.container}>
          <Text>Settings Screen</Text>
          <Button
            containerStyle={styles.buttonContainer}
            style={styles.buttonText}
            onPress={this.logout.bind(this)}
          >
            Log Out
          </Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 50,
    flex: 1
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
  },
});

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  dispatchLogout: () => logOut()
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
