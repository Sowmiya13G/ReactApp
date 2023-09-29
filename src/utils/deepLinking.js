import {Linking} from 'react-native';
const linking = {
  prefixes: ['https://reactapp.com', 'reactapp://'],
  config: {
    screens: {
      LogInScreen: {
        path: 'login',
      },
    },
  },
};

export const handleDeepLink = async event => {
  const {path, queryParams} = linking.parse(event.url);
  if (path === 'login') {
    // Extract parameters from queryParams and navigate to DetailsScreen
    const {id} = queryParams;
    this.props.navigation.navigate('login', {id});
  }
};
