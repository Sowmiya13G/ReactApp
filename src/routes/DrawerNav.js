import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Bills} from '../screens/DrawerNavScreens/Bills/Bills';
import Notification from '../screens/DrawerNavScreens/Notifications/Notification';
import FindStore from '../screens/DrawerNavScreens/FindStore';
import Settings from '../screens/DrawerNavScreens/Settings/Settings';
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
      <Icon name="user-circle-o" size={40} color="#000" />
      <Text style={{fontSize: 30, color: '#000'}}>{userName}</Text>
    </View>
    <DrawerItemList {...props} />
  </View>
);

class DrawerNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
    };
  }
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
          initialParams={{userName: userName, cart: this.setState.cart}}
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
