import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';

export const renderTopList = ({item, showProductDetails, trackAddToCart}) => (
  <TouchableOpacity onPress={() => showProductDetails(item)}>
    <View style={styles.topListItem}>
      <Image source={{uri: item.image}} style={styles.topImage} />
      <Text style={styles.topTitle}>{item.title}</Text>
      <Text style={styles.topPrice}>${item.price}</Text>
      <TouchableOpacity
        onPress={() => trackAddToCart(item)} // Add an item to cart on press
        style={styles.addToCartButton}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

export const renderBottomList = ({
  item,
  showProductDetails,
  trackAddToCart,
}) => (
  <TouchableOpacity onPress={() => showProductDetails(item)}>
    <View style={styles.bottomListItem}>
      <Image source={{uri: item.image}} style={styles.bottomImage} />
      <Text style={styles.bottomTitle}>{item.title}</Text>
      <Text style={styles.bottomPrice}>${item.price}</Text>
      <TouchableOpacity
        onPress={() => trackAddToCart(item)}
        style={styles.addToCart}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);
