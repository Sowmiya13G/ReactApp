import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export class ShopScreen extends Component {
  render() {
    return (
      <View>
        <Text style={styles.text}>SHOP SCREEN</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: '#000',
  },
});
export default ShopScreen;
