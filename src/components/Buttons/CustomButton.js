import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

class CustomButton extends Component {
  render() {
    const { signUpButton, label = "", logInButton, handlePress = () => {} } = this.props;

    return (
      <View>
        <TouchableOpacity
          style={
            signUpButton
              ? styles.signUpButton
              : logInButton
              ? styles.logInButton
              : ""
          }
          onPress={handlePress}
        >
          <Text
            style={
              signUpButton
                ? styles.signUpButtonText
                : logInButton
                ? styles.logInButtonText
                : ""
            }
          >
            {label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logInButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#000000",
    borderColor: "#000000",
    borderWidth: 2,
    marginBottom: 20,
  },
  signUpButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "white",
  },
  logInButtonText: {
    color: "#fff",
  },
  signUpButtonText: {
    color: "#000000",
  },
});

export default CustomButton;
