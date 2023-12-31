import React, {Component} from 'react';
import {
  SafeAreaView,
  Image,
  Text,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import CustomButton from '../../../components/Buttons/CustomButton';
import BottomDesign from '../../../components/BottomDesign/BottomDesign';
import {fetchUserDetails} from '../../../asyncService/fetchUserDetails';
import {handleSaveDetails} from '../../../asyncService/SaveUserDetails';
class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.route.params.userName,
      email: this.props.route.params.email,
      mobileNumber: this.props.route.params.mobileNumber,
      designation: '',
      company: '',
      address: '',
      location: '',
      userDetails: null,
      newDetails: {},
    };
  }

  componentDidMount() {
    const {userName, email, mobileNumber} = this.props.route.params;
    this.setState({userName, email, mobileNumber});
    this.fetchUserDetails(userName);
  }
  fetchUserDetails = async userName => {
    fetchUserDetails(userName, userDetails => {
      this.setState(userDetails);
    });
  };
  handleSaveDetails = async () => {
    const {userName} = this.props.route.params;
    const {newDetails, designation, company, address, location} = this.state;
    handleSaveDetails(
      userName,
      newDetails,
      designation,
      company,
      address,
      location,
      updatedState => {
        this.setState(updatedState);
      },
      this.props.navigation,
    );
  };

  render() {
    const {userName, email, mobileNumber, userDetails, newDetails} = this.state;
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
                  source={require('../../../assets/images/location.png')}
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

// handleSaveDetails = async () => {
//   const {userName} = this.props.route.params;
//   const {newDetails, designation, company, address, location} = this.state;

//   try {
//     // Fetch existing user details from AsyncStorage
//     const userDataJSON = await AsyncStorage.getItem('userData');
//     if (userDataJSON) {
//       const userData = JSON.parse(userDataJSON);

//       // Find the user based on the userName
//       const userIndex = userData.findIndex(
//         user => user.userName === userName,
//       );

//       if (userIndex !== -1) {
//         // Merge new details with existing details
//         const updatedUser = {
//           ...userData[userIndex],
//           designation,
//           company,
//           address,
//           location,
//           ...newDetails, // Add other new details here if needed
//         };

//         userData[userIndex] = updatedUser;

//         // Save the updated user data back to AsyncStorage
//         await AsyncStorage.setItem('userData', JSON.stringify(userData));
//         console.log(userData);
//         Alert.alert('Details saved successfully');
//         // userName: this.state.userName;
//         this.props.navigation.navigate('HomeScreen', {
//           email: this.state.email, // Pass the user's email
//           userName,
//         });
//         // Update the state with the new details
//         this.setState({
//           userDetails: updatedUser,
//           newDetails: {},
//           designation: '',
//           company: '',
//           address: '',
//           location: '',
//         });
//       } else {
//         console.error('User not found');
//       }
//     }
//   } catch (error) {
//     console.error('Error saving user details:', error);
//   }
// };
