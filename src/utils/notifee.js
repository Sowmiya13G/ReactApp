import notifee from '@notifee/react-native';

export const onDisplayNotification = async () => {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Hey User',
    body: 'You are being directed to the LOG IN screen',
    android: {
      channelId,
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
    },
  });
};
