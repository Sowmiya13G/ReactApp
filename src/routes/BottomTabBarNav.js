import React, {Component} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

// import screens for bottom tab bar
import HomeScreen from '../screens/HomeScreen';
import PriceScreen from '../screens/PriceScreen';
import ShopScreen from '../screens/ShopScreen';
import ProfileScreen from '../screens/ProfileScreen';

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
              iconName = focused ? 'dollar-sign' : 'dollar-sign';
            } else if (route.name === 'ShopScreen') {
              iconName = focused ? 'shopping-cart' : 'shopping-cart';
            } else if (route.name === 'ProfileScreen') {
              iconName = focused ? 'user' : 'user';
            }
            if (iconName) {
              return (
                <FontAwesome5Icon
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
          options={{tabBarLabel: 'Home', title: '', headerShown: false}}
        />
        <Tab.Screen
          name="PriceScreen"
          component={PriceScreen}
          initialParams={{userName: userName}}
          options={{tabBarLabel: 'Price', title: '', headerShown: false}}
        />
        <Tab.Screen
          name="ShopScreen"
          component={ShopScreen}
          initialParams={{userName: userName}}
          options={{tabBarLabel: 'Shop', title: '', headerShown: false}}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          initialParams={{userName: userName}}
          options={{tabBarLabel: 'Profile', title: '', headerShown: false}}
        />
      </Tab.Navigator>
    );
  }
}

export default BottomTabBarNav;
