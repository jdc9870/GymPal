import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import { onPictureDispatched } from '../../actions';
import AuthInput from '../../components/AuthInput';
import { AppStyles, AppLayout } from '../../AppStyles';
import Button from '../../components/Button';

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: false,
    path: 'images'
  }
};

class EnterPictureScreen extends Component {
  static navigationOptions = {
    title: "Log into GymPal"
  };

  constructor(props) {
    super(props)
    this.state = {
      imgSource: null,
    }
  }

  enterPictureHandler = () => {
    this.props.dispatchEnterPicture(this.state.imgSource, this.state.imgUri);
  }

  pickImage = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('You cancelled image picker 😟');
      } else if (response.error) {
        alert('And error occured: ', response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({
          imgSource: source,
          imgUri: response.urim
        });
      }
    });
  };

  render() {
    const isEnabled = this.state.imgSource != null;
    return (
      <View style={styles.container}>
        <View style={AppLayout.greetingContainer}>
          <Text style={AppLayout.greeting}>My best picture is</Text>
        </View>
        {/** Select Image button */}
        <Button
          isLoading={false}
          title="Pick an image"
          onPress={this.pickImage}
        />
        {/** Display selected image */}
        {this.state.imgSource ? (
          <Image
            source={this.state.imgSource}
            style={styles.image}
          />
        ) : null }
        <Button
          isLoading={false}
          title="Done"
          isEnabled={!isEnabled}
          onPress={this.enterPictureHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  image: {
    marginTop: 20,
    minWidth: 200,
    height: 200
  }
});

const mapDispatchToProps = {
  dispatchEnterPicture: (imageSrc, imageUri) => onPictureDispatched(imageSrc, imageUri)
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterPictureScreen)
