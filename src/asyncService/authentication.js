import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';

export const authentication = async (userName, password) => {
  try {
    const userDataJSON = await AsyncStorage.getItem('userData');

    if (userDataJSON) {
      const userData = JSON.parse(userDataJSON);

      // Find the user by username and password
      const authenticatedUser = userData.find(
        user => user.userName === userName && user.password === password,
      );

      if (authenticatedUser) {
        return {success: true, user: authenticatedUser};
      } else {
        const errorMessage =
          'Authentication failed. Incorrect username or password.';
        console.error(errorMessage);

        // Log the authentication failure in Crashlytics
        crashlytics().recordError(new Error(errorMessage));

        return {success: false, error: errorMessage};
      }
    } else {
      const errorMessage = 'User data not found.';
      console.error(errorMessage);

      // Log the missing user data in Crashlytics with an Error object
      crashlytics().recordError(new Error(errorMessage));

      return {success: false, error: errorMessage};
    }
  } catch (error) {
    console.error('Error fetching user data:', error);

    // Log the error in Crashlytics
    crashlytics().recordError(error);

    return {success: false, error: 'Error fetching user data'};
  }
};
export const checkAuthentication = async () => {
  try {
    const userDataJSON = await AsyncStorage.getItem('userData');

    if (userDataJSON) {
      const userDataArray = JSON.parse(userDataJSON);

      if (userDataArray.length > 0) {
        const userName = userDataArray[0].userName;

        if (userName) {
          // If userName exists, consider the user as authenticated
          return {authenticated: true, userName};
        }
      }
    }

    // If no user data is found, or if userName doesn't exist, the user is not authenticated
    return {authenticated: false};
  } catch (error) {
    console.error('Error checking authentication:', error);
    return {authenticated: false};
  }
};
