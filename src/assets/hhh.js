// import React, { Component } from 'react';
// import {
//   SafeAreaView,
//   Image,
//   Text,
//   View,
//   StyleSheet,
//   TextInput,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { withNavigation } from 'react-navigation'; // Import withNavigation
// import CustomButton from '../components/Buttons/CustomButton';
// import BottomDesign from '../components/BottomDesign/BottomDesign';

// class LogInScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       userName: '',
//       password: '',
//     };
//   }

//   goToSignUp = () => {
//     this.props.navigation.navigate('SignUpScreen');
//   };

//   handleLogin = async () => {
//     await this.authenticateUser();
//   };

//   authenticateUser = async () => {
//     console.log('Entering authenticateUser function');
//     console.log('userName:', this.state.userName);
//     console.log('password:', this.state.password);

//     try {
//       const userData = await AsyncStorage.getItem('userData');
//       this.props.navigation.navigate('HomeScreen');
//       console.log('userData:', userData);

//       // ...rest of the code...
//     } catch (error) {
//       console.error('Error authenticating user: ', error);
//     }
//   };

//   render() {
//     const { userName, password } = this.state;

//     return (
//       <SafeAreaView>
//         <View style={styles.container}>
//           <View style={styles.head}>
//             <Image
//               source={require('./../assets/images/login.jpg')}
//               style={styles.logo}
//             />
//             <Text style={styles.logIn}>LOG IN</Text>
//           </View>
//           <View style={styles.details}>
//             <Text style={styles.title}>Username</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your username"
//               placeholderTextColor="grey"
//               value={userName}
//               onChangeText={(text) => this.setState({ userName: text })}
//             />
//             <Text style={styles.title}>Password</Text>
//             <View style={styles.password}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your password"
//                 placeholderTextColor="grey"
//                 value={password}
//                 onChangeText={(text) => this.setState({ password: text })}
//               />
//               <Image
//                 style={styles.icon}
//                 source={require('./../assets/images/hide.png')}
//               />
//             </View>
//           </View>
//           <View style={styles.forgot}>
//             <Text style={styles.forgotText}>Forgot password?</Text>
//           </View>
//           <View style={styles.buttonView}>
//             <CustomButton
//               logInButton
//               label="LOGIN"
//               handlePress={this.authenticateUser}
//             />
//             <CustomButton
//               signUpButton
//               label="SIGN UP"
//               handlePress={this.goToSignUp}
//             />
//           </View>
//           <View style={styles.bottom}>
//             <BottomDesign />
//           </View>
//         </View>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     backgroundColor: '#fff',
//     position: 'relative',
//   },
//   head: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//     marginBottom: 50,
//     height: 160,
//     width: 160,
//   },
//   logIn: {
//     fontSize: 40,
//     marginBottom: 20,
//     color: '#000000',
//     fontWeight: 'bold',
//   },
//   details: {
//     marginLeft: 30,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 15,
//     marginBottom: 15,
//     left: 0,
//     color: '#000000',
//   },
//   input: {
//     width: '90%',
//     height: 40,
//     color: '#000000',
//     borderWidth: 1,
//     borderColor: '#000000',
//     backgroundColor: '#fff',
//     marginBottom: 10,
//     paddingRight: 10,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//   },
//   password: {
//     flexDirection: 'row',
//   },
//   icon: {
//     height: 15,
//     width: 15,
//     marginRight: 50,
//     right: '0%',
//     position: 'absolute',
//     marginVertical: 13,
//   },
//   forgot: {
//     alignItems: 'flex-end',
//     right: 30,
//     marginBottom: 30,
//   },
//   forgotText: {
//     color: '#000000',
//   },
//   buttonView: {
//     bottom: 0,
//     paddingLeft: 25,
//     paddingRight: 25,
//   },
//   bottom: {
//     bottom: 0,
//     width: '100%',
//     height: 100,
//   },
// });

// export default withNavigation(LogInScreen); // Wrap your component with withNavigation



import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  AsyncStorage,
  Alert,
} from 'react-native';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
    };
  }

  handleSignUp = async () => {
    const { username, email, phoneNumber, password } = this.state;

    // Check if any of the fields are empty
    if (!username || !email || !phoneNumber || !password) {
      Alert.alert('All fields are required');
      return;
    }

    // Validate email format
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailPattern.test(email)) {
      Alert.alert('Invalid email address');
      return;
    }

    // Validate phone number format (You can add more specific validation if needed)
    if (!/^\d{10}$/.test(phoneNumber)) {
      Alert.alert('Invalid phone number');
      return;
    }

    // Validate password length (You can add more complex rules)
    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters long');
      return;
    }

    // Create a user object with the details
    const userData = {
      username,
      email,
      phoneNumber,
      password,
    };

    try {
      // Save the user details to AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      Alert.alert('Sign up successful');

      // Clear the form fields
      this.setState({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
      });

      // Navigate to the login screen or perform any other action
      // you want after successful signup.
      this.props.navigation.navigate('Login'); // Assuming you have a 'Login' screen.
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => this.setState({ username: text })}
          value={this.state.username}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={(text) => this.setState({ phoneNumber: text })}
          value={this.state.phoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

export default SignUpScreen;
