import React, {Component} from "react";
import {AppRegistry, Alert, StyleSheet, Text, View, Navigator, TouchableHighlight} from "react-native";
import SupermarketListView from "./SupermarketListView.js";
import AddElementView from "./AddElementView.js";
import LoginView from "./loginView.js"

export default class supermarket_react extends Component {
  constructor(props) {
    super(props);
  }
  
  renderScene(route, navigator) {
    return <route.component {...route.passProps} navigator={navigator}/>
  }

  render() {
    const routes = [
      {component: LoginView, title: "Login View", index: 0},
      {component: AddElementView, title: "Add Product", index: 1},
    ];
    return (
      <Navigator
      initialRoute={routes[0]}
      initialRouteStack={routes}
      renderScene={this.renderScene}

      navigationBar={
        <Navigator.NavigationBar
        routeMapper={{
          LeftButton: (route, navigator, index, navState) => {
            if (route.index === 0) {
              return null;
            } else {
              return (
                <TouchableHighlight onPress={() => navigator.pop()}>
                <Text style={styles.text}>Back</Text>
                </TouchableHighlight>);
              }},
              RightButton: (route, navigator, index, navState) => {
                return (
                  <TouchableHighlight onPress={() => navigator.push(routes[1])}>
                  <Text style={styles.text}>+</Text>
                  </TouchableHighlight>);
                },
                Title: (route, navigator, index, navState) =>
                { return (<Text style={styles.text}>{route.title}</Text>); },
              }}
              style={{backgroundColor: 'gray'}}/>} style={{padding: 10}}/>
            );
          }
        }

        const styles = StyleSheet.create({
          text: {
            marginLeft: 10,
            marginRight: 10,
            fontSize: 16,
            marginTop: 15,
          },
        });

        AppRegistry.registerComponent('supermarket_react', () => supermarket_react);
