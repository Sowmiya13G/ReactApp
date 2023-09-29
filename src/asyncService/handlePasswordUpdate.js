import AsyncStorage from '@react-native-async-storage/async-storage';

export const handlePasswordUpdate = async ({
  userName,
  newPassword,
  confirmPassword,
}) => {
  if (newPassword === confirmPassword) {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');

      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);

        // Find the user by username
        const updatedUserData = userData.map(user => {
          if (user.userName === userName) {
            return {...user, password: newPassword};
          }
          return user;
        });

        await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));

        // You can return a success message or status here if needed
        return {success: true};
      } else {
        console.error('User data not found.');
        return {success: false, error: 'User data not found'};
      }
    } catch (error) {
      console.error('Error updating password:', error);
      return {success: false, error: 'Error updating password'};
    }
  } else {
    console.error('Passwords do not match.');
    return {success: false, error: 'Passwords do not match'};
  }
};
