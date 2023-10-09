import React, {Component} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
// import screens for bottom tab bar
import HomeScreen from '../screens/BottomTabScreens/HomeScreen/HomeScreen';
import PriceScreen from '../screens/BottomTabScreens/PriceScreen/PriceScreen';
import ShopScreen from '../screens/BottomTabScreens/ShopScreen/ShopScreen';
import ProfileScreen from '../screens/BottomTabScreens/ProfileScreen/ProfileScreen';

const Tab = createBottomTabNavigator();

export class BottomTabBarNav extends Component {
  render() {
    const {userName} = this.props.route.params;
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarStyle: {backgroundColor: '#fbdb03', height: 60},
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          title: '',
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'HomeScreen') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'PriceScreen') {
              iconName = focused ? 'tags' : 'tags';
            } else if (route.name === 'ShopScreen') {
              iconName = focused ? 'shopping-cart' : 'shopping-cart';
            } else if (route.name === 'ProfileScreen') {
              iconName = focused ? 'user-circle-o' : 'user-circle-o';
            }
            if (iconName) {
              return <Icon name={iconName} size={size} color={color} />;
            }
          },
        })}>
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          initialParams={{userName: userName}}
          options={{tabBarLabel: 'Home'}}
        />
        <Tab.Screen
          name="PriceScreen"
          component={PriceScreen}
          initialParams={{userName: userName}}
          options={{tabBarLabel: 'Price'}}
        />
        <Tab.Screen
          name="ShopScreen"
          component={ShopScreen}
          initialParams={{userName: userName}}
          options={{tabBarLabel: 'Shop'}}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          initialParams={{userName: userName}}
          options={{tabBarLabel: 'Profile'}}
        />
      </Tab.Navigator>
    );
  }
}

export default BottomTabBarNav;
