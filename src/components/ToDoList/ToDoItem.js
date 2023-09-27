import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';
class ToDoItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.indexContainer}>
          <Text style={styles.index}>{this.props.index}</Text>
        </View>
        <View style={styles.taskContainer}>
          <Text style={styles.task}>{this.props.task}</Text>
          <TouchableOpacity onPress={() => this.props.deleteTask()}>
            <Icons style={styles.delete} name="delete" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
  },
  indexContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#000',
    borderWidth: 2,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  index: {
    color: '#000',
    fontSize: 20,
  },
  taskContainer: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 50,
  },
  task: {
    color: '#000',
    width: '90%',
    fontSize: 16,
  },
  delete: {
    marginLeft: 10,
    color: '#000',
  },
});

export default ToDoItem;
