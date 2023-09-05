import React, {Component} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/Buttons/CustomButton';
import BottomDesign from '../components/BottomDesign/BottomDesign';

class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      designation: '',
      company: '',
      address: '',
      location: '',
    };
  }

  handleUserDetails() {
    // Fetch existing user data from AsyncStorage and set it in the state
    this.fetchUserDetails();
  }

  fetchUserDetails = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        this.setState({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          designation: userData.designation || '',
          company: userData.company || '',
          address: userData.address || '',
          location: userData.location || '',
        });
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  handleSubmit = async () => {
    const {firstName, lastName, designation, company, address, location} =
      this.state;
    const userData = {
      firstName,
      lastName,
      designation,
      company,
      address,
      location,
    };

    try {
      // Fetch the existing user data from AsyncStorage
      const storedDetails = await AsyncStorage.getItem('userData');
      if (storedDetails) {
        // Parse the existing data
        const existingData = JSON.parse(storedDetails);

        // Merge the input data with the existing user data
        const mergeUserData = {
          ...existingData,
          ...userData,
        };

        // Save the merged data back to AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(mergeUserData));
        console.log(mergeUserData);
        console.log('User details merged and saved successfully.');
      } else {
        // If there is no existing user data, set the input data as the user data
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        console.log('User details saved successfully.');
      }

      // Clear the form fields
      this.setState({
        firstName: '',
        lastName: '',
        designation: '',
        company: '',
        address: '',
        location: '',
      });

      // Navigate to the HomeScreen
      this.props.navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };
  componentDidMount() {
    // Fetch and display existing user details when the component mounts
    this.handleUserDetails();
  }
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.head}>
              <Text style={styles.header}>USER DETAILS</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>First name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor="gray"
                value={this.state.firstName}
                onChangeText={text => this.setState({firstName: text})}
              />
              <Text style={styles.title}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your user name"
                placeholderTextColor="gray"
                value={this.state.lastName}
                onChangeText={text => this.setState({lastName: text})}
              />
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
                  source={require('./../assets/images/location.png')}
                />
              </View>
              <View style={styles.btnView}>
                <CustomButton
                  signUpButton
                  label="SUBMIT"
                  handlePress={this.handleSubmit}
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

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    position: 'relative',
  },
  // Header logo
  head: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    width: 160,
    marginTop: 30,
    marginBottom: 50,
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  // details field
  details: {
    marginLeft: 30,
    justifyContent: 'center',
    marginBottom: 30,
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
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingRight: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    position: 'relative',
    color: 'black',
  },
  location: {
    flexDirection: 'row',
  },
  icon: {
    height: 15,
    width: 15,
    marginRight: 50,
    right: '0%',
    position: 'absolute',
    marginVertical: 13,
  },
  // button field
  btnView: {
    marginTop: 30,
    marginBottom: 80,
    paddingRight: 25,
  },
  bottom: {
    bottom: 0,
    width: '100%',
    height: 100,
    position: 'absolute',
  },
});

export default DetailsScreen;
