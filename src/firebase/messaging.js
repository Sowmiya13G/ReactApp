import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  const storedNotifications = await AsyncStorage.getItem('notifications');
  let notifications = storedNotifications
    ? JSON.parse(storedNotifications)
    : [];
  notifications.push(remoteMessage);
  await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
});
export default messaging;

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });
// Handle received notifications and store them
// messaging().onMessage(async remoteMessage => {
//   console.log('Received Notification:', remoteMessage);

//   // Store the received notification in AsyncStorage
//   const storedNotifications = await AsyncStorage.getItem('notifications');
//   let notifications = storedNotifications
//     ? JSON.parse(storedNotifications)
//     : [];
//   notifications.push(remoteMessage);
//   await AsyncStorage.setItem('notifications', JSON.stringify(notifications));
// });

// import messaging from '@react-native-firebase/messaging';
