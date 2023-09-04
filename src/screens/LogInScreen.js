import React, { Component } from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
} from 'react-native';
// import packages
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import screen components in navigation container
import CustomButton from '../components/Buttons/CustomButton';
import BottomDesign from '../components/BottomDesign/BottomDesign';

class LogInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
  }
  
  navigation = useNavigation();
  goToSignUp = () => {
    this.navigation.navigate('SignUpScreen');
  };

  handleLogin = async () => {
    await this.authenticateUser();
  };

  authenticateUser = async () => {
    console.log('Entering authenticateUser function');
    console.log('userName:', this.state.userName);
    console.log('password:', this.state.password);

    try {
      const userData = await AsyncStorage.getItem('userData');
      this.navigation.navigate('HomeScreen');
      console.log('userData:', userData);

    } catch (error) {
      console.error('Error authenticating user: ', error);
    }
  };

  render() {
    const { userName, password } = this.state;

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.head}>
            <Image
              source={require('./../assets/images/login.jpg')}
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
              onChangeText={(text) => this.setState({ userName: text })}
            />
            <Text style={styles.title}>Password</Text>
            <View style={styles.password}>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="grey"
                value={password}
                onChangeText={(text) => this.setState({ password: text })}
              />
              <Image
                style={styles.icon}
                source={require('./../assets/images/hide.png')}
              />
            </View>
          </View>
          <View style={styles.forgot}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </View>
          <View style={styles.buttonView}>
            <CustomButton
              logInButton
              label="LOGIN"
              handlePress={this.authenticateUser}
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

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    position: 'relative',
  },
  head: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 50,
    height: 160,
    width: 160,
  },
  logIn: {
    fontSize: 40,
    marginBottom: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  details: {
    marginLeft: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    marginBottom: 15,
    left: 0,
    color: '#000000',
  },
  input: {
    width: '90%',
    height: 40,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingRight: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  password: {
    flexDirection: 'row',
  },
  icon: {
    height: 15,
    width: 15,
    marginRight: 50,
    right: '0%',
    position: 'absolute',
    marginVertical: 13,
  },
  forgot: {
    alignItems: 'flex-end',
    right: 30,
    marginBottom: 30,
  },
  forgotText: {
    color: '#000000',
  },
  buttonView: {
    bottom: 0,
    paddingLeft: 25,
    paddingRight: 25,
  },
  bottom: {
    bottom: 0,
    width: '100%',
    height: 100,
  },
});

export default LogInScreen;
