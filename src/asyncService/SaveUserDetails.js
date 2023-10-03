import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
// SIGN UP SCREEN
export const saveUserDetails = async userData => {
  try {
    const userKey = userData.email.toLowerCase();

    const existingUsersData = await AsyncStorage.getItem('userData');
    let updatedUsersData = [];

    if (existingUsersData) {
      updatedUsersData = JSON.parse(existingUsersData);
    }

    const userExists = updatedUsersData.some(
      user => user.email.toLowerCase() === userKey,
    );

    if (userExists) {
      Alert.alert('User already exists');
      return false;
    }

    // Add the new user data to the array
    updatedUsersData.push(userData);

    // Save the updated user data to AsyncStorage
    await AsyncStorage.setItem('userData', JSON.stringify(updatedUsersData));
    Alert.alert('Sign up successful');
    console.log('STORED USER DATA:', updatedUsersData);
    return true;
  } catch (error) {
    console.error('Error saving user details:', error);
    return false;
  }
};

// DETAILS SCREEN
export const handleSaveDetails = async (
  userName,
  newDetails,
  designation,
  company,
  address,
  location,
  setStateCallback,
  navigation,
) => {
  try {
    const userDataJSON = await AsyncStorage.getItem('userData');
    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);
      const userIndex = userData.findIndex(user => user.userName === userName);
      if (userIndex !== -1) {
        const updatedUser = {
          ...userData[userIndex],
          designation,
          company,
          address,
          location,
          ...newDetails,
        };
        userData[userIndex] = updatedUser;
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        console.log('MERGED DETAILS:', userData);
        Alert.alert('Details saved successfully');
        navigation.navigate('HomeScreen', {
          email: updatedUser.email,
          userName,
        });
        setStateCallback({
          userDetails: updatedUser,
          newDetails: {},
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
