import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchUserDetails = async userName => {
  try {
    const userDataJSON = await AsyncStorage.getItem('userData');
    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);

      // Filter user data based on userName
      const userDetails = userData.find(user => user.userName === userName);

      if (userDetails) {
        return userDetails;
      } else {
        console.error('User not found');
        return null;
      }
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};
