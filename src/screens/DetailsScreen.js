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

  // validateForm = () => {
  //   const firstNameRegex = /^[A-Za-z]+$/;
  //   if (!this.state.firstname.match(firstNameRegex)) {
  //     this.setState({error: 'Username should consist only of alphabets'});
  //     return false;
  //   }
  //   const lastNameRegex = /^[A-Za-z]+$/;
  //   if (!this.state.lastName.match(firstNameRegex)) {
  //     this.setState({error: 'Username should consist only of alphabets'});
  //     return false;
  //   }

  //   // Validation for email (contains @gmail.com)
  //   if (!this.state.email.toLowerCase().includes('@gmail.com')) {
  //     this.setState({error: 'Email should contain @gmail.com'});
  //     return false;
  //   }

  //   // Validation for mobile number (contains only numbers)
  //   const mobileNumberRegex = /^[0-9]+$/;
  //   if (!this.state.mobileNumber.match(mobileNumberRegex)) {
  //     this.setState({error: 'Mobile number should contain numbers only'});
  //     return false;
  //   }

  //   // Validation for password (8 characters, mixed with numbers and alphabets)
  //   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  //   if (!this.state.password.match(passwordRegex)) {
  //     this.setState({
  //       error: 'Password must be 8 characters with letters and numbers',
  //     });
  //     return false;
  //   }

  //   // Validation for password match
  //   if (this.state.password !== this.state.confirmPassword) {
  //     this.setState({error: 'Passwords do not match'});
  //     return false;
  //   }

  //   return true;
  // };

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
        // Save the user details to AsyncStorage
        console.log(userData);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        this.props.navigation.navigate('HomeScreen');

        // Clear the form fields
        this.setState({
          firstName: '',
          lastName: '',
          designation: '',
          company: '',
          address: '',
          location: '',
        });

        console.log('User details saved successfully.');
      } catch (error) {
        console.error('Error saving user details:', error);
      
    }
  };

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
