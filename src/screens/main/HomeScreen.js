import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  PanResponder,
  ActivityIndicator
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import { AppStyles, AppIcon } from '../../AppStyles';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


const Foods = [
  { id: "1", uri: require('../../assets/images/image1.jpg') },
  { id: "2", uri: require('../../assets/images/image2.jpg') },
  { id: "3", uri: require('../../assets/images/image3.jpg') },
  { id: "4", uri: require('../../assets/images/image4.jpg') },
  { id: "5", uri: require('../../assets/images/image5.jpg') },
]

const anotherURI = 'images/sT8OxxHvcqPA6BDOyJrEz2mIagB3.jpg'

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      mounted: true,
      loading: true,
      currentIndex: 0,
      images: Foods
    }
    // const user = firebase.auth().currentUser;


    this.position = new Animated.ValueXY();

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH /2 ,0, SCREEN_WIDTH /2],
      outputRange: ['-30deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.likeOpacity = this.position.x.interpolate({
       inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
       outputRange: [0, 0, 1],
       extrapolate: 'clamp'
    })

    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })

    this.nextCardOpacity = this.position.x.interpolate({
       inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
       outputRange: [1, 0, 1],
       extrapolate: 'clamp'
    })

    this.nextCardScale = this.position.x.interpolate({
       inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
       outputRange: [1, 0.8, 1],
       extrapolate: 'clamp'
    })

    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
         this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 120) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else if (gestureState.dx < -120) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy }
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
        }
      }
    });
  }

  componentDidMount() {
    this.setState({ isMounted: true })
    this.getAndLoadImage()
  }

  async getAndLoadImage() {
    if (this.state.mounted == true) {
      const ref = firebase.storage().ref(anotherURI);
      ref.getDownloadURL()
        .then((url) => {
          console.log(url)
          this.state.images.push({id: "6", uri: url})
          this.setState({ loading: false })
        })
        .catch(error => {
          console.log("awww")
          console.log(error)
          this.setState({ loading: false })
        })
    }
  }

  componentWillUnmount() {
    this.setState({ isMounted: false })
  }


  renderUsers = () => {
    return this.state.images.map((item, i) => {
     if (i < this.state.currentIndex) {
       return null;
     } else if (i == this.state.currentIndex) {
       return (
         <Animated.View
           {...this.PanResponder.panHandlers}
           key={i}
           style={[
             this.rotateAndTranslate,
             {
                 height: SCREEN_HEIGHT - hp('20%'),
                 width: SCREEN_WIDTH,
                 padding: 10,
                 position: "absolute"
             }
           ]}
         >
          <Animated.View
             style={{
               opacity: this.likeOpacity,
               transform: [{ rotate: "-30deg" }],
               position: "absolute",
               top: 50,
               left: 40,
               zIndex: 1000
             }}
            >
             <Text
               style={{
                 borderWidth: 1,
                 borderColor: "green",
                 color: "green",
                 fontFamily: AppStyles.fontName.main,
                 fontSize: 32,
                 fontWeight: "800",
                 padding: 10
               }}
             >
               Yeet
             </Text>
            </Animated.View>
            <Animated.View
             style={{
               opacity: this.dislikeOpacity,
               transform: [{ rotate: "30deg" }],
               position: "absolute",
               top: 50,
               right: 40,
               zIndex: 1000
             }}
            >
             <Text
               style={{
                 borderWidth: 1,
                 borderColor: "red",
                 color: "red",
                 fontSize: 32,
                 fontFamily: AppStyles.fontName.main,
                 fontWeight: "800",
                 padding: 10
               }}
             >
                Nah
             </Text>
            </Animated.View>
           <Image
             style={{
               flex: 1,
               height: null,
               width: null,
               resizeMode: "cover",
               borderRadius: 20
             }}
             source={item.uri}
           />
         </Animated.View>
       );
     } else {
       return (
         <Animated.View
           key={i}
           style={[
             {
               opacity: this.nextCardOpacity,
               transform: [{ scale: this.nextCardScale }],
               height: SCREEN_HEIGHT - hp('20%'),
               width: SCREEN_WIDTH,
               padding: 10,
               position: "absolute"
             }
           ]}
         >
           <Image
             style={{
               flex: 1,
               height: null,
               width: null,
               resizeMode: "cover",
               borderRadius: 20
             }}
             source={item.uri}
           />
         </Animated.View>
       );
     }
   }).reverse();
  };



  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <View style={{ height: hp('8%') }} />
  //       <View style={{ flex: 1 }}>
  //         {this.renderUsers()}
  //       </View>
  //       <View style={{ height: hp('10%') }} />
  //     </View>
  //   )
  // }

  render() {
    if (this.state.mounted == true) {
      if (this.state.loading == true) {
        return (
          <View style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator/>
          </View>
        );
      }
      else {
        return (
          <View style={styles.container}>
            <View style={{ height: hp('8%') }} />
            <View style={{ flex: 1 }}>
              {this.renderUsers()}
            </View>
            <View style={{ height: hp('10%') }} />
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
    backgroundColor: 'white',
    flex: 1
  }
})

const mapStateToProps = state => ({
  auth: state.auth
})

const mapDispatchToProps = {
  dispatchLogout: () => logOut()
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
