import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
    };
  }

  async componentDidMount() {
    // Retrieve stored notifications from AsyncStorage
    const storedNotifications = await AsyncStorage.getItem('notifications');
    if (storedNotifications) {
      const notifications = JSON.parse(storedNotifications);
      this.setState({notifications});
    }
  }

  deleteNotification = async notificationIndex => {
    const {notifications} = this.state;
    notifications.splice(notificationIndex, 1);

    // Update AsyncStorage with the modified notifications
    await AsyncStorage.setItem('notifications', JSON.stringify(notifications));

    this.setState({notifications});
  };

  renderNotificationItem = ({item, index}) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationText}>
        <Text style={styles.notificationTitle}>{item.notification.title}</Text>
        <Text style={styles.notificationBody}>{item.notification.body}</Text>
      </View>
      <TouchableOpacity onPress={() => this.deleteNotification(index)}>
        <Icon name="trash" size={20} color="red" style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );

  render() {
    const {notifications} = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.notificationTitle}>Your Notifications</Text>
        <FlatList
          data={notifications}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderNotificationItem}
        />
      </View>
    );
  }
}

export default Notification;
