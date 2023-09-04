import { StyleSheet} from 'react-native'
import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import LogInScreen from '../screens/LogInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SetPasswordScreen from '../screens/SetPasswordScreen';

const Stack = createStackNavigator();

class Navigator extends Component {
    render(){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="WelcomeScreen">
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
          </Stack.Navigator>
        </NavigationContainer>
      );
}
}

export default Navigator

const styles = StyleSheet.create({})