import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class ToDoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: '',
    };
  }

  handleAddTask = () => {
    const {task} = this.state;
    this.props.addTask(task);
    this.setState({task: ''});
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TextInput
          style={styles.inputField}
          value={this.state.task}
          onChangeText={text => this.setState({task: text})}
          placeholder={'Write a task'}
          placeholderTextColor={'gray'}
        />
        <TouchableOpacity onPress={() => this.handleAddTask()}>
          <View style={styles.button}>
            <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: '#fff',
    backgroundColor: '#444444',
    borderWidth: 1,
    marginHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 20,
  },
  inputField: {
    color: '#fff',
    height: 50,
    flex: 1,
  },
  button: {
    height: 30,
    width: 30,
    borderRadius: 5,
    backgroundColor: '#fbdb03',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ToDoInput;
