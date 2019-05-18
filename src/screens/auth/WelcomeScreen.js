import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Button from "react-native-button";
import { AppStyles, AppIcon } from '../../AppStyles';
const { width, height } = Dimensions.get('window');

class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  AnimatedScale = new Animated.Value(1)
  componentDidMount() {
    this.animate()
  }

  navigateToSignUp() {
    this.props.navigation.navigate('Sign Up');
  }

  navigateToSignIn() {
    this.props.navigation.navigate('Sign In');
  }
  animate() {
    Animated.timing(
      this.AnimatedScale,
      {
        toValue: .8,
        duration: 1250,
        useNativeDriver: true
      }
    ).start(() => {
      Animated.timing(
        this.AnimatedScale,
        {
          toValue: 1,
          duration: 1250,
          useNativeDriver: true
        }
      ).start(() => this.animate())
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.homeContainer}>
          <Animated.Image
            source={AppIcon.images.logo}
            style={{ width: width / 2, height: width / 2, transform: [{scale: this.AnimatedScale}]}}
            resizeMode='contain'
          />
        </View>
        <Button
            containerStyle={styles.buttonContainer}
            style={styles.buttonText}
            onPress={() => this.props.navigation.navigate("SignIn")}
        >
            Sign In
        </Button>
        <Button
            containerStyle={styles.buttonContainer}
            style={styles.buttonText}
            onPress={() => this.props.navigation.navigate("SignUp")}
        >
            Sign Up
        </Button>
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
});

export default WelcomeScreen;
