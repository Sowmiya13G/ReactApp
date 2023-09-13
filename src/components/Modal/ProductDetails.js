import React, {Component} from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

class ProductDetailsModal extends Component {
  render() {
    const {isVisible, product, onClose, onAddToCart} = this.props;

    if (!isVisible || !product) {
      return null;
    }

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{product.title}</Text>
            <Image source={{uri: product.image}} style={styles.modalImage} />
            <Text style={styles.modalPrice}>Price: ${product.price}</Text>
            <TouchableOpacity
              onPress={() => {
                onAddToCart(product);
                onClose();
              }}
              style={styles.addToCartButton}>
              <Text style={styles.addToCartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.closeModalButton}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
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

export default ProductDetailsModal;
