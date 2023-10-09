import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {styles} from './styles';
import {onDisplayNotification} from '../../../utils/notifee';
import CustomButton from '../../../components/Buttons/CustomButton';
import BottomDesign from '../../../components/BottomDesign/BottomDesign';

class WelcomeScreen extends Component {
  goToSignUp = () => {
    console.log('SIGN UP Button clicked');
    this.props.navigation.navigate('SignUpScreen');
  };

  goToLogIn = () => {
    console.log('LOG IN Button clicked');
    this.props.navigation.navigate('LogInScreen');
    onDisplayNotification();
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/welcome.jpg')}
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
