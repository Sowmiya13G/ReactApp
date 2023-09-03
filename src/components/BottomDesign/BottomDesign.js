import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';

class BottomDesign extends Component {
  render() {
    return (
      <View>
        <Image
          source={require('../../assets/images' + '/bottomdesign.png')}
          style={styles.design}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  design: {
    width: '100%',
    height: 100,
  },
});

export default BottomDesign;
