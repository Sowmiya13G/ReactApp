import {Linking} from 'react-native';
import React, {Component} from 'react';
import {Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SetPasswordScreen from '../screens/SetPasswordScreen';
import BottomTabBarNav from './BottomTabBarNav';
import DrawerNav from './DrawerNav';
const Stack = createStackNavigator();
const linking = {
  prefixes: ['https://reactapp.com', 'reactapp://'],
  config: {
    screens: {
      LogInScreen: {
        path: 'login',
      },
    },
  },
};
class Navigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      checkedAuthentication: false,
      userName: '',
    };
  }
  componentDidMount() {
    // Check if the user is authenticated
    this.checkAuthentication();
    // Listen for deep link events
    Linking.addEventListener('url', this.handleDeepLink);
  }
  componentWillUnmount() {
    // Remove the event listener when the component unmounts
    // Linking.removeEventListener('url', this.handleDeepLink);
  }
  handleDeepLink = async event => {
    const {path, queryParams} = linking.parse(event.url);
    if (path === 'login') {
      // Extract parameters from queryParams and navigate to DetailsScreen
      const {id} = queryParams;
      this.props.navigation.navigate('login', {id});
    }
  };
  async checkAuthentication() {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');
      console.log('userDataJSON:', userDataJSON); // Debug: Log user data

      if (userDataJSON) {
        const userDataArray = JSON.parse(userDataJSON);
        console.log('Parsed userDataArray:', userDataArray); // Debug: Log parsed user data array

        // You need to find the specific user details and extract the userName
        // For example, if you want to use the first user's userName:
        if (userDataArray.length > 0) {
          const userName = userDataArray[0].userName;
          console.log('userName:', userName); // Debug: Log userName

          if (userName) {
            // If userName exists, consider the user as authenticated
            this.setState({authenticated: true, userName});
            console.log('User is authenticated with userName:', userName);
          } else {
            // If userName doesn't exist, the user is not authenticated
            this.setState({authenticated: false});
            console.log('User is not authenticated');
          }
        } else {
          // If user details array is empty, the user is not authenticated
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

// checkAuthentication = async () => {
//   try {
//     const userDataJSON = await AsyncStorage.getItem('userData');
//     console.log('userDataJSON:', userDataJSON); // Debug: Log user data

//     if (userDataJSON) {
//       const userData = JSON.parse(userDataJSON);
//       console.log('Parsed userData:', userData); // Debug: Log parsed user data

//       const userName = userData.userName;
//       console.log('userName:', userName); // Debug: Log userName

//       if (userName) {
//         // If userName exists, consider the user as authenticated
//         this.setState({authenticated: true});
//         console.log('User is authenticated with userName:', userName);
//       } else {
//         // If userName doesn't exist, the user is not authenticated
//         this.setState({authenticated: false});
//         console.log('User is not authenticated');
//       }
//     } else {
//       // If user details don't exist, the user is not authenticated
//       this.setState({authenticated: false});
//       console.log('User is not authenticated');
//     }
//     // Set checkedAuthentication to true to indicate that authentication check is complete
//     this.setState({checkedAuthentication: true});
//   } catch (error) {
//     console.error('Error checking authentication:', error);
//   }
// };
