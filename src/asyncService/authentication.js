import AsyncStorage from '@react-native-async-storage/async-storage';
import crashlytics from '@react-native-firebase/crashlytics';
// Navigator

export const checkAuthentication = async () => {
  try {
    const userDataJSON = await AsyncStorage.getItem('userData');
    console.log('userDataJSON:', userDataJSON);
    if (userDataJSON) {
      const userDataArray = JSON.parse(userDataJSON);
      if (userDataArray.length > 0) {
        const userName = userDataArray[0].userName;

        if (userName) {
          console.log('AUTHENTICATED USER NAME:', userName);
          return {authenticated: true, userName};
        }
      }
    }
    console.log('NO USER DATA:', userName);
    return {authenticated: false};
  } catch (error) {
    console.error('Error checking authentication:', error);
    return {authenticated: false};
  }
};

//

//Home screen
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

// export const checkAuthentication = async () => {
//   try {
//     const userDataJSON = await AsyncStorage.getItem('userData');

//     if (userDataJSON) {
//       const userDataArray = JSON.parse(userDataJSON);

//       // Initialize variables to store the authenticated user's data
//       let authenticated = false;
//       let userName = '';

//       // Loop through userDataArray to find the user
//       for (const userDataItem of userDataArray) {
//         if (userDataItem.userName) {
//           // If userName exists, consider the user as authenticated
//           console.log('AUTHENTICATED USER NAME:', userDataItem.userName);
//           authenticated = true;
//           userName = userDataItem.userName;
//           break; // Exit the loop as soon as the user is found
//         }
//       }

//       // Check if a user was found
//       if (authenticated) {
//         return {authenticated, userName};
//       }
//     }

//     // If no user data is found or no user was found in the array, the user is not authenticated
//     return {authenticated: false};
//   } catch (error) {
//     console.error('Error checking authentication:', error);
//     return {authenticated: false};
//   }
// };
