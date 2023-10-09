import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';

export const checkAuthentication = async () => {
  try {
    const userDataJSON = await AsyncStorage.getItem('userData');
    console.log('userDataJSON:', userDataJSON);
    if (userDataJSON) {
      const userDataArray = JSON.parse(userDataJSON);
      console.log('parsed userDataArray', userDataArray);

      const authenticatedUserJSON = await AsyncStorage.getItem(
        'authenticatedUser',
      );
      if (authenticatedUserJSON) {
        const authenticatedUser = JSON.parse(authenticatedUserJSON);
        console.log('authenticatedUser'.authenticatedUser);

        return {
          authenticated: true,
          userName: authenticatedUser.userName,
        };
      }
    }

    return {authenticated: false};
  } catch (error) {
    console.error('Error checking authentication:', error);
    return {authenticated: false};
  }
};

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
