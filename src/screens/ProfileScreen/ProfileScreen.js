import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomButton from '../../components/Buttons/CustomButton';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: null,
      userImage: null,
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

  handleImageLibraryCallback = response => {
    if (response.didCancel) {
      console.log('User cancelled image library');
    } else if (response.error) {
      console.log('ImagePicker Error (Library): ', response.error);
    } else {
      const imageUri = response.uri;
      this.setState({userImage: imageUri}, () => {
        // Handle the selected image URI here
        this.updateUserImageInAsyncStorage(imageUri);
      });
    }
  };

  handleCameraCallback = response => {
    if (response.didCancel) {
      console.log('User cancelled camera');
    } else if (response.error) {
      console.log('Camera Error: ', response.error);
    } else {
      const imageUri = response.uri || response.assets?.[0]?.uri;
      this.setState({userImage: imageUri}, () => {
        // Handle the selected image URI here
        this.updateUserImageInAsyncStorage(imageUri);
      });
    }
  };
  handleImageUpload = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // Show options for selecting from gallery or launching the camera
    Alert.alert(
      'Choose Image Source',
      'Select an image source:',
      [
        {
          text: 'Gallery',
          onPress: () => {
            this.launchImageLibrary(options);
          },
        },
        {
          text: 'Camera',
          onPress: () => {
            this.launchCamera(options);
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };
  launchImageLibrary = options => {
    launchImageLibrary(options, response => {
      this.handleImageLibraryCallback(response);
    });
  };

  launchCamera = options => {
    launchCamera(options, response => {
      this.handleCameraCallback(response);
    });
  };

  updateUserImageInAsyncStorage = async imageUri => {
    const {userName} = this.props.route.params;

    try {
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);

        // Update user image in user data
        userData.forEach(user => {
          if (user.userName === userName) {
            user.userImage = imageUri;
          }
        });

        // Save the updated user data back to AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(userData));

        // Show a success message to the user
        Alert.alert('Success', 'Image updated successfully!', [
          {text: 'OK', onPress: () => {}},
        ]);
      }
    } catch (error) {
      console.error('Error updating user image:', error);
      // Show an error message to the user
      Alert.alert('Error', 'An error occurred while updating the image.', [
        {text: 'OK', onPress: () => {}},
      ]);
    }
  };

  render() {
    const {userDetails, userImage} = this.state;

    return (
      <View style={styles.container}>
        {userDetails ? (
          <View style={styles.userCard}>
            <View style={styles.header}>
              <TouchableOpacity onPress={this.handleImageUpload}>
                <Image
                  source={
                    userImage
                      ? {uri: userImage}
                      : require('../../assets/images/user.png')
                  }
                  style={{width: 100, height: 100, marginRight: 15}}
                />
              </TouchableOpacity>
              <View style={styles.user}>
                <Text style={styles.userName}>{userDetails.userName}</Text>
                <Text style={styles.mobileNumber}>
                  {userDetails.mobileNumber}
                </Text>
              </View>
            </View>
            <View style={styles.details}>
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
          </View>
        ) : (
          <Text>Loading user details...</Text>
        )}
        <View style={styles.buttonContainer}>
          <CustomButton
            signUpButton
            label="SAVE"
            handlePress={this.handleSaveChanges}
          />
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

// launchImagePicker = options => {
//   launchImageLibrary(options, response => {
//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.error) {
//       console.log('ImagePicker Error: ', response.error);
//     } else {
//       const imageUri = response.uri;
//       this.setState({userImage: imageUri}, () => {
//         // Handle the selected image URI here
//         this.updateUserImageInAsyncStorage(imageUri);
//       });
//     }
//   });
// };

// launchCamera = options => {
//   launchCamera(options, response => {
//     if (response.didCancel) {
//       console.log('User cancelled camera');
//     } else if (response.error) {
//       console.log('Camera Error: ', response.error);
//     } else {
//       const imageUri = response.uri || response.assets?.[0]?.uri;
//       this.setState({userImage: imageUri}, () => {
//         // Handle the selected image URI here
//         this.updateUserImageInAsyncStorage(imageUri);
//       });
//     }
//   });
// };

// launchImagePicker = options => {
//   launchImageLibrary(options, response => {
//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.error) {
//       console.log('ImagePicker Error: ', response.error);
//     } else {
//       const imageUri = response.uri;
//       this.setState({userImage: imageUri}, () => {
//         // Handle the selected image URI here
//         this.updateUserImageInAsyncStorage(imageUri);
//       });
//     }
//   });
// };
// launchCamera = options => {
//   launchCamera(options, response => {
//     if (response.didCancel) {
//       console.log('User cancelled camera');
//     } else if (response.error) {
//       console.log('Camera Error: ', response.error);
//     } else {
//       const imageUri = response.uri || response.assets?.[0]?.uri;
//       this.setState({userImage: imageUri}, () => {
//         // Handle the selected image URI here
//         this.updateUserImageInAsyncStorage(imageUri);
//       });
//     }
//   });
// };
