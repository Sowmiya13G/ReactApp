import React, {Component} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
// import packages
import AsyncStorage from '@react-native-async-storage/async-storage';
// import custom components
import CustomButton from '../components/Buttons/CustomButton';
import BottomDesign from '../components/BottomDesign/BottomDesign';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userName: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
      errors: {
        email: '',
        userName: '',
        mobileNumber: '',
        password: '',
        confirmPassword: '',
      },
    };
  }

  validateForm = () => {
    const {email, userName, mobileNumber, password, confirmPassword} =
      this.state;
    const errors = {
      email: '',
      userName: '',
      mobileNumber: '',
      password: '',
      confirmPassword: '',
    };

    // Validation for email
    if (!email.toLowerCase().includes('@gmail.com')) {
      errors.email = 'Email should contain @gmail.com';
    }

    // Validation for username
    const userNameRegex = /^[a-zA-Z0-9]*$/;
    if (!userName.match(userNameRegex)) {
      errors.userName = 'Username should consist only of alphabets';
    }

    // Validation for mobile number
    const mobileNumberRegex = /^[0-9]+$/;
    if (!mobileNumber.match(mobileNumberRegex)) {
      errors.mobileNumber = 'Mobile number should contain numbers only';
    }

    // Validation for password
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password.match(passwordRegex)) {
      errors.password =
        'Password must be 8 characters with letters and numbers';
    }

    // Validation for password match
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Set the errors state
    this.setState({errors});

    // Check if there are any errors
    return Object.values(errors).every(error => error === '');
  };

  handleSignUp = async () => {
    const {email, userName, mobileNumber, password, confirmPassword} =
      this.state;

    // Create a user object with the details
    const userData = {
      email,
      userName,
      mobileNumber,
      password,
      confirmPassword,
    };

    try {
      // Save the user details to AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      console.log(userData);
      Alert.alert('Sign up successful');

      // Clear the form fields and errors
      this.setState({
        email: '',
        userName: '',
        mobileNumber: '',
        password: '',
        confirmPassword: '',
        errors: {
          email: '',
          userName: '',
          mobileNumber: '',
          password: '',
          confirmPassword: '',
        },
      });

      this.props.navigation.navigate('DetailsScreen');
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  render() {
    const {errors} = this.state;

    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.head}>
              <Image
                source={require('./../assets/images/signup.jpg')}
                style={styles.logo}
              />
              <Text style={styles.header}>SIGN UP</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>Email ID</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email id"
                placeholderTextColor="gray"
                value={this.state.email}
                onChangeText={text => this.setState({email: text})}
              />
              <Text style={styles.errorText}>{errors.email}</Text>

              <Text style={styles.title}>User Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your user name"
                placeholderTextColor="gray"
                value={this.state.userName}
                onChangeText={text => this.setState({userName: text})}
              />
              <Text style={styles.errorText}>{errors.userName}</Text>

              <Text style={styles.title}>Mobile Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your mobile number"
                placeholderTextColor="gray"
                value={this.state.mobileNumber}
                onChangeText={text => this.setState({mobileNumber: text})}
              />
              <Text style={styles.errorText}>{errors.mobileNumber}</Text>

              <Text style={styles.title}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="gray"
                value={this.state.password}
                onChangeText={text => this.setState({password: text})}
                secureTextEntry={true}
              />
              <Text style={styles.errorText}>{errors.password}</Text>

              <Text style={styles.title}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                placeholderTextColor="gray"
                value={this.state.confirmPassword}
                onChangeText={text => this.setState({confirmPassword: text})}
                secureTextEntry={true}
              />
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            </View>
            <View style={styles.btnView}>
              <CustomButton
                signUpButton
                label="SIGN UP"
                handlePress={() => {
                  if (this.validateForm()) {
                    this.handleSignUp();
                  }
                }}
              />
            </View>
            <View style={styles.bottom}>
              <BottomDesign />
            </View>
          </View>
        </ScrollView>
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
  // Header logo
  head: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    width: 160,
    marginTop: 30,
    marginBottom: 50,
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  // details feild
  details: {
    marginLeft: 30,
    justifyContent: 'center',
    marginBottom: 30,
  },
  title: {
    // position: 'relative',
    fontSize: 15,
    marginBottom: 15,
    left: 0,
    color: '#000000',
  },
  input: {
    width: '90%',
    height: 40,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingRight: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    position: 'relative',
    color: 'black',
  },
  location: {
    flexDirection: 'row',
  },
  icon: {
    // display: 'flex',
    height: 15,
    width: 15,
    marginRight: 50,
    right: '0%',
    position: 'absolute',
    marginVertical: 13,
  },

  // button feild
  btnView: {
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    // position: 'absolute',
    marginBottom: 100,
    paddingLeft: 25,
    paddingRight: 25,
  },
  bottom: {
    bottom: 0,
    width: '100%',
    height: 100,
    position: 'absolute',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default SignUpScreen;
