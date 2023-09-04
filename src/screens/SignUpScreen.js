import React, {Component} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert
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
      error: '',
    };
  }

  // validateForm = () => {
  //   // Validation for username (only alphabets)
  //   const userNameRegex = /^[A-Za-z]+$/;
  //   if (!userName.match(userNameRegex)) {
  //     this.setState({ error: 'Username should consist only of alphabets' });
  //     return false;
  //   }

  //   // Validation for email (contains @gmail.com)
  //   if (!email.toLowerCase().includes('@gmail.com')) {
  //     this.setState({ error: 'Email should contain @gmail.com' });
  //     return false;
  //   }

  //   // Validation for mobile number (contains only numbers)
  //   const mobileNumberRegex = /^[0-9]+$/;
  //   if (!mobileNumber.match(mobileNumberRegex)) {
  //     this.setState({ error: 'Mobile number should contain numbers only' });
  //     return false;
  //   }

  //   // Validation for password (8 characters, mixed with numbers and alphabets)
  //   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  //   if (!password.match(passwordRegex)) {
  //     this.setState({
  //       error: 'Password must be 8 characters with letters and numbers',
  //     });
  //     return false;
  //   }

  //   // Validation for password match
  //   if (password !== confirmPassword) {
  //     this.setState({ error: 'Passwords do not match' });
  //     return false;
  //   }

  //   return true;
  // };
  
  handleSignUp = async () => {
    const { email, userName, mobileNumber, password, confirmPassword } = this.state;
      // Create a user object with the details
      const userData = {
        email,
        userName,
        mobileNumber,
        password,
        confirmPassword
      };
  
      try {
        // Save the user details to AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        console.log(userData)
        Alert.alert('Sign up successful');
        // Clear the form fields
        this.setState({
          email: '',
          userName: '',
          mobileNumber: '',
          password: '',
          confirmPassword: '',
          error: '', // Clear any previous error message
        });
        this.props.navigation.navigate('DetailsScreen');
        console.log('User details saved successfully.');
      } catch (error) {
        console.error('Error saving user details:', error);
      }
  };
  render() {
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
              <Text style={styles.title}>User Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your user name"
                placeholderTextColor="gray"
                value={this.state.userName}
                onChangeText={text => this.setState({userName: text})}
              />
              <Text style={styles.title}>Mobile Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your mobile number"
                placeholderTextColor="gray"
                value={this.state.mobileNumber}
                onChangeText={text => this.setState({mobileNumber: text})}
              />
              <Text style={styles.title}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor="gray"
                value={this.state.password}
                onChangeText={text => this.setState({password: text})}
              />
              <Text style={styles.title}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="confirm your password"
                placeholderTextColor="gray"
                value={this.state.confirmPassword}
                onChangeText={text => this.setState({confirmPassword: text})}
              />
            </View>
            <View style={styles.btnView}>
              <CustomButton
                signUpButton
                label="SIGN UP"
                handlePress={() => {this.handleSignUp()}}
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
});

export default SignUpScreen;



