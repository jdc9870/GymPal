import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Modal
} from 'react-native';

import { AppStyles } from '../AppStyles';

export default ({ title, onPress, isLoading, isEnabled }) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={isEnabled}
    underlayColor="rgba(128, 128, 128, 0.1)"
    >
    <View style={[styles.facebookContainer, {backgroundColor: isEnabled
      ? AppStyles.colors.disabled : AppStyles.colors.primary}]}>
      <Text style={[styles.facebookText]}>{title}</Text>
      {
        isLoading && (
        <Modal
          transparent={true}
          animationType={'fade'}
          visible={isLoading}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicator}>
                <ActivityIndicator color={AppStyles.colors.primary} />
            </View>
          </View>
        </Modal>
        )
      }
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    marginTop: 25,
    flexDirection: 'row'
  },
  buttonText: {
    color: AppStyles.colors.primary,
    fontFamily: AppStyles.fontName.main,
    fontSize: 22,
    letterSpacing: 0.5
  },
  activityIndicator: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.colors.primary,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 40,
    height: 42,
    alignItems: 'center'
  },
  facebookText: {
    color: AppStyles.colors.white,
    fontSize: AppStyles.fontSize.button
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
})
