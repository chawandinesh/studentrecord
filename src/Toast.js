import Toast from 'react-native-toast-message';

export const ShowToast = (type, message1, message2) =>

  Toast.show({
    type: type,
    position: 'top',
    text1: message1,
    text2: message2,
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
    onShow: () => {},
    onHide: () => {},
    onPress: () => {},
  });
