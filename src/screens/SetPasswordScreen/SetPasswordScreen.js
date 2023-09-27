import React, {Component} from 'react';
import {Text, View, Image, TextInput, SafeAreaView} from 'react-native';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import screen components in navigation container
import CustomButton from '../../components/Buttons/CustomButton';
import BottomDesign from '../../components/BottomDesign/BottomDesign';

class SetPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.route.params.userName,
      newPassword: '',
      confirmPassword: '',
      error: '',
    };
  }
  componentDidMount() {
    const {route} = this.props;
    const {userName} = route.params;

    // Set the userName from the navigation parameter
    this.setState({userName});
  }
  validateInputs = () => {
    let isValid = true;
    this.setState({error: ''});

    const {newPassword, confirmPassword} = this.state;

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
      this.setState({error: 'Passwords do not match'});
      isValid = false;
    }

    return isValid;
  };
  handlePasswordUpdate = async () => {
    const {userName, newPassword, confirmPassword} = this.state;

    // Add validation logic for password and confirmPassword as needed
    if (newPassword === confirmPassword) {
      try {
        const userDataJSON = await AsyncStorage.getItem('userData');

        if (userDataJSON) {
          const userData = JSON.parse(userDataJSON);

          // Find the user by username
          const updatedUserData = userData.map(user => {
            if (user.userName === userName) {
              return {...user, password: newPassword};
            }
            return user;
          });

          await AsyncStorage.setItem(
            'userData',
            JSON.stringify(updatedUserData),
          );

          // Navigate to LogInScreen
          this.props.navigation.navigate('LogInScreen');
        } else {
          console.error('User data not found.');
        }
      } catch (error) {
        console.error('Error updating password:', error);
      }
    } else {
      console.error('Passwords do not match.');
    }
  };

  render() {
    const {newPassword, confirmPassword} = this.state;

    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.head}>
            <Image
              source={require('../../assets/images/password.jpg')}
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
              value={this.state.userName}
              onChangeText={text => this.setState({userName: text})}
            />
            <Text style={styles.title}>NEW PASSWORD</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your new password"
              placeholderTextColor="grey"
              value={this.state.newPassword}
              onChangeText={text => this.setState({newPassword: text})}
            />
            <Text style={styles.title}>CONFIRM PASSWORD</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor="grey"
              value={this.state.confirmPassword}
              onChangeText={text => this.setState({confirmPassword: text})}
            />
            {/* <Text style={styles.error}>{error}</Text> */}
          </View>
          <View style={styles.buttonView}>
            <CustomButton
              logInButton
              label="LOGIN"
              handlePress={() => this.handlePasswordUpdate()}
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
