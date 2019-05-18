import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

import { AppStyles } from '../../AppStyles';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import WelcomeScreen from './WelcomeScreen';
const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  }
});

const AuthStack = createStackNavigator({
    Welcome: {
      screen: WelcomeScreen
    },
    SignIn: {
      screen: SignInScreen
    },
    SignUp: {
      screen: SignUpScreen
    }
  },
  {
    initialRouteName: 'Welcome',
    headerMode: "float",
    navigationOptions: {gesturesEnabled: false},
    defaultNavigationOptions: ({ navigation }) => ({
      headerTintColor: AppStyles.colors.primary,
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

// const TabNavigator = createBottomTabNavigator(
//   {
//     SignIn: {
//       screen: SignInScreen,
//       navigationOptions: {
//         title: 'Sign In',
//         tabBarIcon: ({ tintColor }) => (
//           <Image
//             source={require('../../assets/signInButton.png')}
//             style={[styles.icon, { tintColor }]}
//           />
//         )
//       }
//     },
//     SignUp: {
//       screen: SignUpScreen,
//       navigationOptions: {
//         title: 'Sign Up',
//         tabBarIcon: ({ tintColor }) => (
//           <Image
//             source={require('../../assets/signUpButton.png')}
//             style={[styles.icon, { tintColor }]}
//           />
//         )
//       }
//     }
//   },
//   {
//     tabBarPosition: 'bottom',
//     tabBarOptions: {
//       showLabel: true,
//       activeTintColor: AppStyles.colors.primary,
//       inactiveTintColor: AppStyles.colors.secondary,
//       indicatorStyle: { backgroundColor: AppStyles.colors.secondary },
//       labelStyle: {
//         fontFamily: AppStyles.fontName.main,
//         fontSize: 12
//       },
//       style: {
//         backgroundColor: 'white',
//         borderTopWidth: 0,
//         paddingBottom: 3
//       },
//     }
//   }
// );

export default createAppContainer(AuthStack);
