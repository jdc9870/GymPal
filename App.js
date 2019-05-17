import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import Tabs from './src/screens/auth/Tabs';
import AppContainer from './src/nav/AppNavigator';

class App extends Component {
  state = {
    user: {},
    isLoading: true
  }
  async componentDidMount() {
    StatusBar.setHidden(true)
    try {
      var user = firebase.auth().currentUser;
      this.setState({ user, isLoading: false })
    } catch (err) {
      this.setState({ isLoading: false })
    }
  }
  async componentWillReceiveProps(nextProps) {
    try {
      var user = firebase.auth().currentUser;
      this.setState({ user })
    } catch (err) {
      this.setState({ user: {} })
    }
  }
  render() {
    if (this.state.isLoading) return null
    let loggedIn = false
    if (this.state.user) {
      loggedIn = true
    }
    if (loggedIn) {
      return (
        <AppContainer/>
      )
    }
    return (
      <Tabs />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(App)
