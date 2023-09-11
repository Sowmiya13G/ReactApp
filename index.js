import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import {initializeApp} from '@react-native-firebase/app';

// Your Firebase project configuration
// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// };

// Initialize Firebase
// initializeApp(firebaseConfig);

// Register your app component
AppRegistry.registerComponent(appName, () => App);
