import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: null,
    };
  }

  componentDidMount() {
    this.fetchUserDetails();
  }

  fetchUserDetails = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        this.setState({ userDetails: userData });
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  render() {
    const { userDetails } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>User Details</Text>
        {userDetails ? (
          <View style={styles.userCard}>
            <Text style={styles.text}>User Name: {userDetails.userName}</Text>
            <Text style={styles.text}>Email: {userDetails.email}</Text>
            <Text style={styles.text}>Password: {userDetails.password}</Text>
            <Text style={styles.text}>Mobile Number: {userDetails.mobileNumber}</Text>
            <Text style={styles.text}>First Name: {userDetails.firstName}</Text>
            <Text style={styles.text}>Last Name: {userDetails.lastName}</Text>
            <Text style={styles.text}>Designation: {userDetails.designation}</Text>
            <Text style={styles.text}>Company: {userDetails.company}</Text>
            <Text style={styles.text}>Address: {userDetails.address}</Text>
            <Text style={styles.text}>Location: {userDetails.location}</Text>
          </View>
        ) : (
          <Text>Loading user details...</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  userCard: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});

export default ProfileScreen;
