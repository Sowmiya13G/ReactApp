import React, {Component} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import CustomButton from '../../components/Buttons/CustomButton';
import BottomDesign from '../../components/BottomDesign/BottomDesign';
import {
  validateEmail,
  validateUserName,
  validateMobileNumber,
  validatePassword,
  validatePasswordMatch,
} from '../../utils/Validaion';
import {saveUserDetails} from '../../asyncService/SaveUserDetails';
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
      email: validateEmail(email),
      userName: validateUserName(userName),
      mobileNumber: validateMobileNumber(mobileNumber),
      password: validatePassword(password),
      confirmPassword: validatePasswordMatch(password, confirmPassword),
    };
    this.setState({errors}); // Set the errors state
    return Object.values(errors).every(error => error === ''); // Check if there are any errors
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
      const saved = await saveUserDetails(userData);
      if (saved) {
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
          usersData: saved,
        });
        this.props.navigation.navigate('DetailsScreen', {
          userName,
          email,
          mobileNumber,
        });
      }
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
                  // if (this.validateForm())
                  {
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
