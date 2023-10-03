import React, {Component} from 'react';
import {Keyboard, ScrollView, Text, View} from 'react-native';
import {styles} from './styles';
import ToDoInput from '../../components/ToDoList/ToDoInput';
import ToDoItem from '../../components/ToDoList/ToDoItem';
export class ShopScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
  }

  addTask = task => {
    if (task == null) return;
    this.setState({tasks: [...this.state.tasks, task]});
    Keyboard.dismiss();
  };

  deleteTask = deleteIndex => {
    this.setState({
      tasks: this.state.tasks.filter((value, index) => index !== deleteIndex),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>WISH LIST</Text>
        <ScrollView style={styles.scrollView}>
          {this.state.tasks.map((task, index) => {
            return (
              <View key={index} style={styles.taskContainer}>
                <ToDoItem
                  index={index + 1}
                  task={task}
                  deleteTask={() => this.deleteTask(index)}
                />
              </View>
            );
          })}
        </ScrollView>
        <ToDoInput addTask={this.addTask} />
      </View>
    );
  }
}

export default ShopScreen;
