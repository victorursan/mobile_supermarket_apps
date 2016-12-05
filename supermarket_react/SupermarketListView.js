import React, { Component } from 'react';
import {
  AppRegistry,
  Alert,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native'

import DescribeElementView from './DescribeElementView'
import { ListView } from 'realm/react-native'
import realm from './realm';

class SupermarketListView extends Component {
  constructor(props) {
    super(props);
    let elements = realm.objects('RealmProduct');
//     this.realm = new Realm();
//     this.realm = new Realm({schema:[RealmProduct]})
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2 });
//     let elements = [ realm.objects('RealmProduct') ];
    
        alert("pictures: " + elements.description);
    this.state = {
      dataSource: ds.cloneWithRows(elements),
      data: elements
    };
  }
   
   componentWillReceiveProps(nextProps) {
     var newItems = [];
     var i = nextProps.store.length;
     while ( i --> 0 ) {
        var newItem = {}
        newItem.identifier = nextProps.store[i].identifier;
        newItem.name = nextProps.store[i].name;
        newItem.price = nextProps.store[i].price;
        newItem.description = nextProps.store[i].description;
        newItems.push(newItem);
    }
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(
          newItems
      ),
      loaded: true,
    });
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
        renderRow={(data) => 
         ( <TouchableHighlight 
            onPress={() => this.props.navigator.push({component: DescribeElementView, title: "Describe Product", passProps: {store: this.props.store, element: data, navigator: this.props.navigator}, index: 2})}
            style={styles.containerRow}>
          <Text style={styles.text}>
            Name: {data.name}   Price: {data.price}
          </Text>
          </TouchableHighlight>)}/>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    top: 50,
    marginLeft: 0
  },
  containerRow: {
    padding: 10,
    marginLeft: -10,
  },
  text: {
    marginLeft: 0,
    fontSize: 16,
  },
  separator: {
    flexGrow: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

export default SupermarketListView