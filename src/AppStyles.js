import { Platform, StyleSheet, Dimensions } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;
const numColumns = 2;

const fonts = {
  hairline: 'Lato-Hairline',
  light: 'Lato-Light',
  base: 'Lato-Regular',
  bold: 'Lato-Bold'
}

export const AppStyles = {
  colors: {
    primary: '#ff5a66',
    secondary: '#b9b9b9',
    facebook: "#4267b2",
    text: '#696969',
    grey: "grey",
    disabled: '#a9a9a9',
    white: "white"
  },
  fontSize: {
    title: hp('3%'),
    content: 20,
    button: 16
  },
  buttonWidth: {
    main: wp('70%')
  },
  buttonHeight: {
    main: hp('5%')
  },
  textInputWidth: {
    main: wp('70%')
  },
  fontName: {
    main: 'Noto Sans',
    bold: 'Noto Sans Bold'
  },
  borderRadius: {
    main: 25,
    small: 5
  }
};
export const AppLayout = {
  greetingContainer: {
    alignItems: 'flex-start'
  },
  greeting: {
    marginTop: 20,
    fontSize: hp('4%'),
    color: AppStyles.colors.primary,
    fontFamily: AppStyles.fontName.main
  }
}
export const AppIcon = {
  images: {
    logo: require('./assets/gymPalLogo.png')
  }
};
