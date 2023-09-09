import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomDesign from '../components/BottomDesign/BottomDesign';
import CustomButton from '../components/Buttons/CustomButton';

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
    // Retrieve the userName parameter from navigation props
    const {route} = this.props;
    const {userName, userDetails} = route.params;
    // Set the state with usersData
    this.setState({userDetails});
    // Fetch user data and filter based on the userName
    this.fetchUserDetails(userName);
  }

  fetchUserDetails = async userName => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);

        // Filter user data based on userName
        const userDetails = userData.find(user => user.userName === userName);

        if (userDetails) {
          // this.setState({userDetails: userDetails});
          this.setState({userDetails});
        } else {
          console.error('User not found');
        }
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

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
            <Text style={styles.text}>First Name: {userDetails.firstName}</Text>
            <Text style={styles.text}>Last Name: {userDetails.lastName}</Text>
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
        <View style={styles.bottom}>
          <BottomDesign />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 25,
    top: 10,
    color: 'black',
  },
  userCard: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 15,
    margin: 20,
    width: '90%',
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginBottom: 15,
  },
  bottom: {
    bottom: 0,
    width: '100%',
    height: 100,
    position: 'absolute',
  },
  button: {
    width: '60%',
    margin: 20,
  },
});

export default ProfileScreen;
