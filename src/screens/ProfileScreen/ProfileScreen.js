import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import CustomButton from '../../components/Buttons/CustomButton';
import {fetchUserData} from '../../asyncService/fetchUserDetails';
class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: null,
    };
  }
  goToLogOut = () => {
    this.props.navigation.navigate('WelcomeScreen');
  };
  componentDidMount() {
    const {route} = this.props;
    const {userName, userDetails} = route.params;
    this.setState({userDetails}); // Set the state with usersData
    // Call the fetchUserDetails function
    fetchUserData(userName)
      .then(userDetails => {
        if (userDetails) {
          this.setState({userDetails});
          console.log(userDetails);
        } else {
          console.error('User not found');
        }
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }

  render() {
    const {userDetails} = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>USER PROFILE</Text>
        {userDetails ? (
          <View style={styles.userCard}>
            <Text style={styles.text}>User Name: {userDetails.userName}</Text>
            <Text style={styles.text}>Email: {userDetails.email}</Text>
            <Text style={styles.text}>Password: {userDetails.password}</Text>
            <Text style={styles.text}>
              Mobile Number: {userDetails.mobileNumber}
            </Text>
            <Text style={styles.text}>
              Designation: {userDetails.designation}
            </Text>
            <Text style={styles.text}>Company: {userDetails.company}</Text>
            <Text style={styles.text}>Address: {userDetails.address}</Text>
            <Text style={styles.text}>Location: {userDetails.location}</Text>
          </View>
        ) : (
          <Text>Loading user details...</Text>
        )}
        <View style={styles.button}>
          <CustomButton
            signUpButton
            label="LOG OUT"
            handlePress={this.goToLogOut}
          />
        </View>
      </View>
    );
  }
}
export default ProfileScreen;
