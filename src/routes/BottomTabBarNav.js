import React, {Component} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import screens for bottom tab bar
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import PriceScreen from '../screens/PriceScreen/PriceScreen';
import ShopScreen from '../screens/ShopScreen/ShopScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

const Tab = createBottomTabNavigator();

export class BottomTabBarNav extends Component {
  render() {
    const {userName} = this.props.route.params;
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {backgroundColor: '#fbdb03', height: 60},
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'HomeScreen') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'PriceScreen') {
              iconName = focused ? 'payments' : 'payments';
            } else if (route.name === 'ShopScreen') {
              iconName = focused ? 'shopping_cart' : 'shopping_cart';
            } else if (route.name === 'ProfileScreen') {
              iconName = focused ? 'manage_accounts' : 'manage_accounts';
            }
            if (iconName) {
              return (
                <Icon
                  name={iconName}
                  size={size}
                  color={focused ? 'black' : 'gray'}
                />
              );
            }
          },
        })}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          initialParams={{userName: userName}}
          options={{
            tabBarLabel: 'Home',
            title: '',
            headerShown: false,
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
          }}
        />
        <Tab.Screen
          name="PriceScreen"
          component={PriceScreen}
          initialParams={{userName: userName}}
          options={{
            tabBarLabel: 'Price',
            title: '',
            headerShown: false,
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
          }}
        />
        <Tab.Screen
          name="ShopScreen"
          component={ShopScreen}
          initialParams={{userName: userName}}
          options={{
            tabBarLabel: 'Shop',
            title: '',
            headerShown: false,
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          initialParams={{userName: userName}}
          options={{
            tabBarLabel: 'Profile',
            title: '',
            headerShown: false,
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default BottomTabBarNav;
