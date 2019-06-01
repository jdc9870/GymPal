import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { AppStyles, AppIcon } from '../../AppStyles';

class tempHome extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      mounted: true,
      loading: true,
      image: 'images/' + firebase.auth().currentUser._user.uid + '.jpg',
      //image: 'images/sT8OxxHvcqPA6BDOyJrEz2mIagB3.jpg',
      url: ''
    }
  }

  componentDidMount() {
    this.setState({ isMounted: true})
    this.getAndLoadImage()
  }

  //gs://gympal-bc70b.appspot.com/images/sT8OxxHvcqPA6BDOyJrEz2mIagB3.jpg

  async getAndLoadImage() {
    if (this.state.mounted == true) {
      const ref = firebase.storage().ref(this.state.image);
      ref.getDownloadURL().then(url => {
        console.log("yeet")
        this.setState({url: url})
        this.setState({loading: false})
      }).catch(error => {
        console.log("sad")
        this.setState({url: 'images/sT8OxxHvcqPA6BDOyJrEz2mIagB3.jpg'})
        this.setState({loading: false})
      })
    }
  }

  componentWillUnmount() {
    this.setState({ isMounted: false })
  }


  render() {
    if (this.state.mounted == true) {
      if (this.state.loading == true) {
        return (
          <View key={this.state.image} style={{flex: 1, backgroundColor: "blue",width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator/>
          </View>
        );
      }
      else {
        console.log(this.props.auth.user.displayName)
        return (
          <View style={styles.container}>
            <Text>Hello {this.props.auth.user.displayName}</Text>
            <Image style={{height: '80%', width: "80%", padding: 10}}source={{uri: this.state.url}}/>
          </View>
        )
      }
    }
    else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  }
})

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {
  dispatchLogout: () => logOut()
}

export default connect(mapStateToProps, mapDispatchToProps)(tempHome)
