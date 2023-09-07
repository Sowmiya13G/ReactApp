import {StyleSheet} from 'react-native';
import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SetPasswordScreen from '../screens/SetPasswordScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
class Navigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      checkedAuthentication: false,
    };
  }

  componentDidMount() {
    // Check if the user is authenticated (e.g., by checking AsyncStorage)
    this.checkAuthentication();
  }
  checkAuthentication = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');
      console.log('userDataJSON:', userDataJSON); // Debug: Log user data

      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        console.log('Parsed userData:', userData); // Debug: Log parsed user data

        const userName = userData.userName;
        console.log('userName:', userName); // Debug: Log userName

        if (userName) {
          // If userName exists, consider the user as authenticated
          this.setState({authenticated: true});
          console.log('User is authenticated with userName:', userName);
        } else {
          // If userName doesn't exist, the user is not authenticated
          this.setState({authenticated: false});
          console.log('User is not authenticated');
        }
      } else {
        // If user details don't exist, the user is not authenticated
        this.setState({authenticated: false});
        console.log('User is not authenticated');
      }
      // Set checkedAuthentication to true to indicate that authentication check is complete
      this.setState({checkedAuthentication: true});
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  };

  render() {
    const {authenticated, checkedAuthentication} = this.state;
    if (!checkedAuthentication) {
      return null; // You can replace this with a loading component
    }
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={authenticated ? 'HomeScreen' : 'WelcomeScreen'}>
          <Stack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="LogInScreen"
            component={LogInScreen}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="SetPasswordScreen"
            component={SetPasswordScreen}
            options={{
              title: '',
            }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              title: '',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigator;

const styles = StyleSheet.create({});
// checkAuthentication = async () => {
//   try {
//     const userDataJSON = await AsyncStorage.getItem('userData');
//     console.log('userDataJSON:', userDataJSON); // Debug: Log user data

//     if (userDataJSON) {
//       // Parse the JSON string to an object
//       const userData = JSON.parse(userDataJSON);

//       // Access the email property from userData
//       const userEmail = userData.email;

//       if (userEmail != '') {
//         // If email exists, consider the user as authenticated
//         this.setState({authenticated: true});
//         console.log('User is authenticated with email:', userEmail);
//       } else {
//         // If email doesn't exist, the user is not authenticated
//         this.setState({authenticated: false});
//         console.log('User is not authenticated');
//       }
//     } else {
//       // If user details don't exist, the user is not authenticated
//       this.setState({authenticated: false});
//       console.log('User is not authenticated');
//     }
//   } catch (error) {
//     console.error('Error checking authentication:', error);
//   }
// };
