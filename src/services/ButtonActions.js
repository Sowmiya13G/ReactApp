import {onDisplayNotification} from '../utils/notifee';
export const newPassword = (navigation, userName) => {
  navigation.navigate('SetPasswordScreen', {userName});
};
export const goToSignUp = navigation => {
  navigation.navigate('SignUpScreen');
};
export const goToLogOut = navigation => {
  navigation.navigate('WelcomeScreen');
};

export const goToLogIn = navigation => {
  navigation.navigate('LogInScreen');
  onDisplayNotification();
};
