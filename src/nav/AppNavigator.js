import React, { Component }from 'react'
import {
  StyleSheet,
  Animated,
  Easing,
  Platform
} from 'react-native';
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppStyles } from '../AppStyles';
import HomeScreen from '../screens/main/HomeScreen';
import ChatScreen from '../screens/main/ChatScreen';
import SettingScreen from '../screens/main/SettingScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ConfirmNumberScreen from '../screens/auth/ConfirmNumberScreen';
import EnterNameScreen from '../screens/auth/EnterNameScreen';
import EnterAgeScreen from '../screens/auth/EnterAgeScreen';
import EnterGenderScreen from '../screens/auth/EnterGenderScreen';
import EnterPictureScreen from '../screens/auth/EnterPictureScreen';
import EnterPreferenceScreen from '../screens/auth/EnterPreferenceScreen';
import tempHomeScreen from '../screens/main/tempHome'

const AuthStack = createStackNavigator({
    Welcome: {
      screen: WelcomeScreen
    },
    SignIn: {
      screen: SignInScreen
    },
    SignUp: {
      screen: SignUpScreen,
    },
    ConfirmNumber: {
      screen: ConfirmNumberScreen
    },
    EnterName: {
      screen: EnterNameScreen
    },
    EnterAge: {
      screen: EnterAgeScreen
    },
    EnterGender: {
      screen: EnterGenderScreen
    },
    EnterPreference: {
      screen: EnterPreferenceScreen
    },
    EnterPicture: {
      screen: EnterPictureScreen
    }
  },
  {
    initialRouteName: 'Welcome',
    headerMode: "float",
    mode: "card",
    navigationOptions: {gesturesEnabled: false},
    defaultNavigationOptions: ({ navigation }) => ({
      headerTintColor: AppStyles.colors.primary,
      headerTitleStyle: styles.headerTitleStyle
    }),
  }
);

const AppStack = createBottomTabNavigator(
  {
    Settings: {
      screen: SettingScreen
    },
    Home: {
      screen: tempHomeScreen
    },
    Chat: {
      screen: ChatScreen
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-home';
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
        } else if (routeName === 'Settings') {
          iconName = `ios-settings`;
        }
        else if (routeName === 'Chat') {
          iconName = 'ios-chatbubbles';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      showLabel: false
    },
  }
);

export const MainContainer = createAppContainer(AppStack);
export const AuthContainer = createAppContainer(AuthStack);

export const AppNavigator = createAppContainer(createSwitchNavigator(
  {
      App: AppStack,
      Auth: AuthStack
  },
  {
    initialRouteName: 'Auth',
  }
));
const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: 'center',
    color: "black",
    flex: 1,
    fontFamily: AppStyles.fontName.main
  }
});
