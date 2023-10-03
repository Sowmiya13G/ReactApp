import {Linking} from 'react-native';

export const openAmazonWebsite = () => {
  const amazonUrl = 'https://www.amazon.com'; // Replace with the Amazon URL you want to open
  Linking.openURL(amazonUrl)
    .then(() => {
      console.log(`Opened Amazon website: ${amazonUrl}`);
    })
    .catch(error => {
      console.error(`Error opening Amazon website: ${amazonUrl}`, error);
    });
};
