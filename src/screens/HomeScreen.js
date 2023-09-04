import React, { Component } from "react";
import { StyleSheet, Image, View } from "react-native";
import CustomButton from '../components/Buttons/CustomButton';
import BottomDesign from '../components/BottomDesign/BottomDesign'

class HomeScreen extends Component {
  goToLogOut = () => {
    this.props.navigation.navigate('LogInScreen');
  };

  render() {
    return (
      <View style={styles.container}>
         <Image source={require('./../assets/images/home.jpg')} 
          style={styles.logo}
          />
          <CustomButton logInButton label='LOG OUT' handlePress={this.goToLogOut}/>
          <View style={styles.bottom}>
          <BottomDesign />
        </View>
      </View>
    )
  }
}
  



const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'center',
  },
  logo: {
    height:200,
    width:200,
  },
  bottom: {
    bottom: 0,
    width: '100%',
    height: 100,
    position: "absolute"
  }
})

export default HomeScreen
