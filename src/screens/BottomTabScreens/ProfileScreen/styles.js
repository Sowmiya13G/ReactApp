import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  userName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  mobileNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  user: {
    flexDirection: 'column',
  },
  userCard: {
    borderRadius: 8,
    padding: 15,
    margin: 20,
    width: '90%',
  },
  text: {
    fontSize: 18,
    color: 'black',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    width: '60%',
    margin: 20,
  },
  details: {
    marginTop: 30,
  },
});
