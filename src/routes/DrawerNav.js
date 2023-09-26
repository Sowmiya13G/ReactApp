import React, {Component} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Bills from '../screens/drawer/Bills';
import Notification from '../screens/drawer/Notification';
import FindStore from '../screens/drawer/FindStore';
import Profile from '../screens/drawer/Profile';
import Settings from '../screens/drawer/Settings';
import BottomTabBarNav from './BottomTabBarNav';
const Drawer = createDrawerNavigator();

class DrawerNav extends Component {
  render() {
    const {userName} = this.props.route.params;
    return (
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#ffeb66',
            // width: 240,
          },
        }}>
        <Drawer.Screen
          name="Home"
          component={BottomTabBarNav}
          initialParams={{userName: userName}}
          options={{
            title: 'ReactApp',
          }}
        />
        <Drawer.Screen
          name="Bills"
          component={Bills}
          initialParams={{userName: userName}}
          options={{
            title: 'Bills',
          }}
        />
        <Drawer.Screen
          name="Notification"
          component={Notification}
          initialParams={{userName: userName}}
          options={{
            title: 'Notification',
          }}
        />
        <Drawer.Screen
          name="FindStore"
          component={FindStore}
          initialParams={{userName: userName}}
          options={{
            title: 'FindStore',
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
          initialParams={{userName: userName}}
          options={{
            title: 'Profile',
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          initialParams={{userName: userName}}
          options={{
            title: 'Settings',
          }}
        />
      </Drawer.Navigator>
    );
  }
}

export default DrawerNav;

// class HomeScreen extends Component {
//   render() {
//     const {navigation} = this.props;
//     return (
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//         <Button
//           onPress={() => navigation.navigate('Notifications')}
//           title="Go to notifications"
//         />
//       </View>
//     );
//   }
// }

// class NotificationsScreen extends Component {
//   render() {
//     const {navigation} = this.props;
//     return (
//       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//         <Button onPress={() => navigation.goBack()} title="Go back home" />
//       </View>
//     );
//   }
// }
