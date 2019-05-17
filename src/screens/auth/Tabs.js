import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import { colors, fonts } from '../../theme';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
});

const TabNavigator = createBottomTabNavigator(
  {
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        title: 'Sign In',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../../assets/signInButton.png')}
            style={[styles.icon, { tintColor }]}
          />
        )
      }
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        title: 'Sign Up',
        tabBarIcon: ({ tintColor }) => (
          <Image
            source={require('../../assets/signUpButton.png')}
            style={[styles.icon, { tintColor }]}
          />
        )
      }
    }
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: true,
      activeTintColor: colors.primary,
      inactiveTintColor: colors.secondary,
      indicatorStyle: { backgroundColor: colors.secondary },
      labelStyle: {
        fontFamily: fonts.base,
        fontSize: 12
      },
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        paddingBottom: 3
      },
    }
  }
);

export default createAppContainer(TabNavigator);
