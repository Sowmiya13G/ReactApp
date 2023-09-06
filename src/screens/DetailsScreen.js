import React, {Component} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/Buttons/CustomButton';
import BottomDesign from '../components/BottomDesign/BottomDesign';

class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      mobileNumber: '',
      designation: '',
      company: '',
      address: '',
      location: '',
    };
  }

  componentDidMount() {
    // Fetch existing user data from AsyncStorage and set it in the state
    const {route} = this.props;
    const {username, email, mobileNumber} = route.params;

    this.setState({
      username,
      email,
      mobileNumber,
    });
  }
  handleSaveDetails = async () => {
    const {
      username,
      email,
      mobileNumber,
      designation,
      company,
      address,
      location,
    } = this.state;

    // Create a user details object
    const userDetails = {
      username,
      email,
      mobileNumber,
      designation,
      company,
      address,
      location,
    };

    try {
      // Fetch existing user details from AsyncStorage
      const existingUserDetails = await AsyncStorage.getItem('userDetails');
      let updatedUserDetails = [];

      if (existingUserDetails) {
        updatedUserDetails = JSON.parse(existingUserDetails);
      }
      await AsyncStorage.setItem(
        'userDetails',
        JSON.stringify(updatedUserDetails),
      );

      // Merge the new user details with existing details
      updatedUserDetails.push(userDetails);

      // Save the updated user details back to AsyncStorage
      await AsyncStorage.setItem(
        'userDetails',
        JSON.stringify(updatedUserDetails),
      );

      Alert.alert('Details saved successfully');
      this.props.navigation.navigate('HomeScreen', {
        email: this.state.email, // Pass the user's email
      });

      // Optionally, you can clear the form fields here
      this.setState({
        designation: '',
        company: '',
        address: '',
        location: '',
      });
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  componentDidMount() {
    // Fetch user details from the navigation params (passed from SignUpScreen)
    const {route} = this.props;
    const {username, email, mobileNumber} = route.params;

    this.setState({
      username,
      email,
      mobileNumber,
    });
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
              <Text style={styles.title}>Email ID</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email id"
                placeholderTextColor="gray"
                value={this.state.email}
                onChangeText={text => this.setState({email: text})}
              />

              <Text style={styles.title}>User Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your user name"
                placeholderTextColor="gray"
                value={this.state.userName}
                onChangeText={text => this.setState({userName: text})}
              />

              <Text style={styles.title}>Mobile Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your mobile number"
                placeholderTextColor="gray"
                value={this.state.mobileNumber}
                onChangeText={text => this.setState({mobileNumber: text})}
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
