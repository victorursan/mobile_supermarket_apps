import NavigationBar from 'react-native-navbar'

import React, { Component } from 'react';
import {
  AppRegistry,
  Alert,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
} from 'react-native'


export default class supermarket_react extends Component {
  render() {
  const routes = [
    {title: 'First Scene', index: 0},
    {title: 'Second Scene', index: 1},
  ];
  return (
    <Navigator
      initialRoute={routes[0]}
      initialRouteStack={routes}
      renderScene={(route, navigator) =>
        <TouchableHighlight onPress={() => {
          if (route.index === 0) {
            navigator.push(routes[1]);
          } else {
            navigator.pop();
          }
        }}>
        <Text>Hello {route.title}!</Text>
        </TouchableHighlight>
      }
      navigationBar={
        <Navigator.NavigationBar
          routeMapper={{
            LeftButton: (route, navigator, index, navState) => {  
              if (route.index === 0) {
                  return;
              } else {
                  return (
                    <TouchableHighlight onPress={() => navigator.pop()}>
                      <Text>Back</Text>
                    </TouchableHighlight>); 
              }},
            RightButton: (route, navigator, index, navState) => { 
              if (route.index === 0) {
                  return (
                    <TouchableHighlight onPress={() => navigator.push(routes[1])}>
                      <Text>+</Text>
                    </TouchableHighlight>);
              } else {
                return (
                    <TouchableHighlight onPress={() => navigator.pop()}>
                      <Text>-</Text>
                    </TouchableHighlight>);
              }},
         Title: (route, navigator, index, navState) =>
           { return (<Text>Awesome Nav Bar</Text>); },
       }}
       style={{backgroundColor: 'gray'}}
     />
  }
      style={{padding: 100}}
    />
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#eeeeee',
    padding: 10,
  },
});

AppRegistry.registerComponent('supermarket_react', () => supermarket_react);
