import React, { Component, } from 'react'
import {
  View,
  TextInput,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'

import Communications from 'react-native-communications';
import { ListView } from 'realm/react-native'
import realm from './realm';

class AddElementView extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.state.identifier = ''
    this.state.name = ''
    this.state.price = ''
    this.state.description = ''
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Product</Text>
          <View>
            <Text style={styles.text}>identifier</Text>
            <TextInput style={styles.textInput} value={this.state.identifier}
                  onChangeText={(identifier) => this.setState({identifier})}/>
             <Text style={styles.text}>name</Text>
             <TextInput style={styles.textInput} value={this.state.name}
                  onChangeText={(name) => this.setState({name})}/>
            <Text style={styles.text}>price</Text>
             <TextInput style={styles.textInput} value={this.state.price}
                  onChangeText={(price) => this.setState({price})}/>
            <Text style={styles.text}>description</Text>
             <TextInput style={styles.textInput} value={this.state.description}
                  onChangeText={(description) => this.setState({description})}/>
          </View>
          <View>
            <TouchableHighlight style={styles.button} onPress={() => {
                this.addElement()
                this.props.navigator.pop()}}>
           <Text style={{color: 'white'}}>Add</Text>
           </TouchableHighlight>
          </View>
        </View>)
  }
  
  async addElement() {
     var body = "Elements:" + JSON.stringify(this.props.store) + "\n Product:" + JSON.stringify(this.state)
     Communications.email(['victor.ursan@gmail.com'], null, null, 'Added new Product', body)
     realm.write(() => {
      realm.create('RealmProduct', {identifier: this.state.identifier, name: this.state.name, price: parseFloat(this.state.price), productDescription: this.state.description});
    });
  }
}

const styles = StyleSheet.create({
  container: {
    top: 50,
    marginLeft: 0
  },
 textInput: {
    height: 30,
    marginLeft: 0,
    borderWidth: 1,
    borderRadius: 3,
  },
  button: {
    top: 10,
    backgroundColor: 'blue',
    height: 30,
    flexBasis: 1,
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    marginTop:15,
  },
  });
export default AddElementView