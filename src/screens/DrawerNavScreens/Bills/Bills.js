import React, {Component} from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {styles} from './styles';
export class Bills extends Component {
  componentDidMount() {
    const {route} = this.props;
    console.log('route.params:', route.params);
    const cart = route?.params?.cart || [];
    this.setState({cart});
  }
  render() {
    const {route} = this.props;
    const cart = route?.params?.cart || [];

    const totalPrice = cart.reduce(
      (total, product) => total + product.price,
      0,
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your Bills</Text>
        <FlatList
          data={cart}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.productList}>
              <Image source={{uri: item.image}} style={styles.productImage} />
              <View style={styles.details}>
                <Text style={styles.productName}>{item.title}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
            </View>
          )}
        />
        <Text style={styles.totalPrice}>
          Total Price: ${totalPrice.toFixed(2)}
        </Text>
      </View>
    );
  }
}
