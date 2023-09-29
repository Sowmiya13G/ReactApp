import React, {Component} from 'react';
import {linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {messageService} from '../services/firebase';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import LogInScreen from '../screens/LogInScreen/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen/SignUpScreen';
import DetailsScreen from '../screens/DetailsScreen/DetailsScreen';
import SetPasswordScreen from '../screens/SetPasswordScreen/SetPasswordScreen';
import DrawerNav from './DrawerNav';
import {handleDeepLink} from '../utils/deepLinking';
import {checkAuthentication} from '../asyncService/authentication';
const Stack = createStackNavigator();

class Navigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      checkedAuthentication: false,
      userName: '',
    };
  }
  async componentDidMount() {
    // Check if the user is authenticated
    const {authenticated, userName} = await checkAuthentication();

    this.setState({
      authenticated,
      userName,
      checkedAuthentication: true,
    });
    messageService();
    // Listen for deep link events
    Linking.addEventListener('url', handleDeepLink);
  }

  render() {
    const {authenticated, checkedAuthentication} = this.state;
    if (!checkedAuthentication) {
      return null;
    }

    return (
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          initialRouteName={authenticated ? 'HomeScreen' : 'WelcomeScreen'}>
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
            initialParams={{userName: this.state.userName}}
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
export default Navigator;
