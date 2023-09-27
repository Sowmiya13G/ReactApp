import React, {Component} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {styles} from './styles';
// import packages
import AsyncStorage from '@react-native-async-storage/async-storage';
// import custom components
import CustomButton from '../../components/Buttons/CustomButton';
import BottomDesign from '../../components/BottomDesign/BottomDesign';

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
      usersData: [],
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
    const {
      email,
      userName,
      mobileNumber,
      password,
      confirmPassword,
      usersData,
    } = this.state;

    // Create a user object with the details
    const userData = {
      email,
      userName,
      mobileNumber,
      password,
      confirmPassword,
    };

    try {
      const userKey = email.toLowerCase();

      const existingUsersData = await AsyncStorage.getItem('userData');
      let updatedUsersData = [];

      if (existingUsersData) {
        updatedUsersData = JSON.parse(existingUsersData);
      }

      // Check if the user already exists based on the userKey (email)
      const userExists = updatedUsersData.some(
        user => user.email.toLowerCase() === userKey,
      );

      if (userExists) {
        Alert.alert('User already exists');
        return;
      }

      // Add the new user data to the array
      updatedUsersData.push(userData);

      // Save the updated user data to AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUsersData));
      Alert.alert('Sign up successful');
      console.log(userData);

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
        usersData: updatedUsersData, // Update the state with the new user data
      });

      this.props.navigation.navigate('DetailsScreen', {
        userName,
        email,
        mobileNumber,
      });
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
                source={require('../../assets/images/signup.jpg')}
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
                keyboardType="email-address"
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
                keyboardType="numeric"
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

export default SignUpScreen;
