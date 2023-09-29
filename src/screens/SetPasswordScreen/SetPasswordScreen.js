import React, {Component} from 'react';
import {Text, View, Image, TextInput, SafeAreaView} from 'react-native';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import screen components in navigation container
import CustomButton from '../../components/Buttons/CustomButton';
import BottomDesign from '../../components/BottomDesign/BottomDesign';
import {handlePasswordUpdate} from '../../asyncService/handlePasswordUpdate';
import {validateNewPassword} from '../../utils/Validaion';
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

  handlePasswordUpdate = async () => {
    const {userName, newPassword, confirmPassword} = this.state;
    const {isValid, errors} = validateNewPassword({
      newPassword,
      confirmPassword,
    });
    if (isValid) {
      const {success, error} = await handlePasswordUpdate({
        userName,
        newPassword,
        confirmPassword,
      });
      if (success) {
        // Password update was successful
        // Navigate to the desired screen
        this.props.navigation.navigate('LogInScreen');
      } else {
        // Handle the error as needed
        this.setState({error});
      }
    } else {
      // Handle validation errors
      this.setState(errors);
    }
  };

  render() {
    const {newPassword, confirmPassword, error} = this.state;

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
            {error ? <Text style={styles.error}>{error}</Text> : null}
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
