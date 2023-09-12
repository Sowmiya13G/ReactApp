import firebase from 'firebase/app';
import 'firebase/messaging'; // For push notifications
import 'firebase/analytics'; // For analytics
import 'firebase/crashlytics'; // For Crashlytics

const firebaseConfig = {
  apiKey: 'AIzaSyCpicPuYX79iXZVZyAZNc4BQid1Yh2o7b8',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'reactapp-f9247',
  storageBucket: 'reactapp-f9247.appspot.com',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: '1:524005106552:android:e6fb595cdb4894c1621e8d',
  measurementId: 'YOUR_MEASUREMENT_ID', // For analytics
};

// Initialize Firebase
// if(firebase.apps.)÷
firebase.initializeApp(firebaseConfig);

firebase.analytics();
firebase.crashlytics();

export default firebase;
