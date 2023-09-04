import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import CustomButton from '../components/Buttons/CustomButton';
import BottomDesign from '../components/BottomDesign/BottomDesign';

class WelcomeScreen extends Component {
  // navigation methods using props
  goToSignUp = () => {
    console.log('SIGN UP Button clicked')
    this.props.navigation.navigate('SignUpScreen');
  };

  goToLogIn = () => {
    console.log('LOG IN Button clicked')
    this.props.navigation.navigate('LogInScreen');
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
