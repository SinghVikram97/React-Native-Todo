import Constants from "expo-constants";

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Switch
} from "react-native";

const styles = StyleSheet.create({
  todoContainer: { flexDirection: "row", alignItems: "center" },
  appContainer: { paddingTop: Constants.statusBarHeight }
});

let id = 0;

const Todo = props => (
  <View style={styles.todoContainer}>
    <Switch value={props.todo.checked} onValueChange={props.onToggle}></Switch>
    <Button onPress={props.onDelete} title="delete" />
    <Text>{props.todo.text}</Text>
  </View>
);

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  addTodo() {
    const text = `TODO number ${id}`;
    this.setState({
      todos: [...this.state.todos, { id: id++, text: text, checked: false }]
    });
  }

  removeTodo(id) {
    console.log(this.state.todos);
    console.log(id);
    this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) });
  }
  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo;
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked
        };
      })
    });
  }
  render() {
    return (
      <View style={styles.appContainer}>
        <Text>Todo count:{this.state.todos.length}</Text>
        <Text>
          Unchecked todo count:
          {this.state.todos.filter(todo => !todo.checked).length}
        </Text>
        <Button onPress={() => this.addTodo()} title="Add Todo"></Button>
        <ScrollView>
          {this.state.todos.map(todo => (
            <Todo
              onToggle={() => this.toggleTodo(todo.id)}
              onDelete={() => this.removeTodo(todo.id)}
              todo={todo}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
