import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    position: 'relative',
  },
  head: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
    color: '#000000',
    fontWeight: 'bold',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 50,
    height: 160,
    width: 160,
  },
  details: {
    marginLeft: 30,
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
    marginBottom: 15,
    left: 0,
    color: '#000000',
  },
  input: {
    width: '90%',
    height: 40,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingRight: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  buttonView: {
    bottom: 0,
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 30,
  },
  bottom: {
    bottom: 0,
    width: '100%',
    height: 100,
    marginTop: 30,
  },
});
