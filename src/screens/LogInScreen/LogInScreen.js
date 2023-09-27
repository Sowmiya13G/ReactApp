import React, {Component} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import crashlytics from '@react-native-firebase/crashlytics';

// import packages
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/Buttons/CustomButton';
import BottomDesign from '../../components/BottomDesign/BottomDesign';

class LogInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      showPassword: false,
    };
  }
  newPassword = () => {
    this.props.navigation.navigate('SetPasswordScreen', {
      userName: this.state.userName, // Pass the userName as a parameter
    });
  };
  goToSignUp = () => {
    this.props.navigation.navigate('SignUpScreen');
  };

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  };
  handleLogin = async () => {
    const {userName, password} = this.state;

    try {
      const userDataJSON = await AsyncStorage.getItem('userData');

      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);

        // Find the user by username
        const authenticatedUser = userData.find(
          user => user.userName === userName && user.password === password,
        );

        if (authenticatedUser) {
          // Authentication successful
          // Pass the userName as a parameter to HomeScreen
          this.props.navigation.navigate('HomeScreen', {
            userName: authenticatedUser.userName,
          });
        } else {
          console.error(
            'Authentication failed. Incorrect username or password.',
          );

          // Log the authentication failure in Crashlytics
          crashlytics().recordError(new Error(errorMessage));
          console.error(errorMessage);
        }
      } else {
        console.error('User data not found.');
        // Log the missing user data in Crashlytics with an Error object
        crashlytics().recordError(new Error(errorMessage));

        console.error(errorMessage);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Log the error in Crashlytics
      crashlytics().recordError(error);
    }
  };

  render() {
    const {userName, password} = this.state;
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.head}>
            <Image
              source={require('../../assets/images/login.jpg')}
              style={styles.logo}
            />
            <Text style={styles.logIn}>LOG IN</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="grey"
              value={userName}
              onChangeText={text => this.setState({userName: text})}
            />
            <Text style={styles.title}>Password</Text>
            <View style={styles.password}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="grey"
                value={password}
                onChangeText={text => this.setState({password: text})}
                secureTextEntry={this.state.showPassword}
              />
              <TouchableOpacity
                style={styles.icon}
                onPress={this.handlePasswordVisibility}>
                <Icon
                  name={
                    this.state.showPassword ? 'visibility' : 'visibility_off'
                  }
                  size={20}
                  color="grey"
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.forgot}>
            <Text style={styles.forgotText} onPress={this.newPassword}>
              Forgot password?
            </Text>
          </TouchableOpacity>
          <View style={styles.buttonView}>
            <CustomButton
              logInButton
              label="LOGIN"
              handlePress={() => this.handleLogin()}
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
      </SafeAreaView>
    );
  }
}

export default LogInScreen;
