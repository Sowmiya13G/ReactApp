import messaging from '@react-native-firebase/messaging';
import {Notifee} from '@notifee/react-native';

export const setupFCMListener = async () => {
  try {
    Notifee.init({});

    messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(
        'NOTIFICATION CAUSED APP TO OPEN FROM BACKGROUND STATE:',
        remoteMessage.notification,
      );
      // Handle the notification opening
      // Ensure that this component has access to navigation prop
      this.props.navigation.navigate(remoteMessage.data.type);
      await Notifee.cancelNotification(remoteMessage.notification.id);
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
          await Notifee.cancelNotification(remoteMessage.notification.id);
        }
      });

    messaging().onMessage(async remoteMessage => {
      console.log('NOTIFICATION FOREGROUND STATE', remoteMessage);
      const notification = new Notifee.Notification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
      });
      await Notifee.displayNotification(notification); // Display the notification.
    });

    Notifee.onBackgroundEvent(async ({type, detail}) => {
      if (type === Notifee.BackgroundEventType.PRESS) {
        // Handle background press event
        const {notification} = detail;
        console.log('BACKGROUND NOTIFICATION PRESSED:', notification);
      } else if (type === Notifee.BackgroundEventType.DISMISSED) {
        // Handle background dismiss event
        const {notification} = detail;
        console.log('BACKGROUND NOTIFICATION DISMISSED:', notification);
      }
    });
  } catch (error) {
    console.error('ERROR SETTING UP FCM LISTENERS:', error);
  }
};
