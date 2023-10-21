import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeNotification = async () => {
  const storedNotifications = await AsyncStorage.getItem('notifications');
  let notifications = storedNotifications
    ? JSON.parse(storedNotifications)
    : [];
  notifications.push(remoteMessage);
  await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
};

export const setupFCMListener = async navigation => {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      'NOTIFICATION CAUSED APP TO OPEN FROM BACKGROUND STATE:',
      remoteMessage.notification,
    );
    navigation.navigate(remoteMessage.data.type);
    await notifee.cancelNotification(String(remoteMessage.notification.id));
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

        await notifee.cancelNotification(String(remoteMessage.notification.id));
      }
    });
  messaging().onMessage(async remoteMessage => {
    storeNotification();
    console.log('NOTIFICATION IN FOREGROUND STATE', remoteMessage);
    const {title, body} = remoteMessage.notification;
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        pressAction: {
          id: 'default',
        },
      },
    });
  });
  // messaging().onMessage(async remoteMessage => {
  //   console.log('NOTIFICATION FOREGROUND STATE', remoteMessage);
  //   const notification = new notifee.Notification({
  //     title: remoteMessage.notification.title,
  //     body: remoteMessage.notification.body,
  //   });
  //   await notifee.displayNotification(notification);
  // });

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
