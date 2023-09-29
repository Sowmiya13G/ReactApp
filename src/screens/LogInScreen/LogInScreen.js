import React, {Component} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/Buttons/CustomButton';
import BottomDesign from '../../components/BottomDesign/BottomDesign';
import {authentication} from '../../asyncService/authentication';
class LogInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      showPassword: false,
    };
  }
  newPassword = () => {
    this.props.navigation.navigate('SetPasswordScreen', {
      userName: this.state.userName, // Pass the userName as a parameter
    });
  };
  goToSignUp = () => {
    this.props.navigation.navigate('SignUpScreen');
  };

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  };
  handleLogin = async () => {
    const {userName, password} = this.state;

    const {success, user, error} = await authentication(userName, password);

    if (success) {
      this.props.navigation.navigate('HomeScreen', {
        userName: user.userName,
      });
    } else {
      // Handle the error as needed
      this.setState({error});
    }
  };

  render() {
    const {userName, password} = this.state;
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.head}>
            <Image
              source={require('../../assets/images/login.jpg')}
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
                secureTextEntry={this.state.showPassword}
              />
              <TouchableOpacity
                style={styles.icon}
                onPress={this.handlePasswordVisibility}>
                <Icon
                  name={
                    this.state.showPassword ? 'visibility' : 'visibility_off'
                  }
                  size={20}
                  color="grey"
                />
              </TouchableOpacity>
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

export default LogInScreen;
