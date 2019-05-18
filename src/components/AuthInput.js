import React from 'react'
import {
  StyleSheet,
  TextInput
} from 'react-native';

import { AppStyles } from '../AppStyles';

// export default ({ placeholder, onChangeText, type, ...props }) => (
//   <TextInput
//     autoCapitalize='none'
//     autoCorrect={false}
//     style={[styles.input]}
//     placeholder={placeholder}
//     placeholderTextColor="#a0a0a0"
//     onChangeText={value => onChangeText(type, value)}
//     underlineColorAndroid='transparent'
//     {...props}
//   />
// )

const authInput = props => (
  <TextInput
    autoCorrect={false}
    autoCapitalize='none'
    underlineColorAndroid="transparent"
    {...props}
    style={[styles.input, props.style]}
  />
);

const styles = StyleSheet.create({
  input: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.colors.text
  }
});

export default authInput;
