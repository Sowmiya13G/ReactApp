import React, {Component} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../../components/Buttons/CustomButton';
import BottomDesign from '../../components/BottomDesign/BottomDesign';

class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.route.params.userName,
      email: this.props.route.params.email,
      mobileNumber: this.props.route.params.mobileNumber,
      // firstName: '',
      // lastName: '',
      designation: '',
      company: '',
      address: '',
      location: '',
    };
  }

  componentDidMount() {
    const {userName, email, mobileNumber} = this.props.route.params;
    this.setState({userName, email, mobileNumber});
    this.fetchUserDetails();
  }
  fetchUserDetails = async () => {
    try {
      // Retrieve the userName parameter from navigation props
      const {route} = this.props;
      const {userName} = route.params;

      // Fetch user data from AsyncStorage
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);

        // Find the user based on the userName
        const userDetails = userData.find(user => user.userName === userName);

        if (userDetails) {
          this.setState({userDetails});
        } else {
          console.error('User not found');
        }
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  handleSaveDetails = async () => {
    const {userName} = this.props.route.params;
    const {
      newDetails,
      // firstName,
      // lastName,
      designation,
      company,
      address,
      location,
    } = this.state;

    try {
      // Fetch existing user details from AsyncStorage
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);

        // Find the user based on the userName
        const userIndex = userData.findIndex(
          user => user.userName === userName,
        );

        if (userIndex !== -1) {
          // Merge new details with existing details
          const updatedUser = {
            ...userData[userIndex],
            // firstName,
            // lastName,
            designation,
            company,
            address,
            location,
            ...newDetails, // Add other new details here if needed
          };

          userData[userIndex] = updatedUser;

          // Save the updated user data back to AsyncStorage
          await AsyncStorage.setItem('userData', JSON.stringify(userData));
          console.log(userData);
          Alert.alert('Details saved successfully');
          // userName: this.state.userName;
          this.props.navigation.navigate('HomeScreen', {
            email: this.state.email, // Pass the user's email
            userName,
          });
          // Update the state with the new details
          this.setState({
            userDetails: updatedUser,
            newDetails: {},
            // firstName: '',
            // lastName: '',
            designation: '',
            company: '',
            address: '',
            location: '',
          });
        } else {
          console.error('User not found');
        }
      }
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  render() {
    const {userName, email, mobileNumber} = this.state;
    const {userDetails, newDetails} = this.state;
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.head}>
              <Text style={styles.header}>USER DETAILS</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>Email ID</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email id"
                placeholderTextColor="gray"
                keyboardType="email-address"
                value={email}
                onChangeText={text => this.setState({email: text})}
              />

              <Text style={styles.title}>User Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your user name"
                placeholderTextColor="gray"
                value={userName}
                onChangeText={text => this.setState({userName: text})}
              />

              <Text style={styles.title}>Mobile Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your mobile number"
                placeholderTextColor="gray"
                keyboardType="numeric"
                value={mobileNumber}
                onChangeText={text => this.setState({mobileNumber: text})}
              />
              {/* <Text style={styles.title}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your designation"
                placeholderTextColor="gray"
                value={this.state.firstName}
                onChangeText={text => this.setState({firstName: text})}
              />
              <Text style={styles.title}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your designation"
                placeholderTextColor="gray"
                value={this.state.lastName}
                onChangeText={text => this.setState({lastName: text})}
              /> */}
              <Text style={styles.title}>Designation</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your designation"
                placeholderTextColor="gray"
                value={this.state.designation}
                onChangeText={text => this.setState({designation: text})}
              />
              <Text style={styles.title}>Company Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your company"
                placeholderTextColor="gray"
                value={this.state.company}
                onChangeText={text => this.setState({company: text})}
              />
              <Text style={styles.title}>Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your city name"
                placeholderTextColor="gray"
                value={this.state.address}
                onChangeText={text => this.setState({address: text})}
              />
              <Text style={styles.title}>Location</Text>
              <View style={styles.location}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your city name"
                  placeholderTextColor="gray"
                  value={this.state.location}
                  onChangeText={text => this.setState({location: text})}
                />
                <Image
                  style={styles.icon}
                  source={require('../../assets/images/location.png')}
                />
              </View>
              <View style={styles.btnView}>
                <CustomButton
                  signUpButton
                  label="SUBMIT"
                  handlePress={this.handleSaveDetails}
                />
              </View>
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

export default DetailsScreen;
