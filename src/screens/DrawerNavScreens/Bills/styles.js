import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  productList: {
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
  },
  details: {
    flexDirection: 'column',
    marginLeft: 15,
    marginRight: 15,
  },
  productImage: {
    width: 50,
    height: 50,
  },
  productName: {
    fontSize: 16,
    color: '#000',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  totalPrice: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    bottom: 0,
    alignSelf: 'flex-end',
  },
});
