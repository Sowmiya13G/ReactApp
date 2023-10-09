import React, {Component} from 'react';
import {Image, Text, View} from 'react-native';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';

import Bills from '../screens/DrawerNavScreens/Bills';
import Notification from '../screens/DrawerNavScreens/Notification';
import FindStore from '../screens/DrawerNavScreens/FindStore';
import Settings from '../screens/DrawerNavScreens/Settings';
import ProfileScreen from '../screens/BottomTabScreens/ProfileScreen/ProfileScreen';
import BottomTabBarNav from './BottomTabBarNav';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({userName, ...props}) => (
  <View style={{flex: 1, backgroundColor: '#ffeb66'}}>
    <View
      style={{
        backgroundColor: '#ffeb66',
        height: 70,
        padding: 15,
        flexDirection: 'row',
      }}>
      <Image
        source={require('../assets/images/user.png')}
        style={{width: 50, height: 50, marginRight: 15}}
      />
      <Text style={{fontSize: 30, color: '#000'}}>{userName}</Text>
    </View>
    <DrawerItemList {...props} />
  </View>
);

class DrawerNav extends Component {
  render() {
    const {userName} = this.props.route.params;

    return (
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={props => (
          <CustomDrawerContent userName={userName} {...props} />
        )}
        screenOptions={{
          drawerStyle: {backgroundColor: '#ffeb66'},
          drawerLabelStyle: {fontSize: 18},
          activeTintColor: 'black',
          inactiveTintColor: 'gray',
          title: '',
        }}>
        <Drawer.Screen
          name="Home"
          component={BottomTabBarNav}
          initialParams={{userName: userName}}
          options={{title: 'ReactApp'}}
        />
        <Drawer.Screen
          name="Bills"
          component={Bills}
          initialParams={{userName: userName}}
          options={{title: 'Bills'}}
        />
        <Drawer.Screen
          name="Notification"
          component={Notification}
          initialParams={{userName: userName}}
          options={{title: 'Notification'}}
        />
        <Drawer.Screen
          name="FindStore"
          component={FindStore}
          initialParams={{userName: userName}}
          options={{title: 'FindStore'}}
        />
        <Drawer.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          initialParams={{userName: userName}}
          options={{title: 'ProfileScreen'}}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          initialParams={{userName: userName}}
          options={{title: 'Settings'}}
        />
      </Drawer.Navigator>
    );
  }
}

export default DrawerNav;
