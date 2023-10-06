import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

export const setupFCMListener = async navigation => {
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'NOTIFICATION CAUSED APP TO OPEN FROM BACKGROUND STATE:',
      remoteMessage.notification,
    );
    navigation.navigate(remoteMessage.data.type);
    await notifee.cancelNotification(remoteMessage.notification.id);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      if (remoteMessage) {
        console.log(
          'NOTIFICATION CAUSED APP TO OPEN FROM QUITE STATE:',
          remoteMessage.notification,
        );
        await notifee.cancelNotification(remoteMessage.notification.id);
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('NOTIFICATION FOREGROUND STATE', remoteMessage);
    const notification = new notifee.Notification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
    });
    await notifee.displayNotification(notification); // Display the notification.
  });

  notifee.onBackgroundEvent(async ({type, detail}) => {
    if (type === notifee.BackgroundEventType.PRESS) {
      // Handle background press event
      const {notification} = detail;
      console.log('BACKGROUND NOTIFICATION PRESSED:', notification);
    } else if (type === notifee.BackgroundEventType.DISMISSED) {
      // Handle background dismiss event
      const {notification} = detail;
      console.log('BACKGROUND NOTIFICATION DISMISSED:', notification);
    }
  });
};
