// import notifee from '@notifee/react-native';

// class NotificationService {
//   showViewMoreNotification = async () => {
//     const notification = await notifee.createNotification({
//       title: 'New Products Available!',
//       body: 'Tap to view more products on Amazon.',
//       android: {
//         channelId: 'my-channel-id',
//         autoCancel: true,
//         category: notifee.Android.Category.Alarm,
//         pressAction: {
//           id: 'default',
//           launchActivity: 'myapp://viewmore',
//         },
//       },
//       ios: {
//         categoryId: 'my-category-id',
//       },
//     });

//     await notifee.displayNotification(notification);
//   };
// }

// export default NotificationService;

import notifee from '@notifee/react-native';

class NotificationService {
  static async showViewMoreNotification() {
    const notification = await notifee.createNotification({
      title: 'New Products Available!',
      body: 'Tap to view more products on Amazon.',
      android: {
        channelId: 'my-channel-id', // Replace with your Android notification channel ID
        autoCancel: true,
        category: notifee.Android.Category.Alarm,
        pressAction: {
          id: 'default',
          launchActivity: 'myapp://viewmore', // Replace with the deep link you want to open
        },
      },
      ios: {
        categoryId: 'my-category-id', // Replace with your iOS notification category ID
      },
    });

    await notifee.displayNotification(notification);
  }
}

export default NotificationService;
