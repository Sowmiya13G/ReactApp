import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {styles} from './styles';
import notifee from '@notifee/react-native';
import CustomButton from '../../components/Buttons/CustomButton';
import BottomDesign from '../../components/BottomDesign/BottomDesign';

class WelcomeScreen extends Component {
  // navigation methods using props
  goToSignUp = () => {
    console.log('SIGN UP Button clicked');
    this.props.navigation.navigate('SignUpScreen');
  };

  goToLogIn = () => {
    console.log('LOG IN Button clicked');
    this.props.navigation.navigate('LogInScreen');
    this.onDisplayNotification();
  };

  onDisplayNotification = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Hey User',
      body: 'You are being directed to the LOG IN screen',
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/welcome.jpg')}
          style={styles.logo}
        />
        <View style={styles.buttonView}>
          <CustomButton
            logInButton
            label="LOG IN"
            handlePress={this.goToLogIn}
          />
          <CustomButton
            signUpButton
            label="SIGN UP"
            handlePress={this.goToSignUp}
          />
        </View>
        <View style={styles.bottom}>
          <BottomDesign />
        </View>
      </View>
    );
  }
}

export default WelcomeScreen;
