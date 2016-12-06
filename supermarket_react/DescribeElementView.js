import React, { Component, } from 'react'
import {
  View,
  TextInput,
  Text,
  TouchableHighlight,
  StyleSheet,
  DatePickerIOS,
} from 'react-native'

import realm from './realm';

class DescribeElementView extends Component {

  constructor(props) {
    super(props)
    
    this.state = {}
    this.state.identifier = this.props.element.identifier
    this.state.name = this.props.element.name
    this.state.price = this.props.element.price.toString()
    this.state.description = this.props.element.productDescription
    this.state.edit = false
    this.state.value = 'Edit'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Product</Text>
          <View>
            <Text style={styles.text}>identifier</Text>
            <TextInput editable={false} style={styles.textInput} value={this.state.identifier}
                  onChangeText={(identifier) => this.setState({identifier})}/>
             <Text style={styles.text}>name</Text>
             <TextInput editable={this.state.edit} style={styles.textInput} value={this.state.name}
                  onChangeText={(name) => this.setState({name})}/>
            <Text style={styles.text}>price</Text>
             <TextInput editable={this.state.edit} style={styles.textInput} value={this.state.price}
                  onChangeText={(price) => this.setState({price})}/>
            <Text style={styles.text}>description</Text>
             <TextInput editable={this.state.edit} style={styles.textInput} value={this.state.description}
                  onChangeText={(description) => this.setState({description})}/>
          </View>
          <View>
            <TouchableHighlight style={styles.button} onPress={() => {
                if (this.state.edit) {
                  this.updateElement()
                  this.props.navigator.pop()
                }
                this.setState({edit: true})
                this.setState({value: 'Save'})}}>
           <Text style={{color: 'white'}}>{this.state.value}</Text>
           </TouchableHighlight>
          </View>
        </View>
    )
}
  
  async updateElement() {
    realm.write(() => {
      realm.create('RealmProduct', {identifier: this.state.identifier, name: this.state.name, price: parseFloat(this.state.price), productDescription: this.state.description}, true);
    })
  }
  
}
const styles = StyleSheet.create({
  container: {
    top: 60,
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
    flexGrow: 1,
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 16,
    marginTop:15,
  }
  });
export default DescribeElementView