import React, { Component } from 'react';
import { StatusBar } from 'react-native';

import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import { AuthContainer, MainContainer } from './src/nav/AppNavigator';

class App extends Component {
  state = {
    user: {},
    newUser: false,
    isLoading: true
  }
  async componentDidMount() {
    StatusBar.setHidden(true)
    try {
      var user = firebase.auth().currentUser;
      this.setState({ user, isLoading: false, newUser: user.AdditionalUserInfo.isNewUser })
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
    if (loggedIn && this.state.newUser) {
      return (
        <MainContainer/>
      )
    }
    return (
      <AuthContainer />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(App)
