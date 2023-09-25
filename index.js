import 'react-native-gesture-handler';
import {Value} from 'react-native-reanimated';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
// Register your app component
AppRegistry.registerComponent(appName, () => App);
