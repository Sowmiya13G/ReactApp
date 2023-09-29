import analytics from '@react-native-firebase/analytics';
import messaging from '@react-native-firebase/messaging';
// Register background handler
export const messageService = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
};
export const trackAddToCart = item => {
  analytics()
    .logEvent('add_to_cart', {
      item_id: item.id,
      item_name: item.title,
      price: item.price,
    })
    .then(() => console.log('Add to Cart event tracked'))
    .catch(error => console.error('Error tracking Add to Cart event', error));
};
