import {Notifee} from '@notifee/react-native';
export const setupFCMListeners = async () => {
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // Handle the notification opening
    this.props.navigation.navigate(remoteMessage.data.type);
    await Notifee.cancelNotification(remoteMessage.notification.id);
  });
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(async remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        await Notifee.cancelNotification(remoteMessage.notification.id);
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('Notification foreground state', remoteMessage);
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
      console.log('Background notification pressed:', notification);
    } else if (type === Notifee.BackgroundEventType.DISMISSED) {
      // Handle background dismiss event
      const {notification} = detail;
      console.log('Background notification dismissed:', notification);
    }
  });
};
