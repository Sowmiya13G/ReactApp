import messaging from '@react-native-firebase/messaging';
export const requestUserPermission = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      await getFCMToken();
    }
  } catch (error) {
    console.log(error);
  }
};
export const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM TOKEN', token);
  } catch (error) {
    console.log(error);
  }
};

// export const setupFCMListeners = async () => {
//     messaging().onNotificationOpenedApp(remoteMessage => {
//       console.log(
//         'Notification caused app to open from background state:',
//         remoteMessage.notification,
//       );
//       this.props.navigation.navigate(remoteMessage.data.type);
//     });

//     // Check whether an initial notification is available
//     messaging()
//       .getInitialNotification()
//       .then(remoteMessage => {
//         if (remoteMessage) {
//           console.log(
//             'Notification caused app to open from quit state:',
//             remoteMessage.notification,
//           );
//         }
//       });

//     messaging().onMessage(async remoteMessage =>
//       console.log('Notification foreground state', remoteMessage),
//     );
//   };
