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

import SupermarketListView from './SupermarketListView.js'
import AddElementView from './AddElementView.js'
import DescribeElementView from './DescribeElementView.js'

export default class supermarket_react extends Component {
  constructor(props) {
    super(props);
    this.store = [
     { "identifier": "123", "name": "ceva", "price": "123.123", "description": "asd"},
     { "identifier": "124", "name": "cev", "price": "321.1", "description": "asd3"},
     { "identifier": "125", "name": "ve", "price": "123", "description": "asd2"},
     { "identifier": "126", "name": "a", "price": "33", "description": "asd1"},
   ];
  }
  renderScene (route, navigator) {
    return <route.component {...route.passProps} navigator={navigator}/>
  }

  render() {
  const routes = [
    {component: SupermarketListView, title: "List Supermarket", passProps: {store: this.store}, index: 0},
    {component: AddElementView, title: "Add Product", passProps: {store: this.store}, index: 1},
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
                return null;
              }},
         Title: (route, navigator, index, navState) =>
           { return (<Text>{route.title}</Text>); },
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
  
});

AppRegistry.registerComponent('supermarket_react', () => supermarket_react);
