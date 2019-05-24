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
import FastImage from 'react-native-fast-image';
import { AppStyles, AppIcon } from '../../AppStyles';
const { width, height } = Dimensions.get('window');
import backgroundImage from '../../assets/images/gymBroBg.jpg';

class WelcomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  AnimatedScale = new Animated.Value(1)
  componentDidMount() {
    this.animate()
  }

  navigateToSignUp() {
    this.props.navigation.navigate('SignUp');
  }

  navigateToSignIn() {
    this.props.navigation.navigate('SignIn');
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
        <FastImage
          source={backgroundImage}
          style={styles.backgroundImage}
        >
          <View style={styles.homeContainer}>
            <Animated.Image
              source={AppIcon.images.logo}
              style={{ width: width / 2, height: width / 2, marginBottom: hp('10%'), transform: [{scale: this.AnimatedScale}]}}
              resizeMode='contain'
            />
            <Button
                containerStyle={styles.buttonContainer}
                style={styles.buttonText}
                onPress={() => this.props.navigation.navigate("SignIn")}
            >
                LOG IN WITH PHONE NUMBER
            </Button>
            <Button
                containerStyle={styles.facebookButtonContainer}
                style={styles.buttonText}
                onPress={() => alert("Not implemented yet")}
            >
                LOG IN WITH FACEBOOK
            </Button>
          </View>
        </FastImage>
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
  backgroundImage: {
    width: '100%',
    height: '100%'
  },
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    width: wp('70%'),
    backgroundColor: AppStyles.colors.primary,
    borderRadius: AppStyles.borderRadius.main,
    padding: hp('1%'),
    marginTop: hp('6%')
  },
  facebookButtonContainer : {
    width: wp('70%'),
    backgroundColor: AppStyles.colors.facebook,
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
