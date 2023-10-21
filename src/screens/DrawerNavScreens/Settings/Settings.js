import React, {Component} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkTheme: false, // Set the initial theme to light
    };
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }));
  };

  render() {
    const {isDarkTheme} = this.state;

    // Define styles for both dark and light themes
    const lightThemeStyles = {
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      },
      text: {
        color: 'black',
      },
    };

    const darkThemeStyles = {
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      },
      text: {
        color: 'white',
      },
    };

    const themeStyles = isDarkTheme ? darkThemeStyles : lightThemeStyles;

    return (
      <View style={[styles.container, themeStyles.container]}>
        <Text style={[styles.text, themeStyles.text]}>Settings</Text>
        <Text style={[styles.text, themeStyles.text]}>
          Dark Theme: {isDarkTheme ? 'On' : 'Off'}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.text, themeStyles.text]}>Light</Text>
          <Switch value={isDarkTheme} onValueChange={this.toggleTheme} />
          <Text style={[styles.text, themeStyles.text]}>Dark</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default Settings;
