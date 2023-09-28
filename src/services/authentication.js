import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkAuthentication = async () => {
  try {
    const userDataJSON = await AsyncStorage.getItem('userData');

    if (userDataJSON) {
      const userDataArray = JSON.parse(userDataJSON);

      if (userDataArray.length > 0) {
        const userName = userDataArray[0].userName;

        if (userName) {
          return {authenticated: true, userName};
        } else {
          return {authenticated: false};
        }
      } else {
        return {authenticated: false};
      }
    } else {
      return {authenticated: false};
    }
  } catch (error) {
    console.error('Error checking authentication:', error);
    return {authenticated: false};
  }
};
