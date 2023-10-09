import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: '#fff',
  },
  header: {
    top: 25,
    left: 20,
    flexDirection: 'row',
  },
  text: {
    fontSize: 25,
    color: '#1909f5',
    left: 25,
  },
  title: {
    fontSize: 25,
    color: '#000000',
    left: 20,
  },
  apiContainer: {
    flex: 1,
    marginTop: 30,
    padding: 20,
    left: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
    marginTop: 20,
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 10,
  },
  bottomListTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewMoreButtonText: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
    right: 10,
    // position: 'absolute',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    opacity: 0.5,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
