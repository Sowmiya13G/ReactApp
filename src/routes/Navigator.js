import {valuePacker} from 'react-native-reanimated';
// import 'react-native-reanimated';
import 'react-native-gesture-handler';

import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/OnBoardingScreens/WelcomeScreen/WelcomeScreen';
import LogInScreen from '../screens/OnBoardingScreens/LogInScreen/LogInScreen';
import SignUpScreen from '../screens/OnBoardingScreens/SignUpScreen/SignUpScreen';
import DetailsScreen from '../screens/OnBoardingScreens/DetailsScreen/DetailsScreen';
import SetPasswordScreen from '../screens/OnBoardingScreens/SetPasswordScreen/SetPasswordScreen';
import DrawerNav from './DrawerNav';
import messaging from '../firebase/messaging';
import {requestUserPermission} from '../firebase/pushNotification';
import {setupFCMListener} from '../utils/pushnotification_helper';
const Stack = createStackNavigator();
export default class Navigator extends Component {
  async componentDidMount() {
    messaging();
    requestUserPermission();
    setupFCMListener(this.props.navigation);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'WelcomeScreen'}>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{
              title: '',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="LogInScreen"
            component={LogInScreen}
            options={{
              title: '',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{
              title: '',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options={{
              title: '',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SetPasswordScreen"
            component={SetPasswordScreen}
            options={{
              title: '',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={DrawerNav}
            initialParams={{}}
            options={{
              title: '',
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
