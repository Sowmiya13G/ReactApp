import React, {Component} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// import packages
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/Buttons/CustomButton';
import BottomDesign from '../components/BottomDesign/BottomDesign';

class LogInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      isAuthenticated: false,
    };
  }
  newPassword = () => {
    this.props.navigation.navigate('SetPasswordScreen');
  };
  goToSignUp = () => {
    this.props.navigation.navigate('SignUpScreen');
  };
  // handleLogin = async () => {
  //   try {
  //     // Retrieve the previously stored user data from AsyncStorage
  //     const userDataJSON = await AsyncStorage.getItem('userData');
  //     const userData = JSON.parse(userDataJSON);

  //     // Check if the entered username and password match any user in the stored data
  //     const {userName, password} = this.state;
  //     const authenticatedUser = userData.find(
  //       user => user.userName === userName && user.password === password,
  //     );

  //     if (authenticatedUser) {
  //       this.setState({isAuthenticated: true});
  //       this.props.navigation.navigate('HomeScreen', {
  //         userName: authenticatedUser.userName,
  //       });
  //     } else {
  //       alert('Authentication failed. Please check your credentials.');
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //   }
  // };

  handleLogin = async () => {
    const {userName, password} = this.state;

    try {
      const existingData = await AsyncStorage.getItem('userData');
      if (existingData) {
        const users = JSON.parse(existingData);

        // Use a loop or the find function to check for a matching user
        let authenticatedUser = null;
        for (const user of users) {
          if (user.userName === userName && user.password === password) {
            authenticatedUser = user;
            break;
          }
        }

        if (authenticatedUser) {
          // Authentication successful
          this.props.navigation.navigate('HomeScreen');
        } else {
          console.error(
            'Authentication failed. Incorrect username or password.',
          );
        }
      } else {
        console.error('User data not found.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  render() {
    const {userName, password} = this.state;

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
                secureTextEntry={true}
              />
              <Image
                style={styles.icon}
                source={require('./../assets/images/hide.png')}
              />
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
