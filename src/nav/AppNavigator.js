import React, { Component }from 'react'
import { createStackNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from './HomeScreen'

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
