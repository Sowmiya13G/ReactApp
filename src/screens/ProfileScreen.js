import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomDesign from '../components/BottomDesign/BottomDesign';
class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: [],
    };
  }
  componentDidMount() {
    // const {route} = this.props;
    // const {userDetails} = route.params;
    // this.setState({userDetails});

    const {route} = this.props;
    const {params} = route;

    if (params && params.userDetails) {
      this.setState({userDetails: params.userDetails});
    }
  }
  fetchUserDetails = async () => {
    try {
      console.log('Fetching user details...');
      const userDetails = await AsyncStorage.getItem('userDetails');

      if (userDetails) {
        const parsedUserDetails = JSON.parse(userDetails);

        // Get the email parameter passed from DetailsScreen
        const {route} = this.props;
        const {email} = route.params;
        console.log('Email parameter:', email);

        // Filter the user details based on the email
        const currentUserDetails = parsedUserDetails.filter(
          userDetails => userDetails.email === email,
        );

        console.log('Current user details:', currentUserDetails);

        this.setState({userDetails: currentUserDetails});
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  render() {
    // const {route} = this.props;
    // const {userDetails} = route.params;

    const {userDetails} = this.state;
    // Use userDetails to display user information

    return (
      <View style={styles.container}>
        <Text style={styles.header}>User Details</Text>
        {Array.isArray(userDetails) && userDetails.length > 0 ? (
          userDetails.map((user, index) => (
            <View key={index} style={styles.userCard}>
              <Text style={styles.text}>User Name: {user.userName}</Text>
              <Text style={styles.text}>Email: {user.email}</Text>
              <Text style={styles.text}>
                Mobile Number: {user.mobileNumber}
              </Text>
              <Text style={styles.text}>Designation: {user.designation}</Text>
              <Text style={styles.text}>Company: {user.company}</Text>
              <Text style={styles.text}>Address: {user.address}</Text>
              <Text style={styles.text}>Location: {user.location}</Text>
            </View>
          ))
        ) : (
          <Text>Loading user details...</Text>
        )}
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
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    margin: 15,
  },
  userCard: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    margin: 15,
    padding: 10,
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginBottom: 15,
    padding: 10,
  },
  bottom: {
    bottom: 0,
    width: '100%',
    height: 100,
    position: 'absolute',
  },
});

export default ProfileScreen;

// fetchUserDetails = async () => {
//   try {
//     const userDetails = await AsyncStorage.getItem('userDetails');

//     if (userDetails) {
//       const parsedUserDetails = JSON.parse(userDetails);

//       // Get the email parameter passed from DetailsScreen
//       const {route} = this.props;
//       const {email} = route.params;

//       // Filter the user details based on the email
//       const currentUserDetails = parsedUserDetails.filter(
//         user => user.email === email,
//       );

//       this.setState({userDetails: currentUserDetails});
//     }
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//   }
// };

// componentDidMount() {
//   // Fetch and display user data based on the userKey
//   this.fetchUserData();
// }

// fetchUserData = async () => {
//   try {
//     const userDetails = await AsyncStorage.getItem('userDetails');

//     if (userDetails) {
//       this.setState({userDetails: JSON.parse(userDetails)});
//     }
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//   }
// };
