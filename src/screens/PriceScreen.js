import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export class PriceScreen extends Component {
  render() {
    return (
      <View>
        <Text style={styles.text}>PRICE SCREEN</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: '#000',
  },
});
export default PriceScreen;
