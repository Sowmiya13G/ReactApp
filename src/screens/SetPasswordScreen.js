import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";

class SetPasswordScreen extends Component {
  render() {
    return (
      <View>
        <Text style={{ textTransform: "uppercase" }}>
          Here you can update your Password
        </Text>
        <Text>New Password</Text>
        <Text>Confirm Password</Text>
      </View>
    );
  }
}

export default SetPasswordScreen;

const styles = StyleSheet.create({});
