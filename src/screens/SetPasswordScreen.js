import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TextInput, SafeAreaView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import screen components in navigation container
import CustomButton from '../components/Buttons/CustomButton';
import BottomDesign from '../components/BottomDesign/BottomDesign';

class SetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      newPassword: '',
      confirmPassword: '',
      error: '',
    };
  }
  validateInputs = () => {
    let isValid = true;
    this.setState({ error: '' });

    const { newPassword, confirmPassword } = this.state;

    // Validation for password (8 characters, mixed with numbers and alphabets)
    const newPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!newPassword.match(newPasswordRegex)) {
      this.setState({
        error: 'Your password must be 8 characters with letters and numbers',
      });
      isValid = false;
    }

    // Validation for password match
    if (newPassword !== confirmPassword) {
      this.setState({ error: 'Passwords do not match' });
      isValid = false;
    }

    return isValid;
  };
  handlePassword = async () => {
    const { newPassword, username } = this.state;
    // if (this.validateInputs()) {
      try {
        const userDataJSON = await AsyncStorage.getItem('userData');
        if (userDataJSON) {
          const userData = JSON.parse(userDataJSON);
          // Find the user by username
          if (userData.userName === username) {
            userData.password = newPassword;
            await AsyncStorage.setItem('userData', JSON.stringify(userData));

            this.setState({
              userName: '',
              newPassword: '',
              confirmPassword: '',
              error: ''
            });

            this.props.navigation.navigate('LogInScreen');

            console.log('Password updated successfully.');
          } else {
            this.setState({ error: 'User not found. Please enter a valid username.' });
          }
        } else {
          console.error('User data not found.');
        }
      } catch (error) {
        console.error('Error updating password:', error);
      }
    // }
  };
  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.head}>
            <Image
              source={require('./../assets/images/password.jpg')}
              style={styles.logo}
            />
            <Text style={styles.header}>SET NEW PASSWORD</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor="grey"
              value={this.state.username}
              onChangeText={(text) => this.setState({ username: text })}
            />
            <Text style={styles.title}>NEW PASSWORD</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your new password"
              placeholderTextColor="grey"
              value={this.state.newPassword}
              onChangeText={(text) => this.setState({ newPassword: text })}
            />
            <Text style={styles.title}>CONFIRM PASSWORD</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="grey"
              value={this.state.confirmPassword}
              onChangeText={(text) => this.setState({ confirmPassword: text })}
            />
            {/* <Text style={styles.error}>{error}</Text> */}
          </View>
          <View style={styles.buttonView}>
            <CustomButton
              logInButton
              label="LOGIN"
              handlePress={() => this.handlePassword()}
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

export default SetPasswordScreen;
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
    header: {
      fontSize: 30,
      marginBottom: 20,
      color: '#000000',
      fontWeight: 'bold',
    },
    logo: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 50,
      height: 160,
      width: 160,
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
    buttonView: {
      bottom: 0,
      paddingLeft: 25,
      paddingRight: 25,
      marginBottom: 30,
      marginTop: 30,
    },
    bottom: {
      bottom: 0,
      width: '100%',
      height: 100,
      marginTop: 30,
    },
  })