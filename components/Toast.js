
import Toast from 'react-native-toast-message';

export const showToast = (type, text) => {
  Toast.show({
    type: type, // 'success', 'error', 'info', 'warn'
    text1: text,
    visibilityTime: 4000, // Toast visibility duration in milliseconds
    autoHide: true,
  });
};