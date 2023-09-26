import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    await this.getFCMToken();
  }
};
getFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log(token);
  } catch (error) {
    console.log(error);
  }
};
export const setupFCMListeners = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    this.props.navigation.navigate(remoteMessage.data.type);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage =>
    console.log('Notification forground state', remoteMessage),
  );
};

//   messaging().onMessage(async remoteMessage => {
//     console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
//   });

//   messaging().onNotificationOpenedApp(remoteMessage => {
//     console.log('onNotificationOpenedApp:', JSON.stringify(remoteMessage));
//   });
// this.setState({initialRoute: remoteMessage.data.type});
// }
// this.setState({loading: false});
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         console.log(
//           'Notification caused app to open from quit state:',
//           JSON.stringify(remoteMessage),
//         );
//       }
//     });

//   messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
//   });

// GetFCMTocken = async () => {
//   let fcmtocken = await AsyncStorage.getItem('fcmtocken');
//   console.log(fcmtocken, 'old tocken');
//   if (!fcmtocken) {
//     try {
//       let fcmTokenObject = await messaging().getToken();

//       if (fcmTokenObject && fcmTokenObject.token) {
//         let fcmToken = fcmTokenObject.token;
//         console.log(fcmToken, 'new tocken');
//         await AsyncStorage.setItem('fcmtocken', JSON.stringify(fcmToken)); // Stringify the token
//       }
//     } catch (error) {
//       console.log(error, 'error');
//     }
//   }
// };
