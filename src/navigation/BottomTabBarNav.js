import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import screens for bottom tab bar
import HomeScreen from '../screens/HomeScreen';
import PriceScreen from '../screens/PriceScreen';
import ShopScreen from '../screens/ShopScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export class BottomTabBarNav extends Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{tabBarLabel: 'Home', tabBarIcon: 'home'}}
        />
        <Tab.Screen
          name="PriceScreen"
          component={PriceScreen}
          options={{tabBarLabel: 'Price', tabBarIcon: 'price'}}
        />
        <Tab.Screen
          name="ShopScreen"
          component={ShopScreen}
          options={{tabBarLabel: 'Shop', tabBarIcon: 'shop'}}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{tabBarLabel: 'Profile', tabBarIcon: 'user'}}
        />
      </Tab.Navigator>
    );
  }
}

export default BottomTabBarNav;
