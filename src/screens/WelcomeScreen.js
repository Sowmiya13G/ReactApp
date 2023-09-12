import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import notifee from '@notifee/react-native';
import CustomButton from '../components/Buttons/CustomButton';
import BottomDesign from '../components/BottomDesign/BottomDesign';

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
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
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
          source={require('./../assets/images/welcome.jpg')}
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

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    width: '80%',
  },
  logo: {
    height: 180,
    width: 180,
  },
  bottom: {
    bottom: 0,
    width: '100%',
    height: 100,
    position: 'absolute',
  },
});

export default WelcomeScreen;
