import React, {Component} from 'react';
import {Modal, View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';
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

export default ProductDetailsModal;
