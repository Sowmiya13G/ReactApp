import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  modalImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 16,
    marginBottom: 10,
    color: 'green',
  },
  addToCartButton: {
    backgroundColor: '#0000FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeModalButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeModalButtonText: {
    color: '#000000',
  },
});
