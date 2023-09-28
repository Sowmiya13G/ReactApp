import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const imageWidth = windowWidth * 0.7;
const imageHeight = imageWidth * 0.6;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: '60%',
    width: imageWidth,
    height: imageHeight,
  },
  buttonView: {
    marginTop: '10%',
    width: '80%',
  },
  bottom: {
    flex: 0,
    marginTop: '30%',
    justifyContent: 'flex-end',
    width: '100%',
    height: '20%',
  },
});
