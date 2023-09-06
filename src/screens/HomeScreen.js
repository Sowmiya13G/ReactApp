import React, {Component} from 'react';
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native';
import CustomButton from '../components/Buttons/CustomButton';
import BottomDesign from '../components/BottomDesign/BottomDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: [],
    };
  }
  componentDidMount() {
    // Fetch user details from AsyncStorage
    this.fetchUserDetails();
  }

  fetchUserDetails = async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');

      if (userDetails) {
        const parsedUserDetails = JSON.parse(userDetails);

        // Get the email parameter passed from DetailsScreen
        const {route} = this.props;
        const {params} = route;
        const email = params ? params.email : null;

        if (email) {
          const currentUserDetails = parsedUserDetails.filter(
            user => user.email === email,
          );

          this.setState({userDetails: currentUserDetails});
        }
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  goToLogOut = () => {
    this.props.navigation.navigate('WelcomeScreen');
  };

  goToProfile = () => {
    this.props.navigation.navigate('ProfileScreen', {
      userDetails: this.state.userDetails, // Pass user details
    });
  };
  render() {
    const {userDetails} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Image
            source={require('./../assets/images/user.png')}
            style={styles.logo}
          />
          <TouchableOpacity style={styles.text} onPress={this.goToProfile}>
            <Text style={styles.text}>Profile</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Hello User</Text>
        <Text style={styles.text}>
          {userDetails.length > 0 ? userDetails[0].userName : ''}
        </Text>
        <View style={styles.button}>
          <CustomButton
            logInButton
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
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    // position: 'relative'
  },
  logo: {
    height: 30,
    width: 30,
  },
  profile: {
    top: 20,
    right: 30,
    position: 'absolute',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  title: {
    fontSize: 40,
    color: 'black',
    marginBottom: 15,
  },
  button: {
    paddingTop: 20,
    // paddingLeft: 25,
    // paddingRight: 25,
  },
  bottom: {
    bottom: 0,
    width: '100%',
    height: 100,
    position: 'absolute',
  },
});

export default HomeScreen;

// fetchUserDetails = async () => {
//   try {
//     const userDataJSON = await AsyncStorage.getItem('userData');
//     if (userDataJSON) {
//       const userData = JSON.parse(userDataJSON);
//       this.setState({userDetails: userData});
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
