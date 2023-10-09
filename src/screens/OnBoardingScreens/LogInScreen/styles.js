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
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
    marginBottom: 50,
    height: 160,
    width: 160,
  },
  logIn: {
    fontSize: 40,
    marginBottom: 20,
    color: '#000000',
    fontWeight: 'bold',
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
  password: {
    flexDirection: 'row',
  },
  icon: {
    alignItems: 'flex-end',
    right: 30,
    top: 9,
  },
  forgot: {
    alignItems: 'flex-end',
    right: 30,
    marginBottom: 30,
  },
  forgotText: {
    color: '#000000',
  },
  buttonView: {
    bottom: 0,
    paddingLeft: 25,
    paddingRight: 25,
  },
  bottom: {
    bottom: 0,
    width: '100%',
    height: 100,
  },
});
