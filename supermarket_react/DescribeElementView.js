import React, { Component, } from 'react'
import {
  View,
  TextInput,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'

class DescribeElementView extends Component {

  constructor(props) {
    super(props)
    
    this.state = {}
    this.state.identifier = this.props.element.identifier
    this.state.name = this.props.element.name
    this.state.price = this.props.element.price
    this.state.description = this.props.element.description
    this.state.edit = false
    this.state.value = 'Edit'
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Product</Text>
          <View>
            <Text>identifier</Text>
            <TextInput editable={this.state.edit} style={styles.textInput} value={this.state.identifier}
                  onChangeText={(identifier) => this.setState({identifier})}/>
             <Text>name</Text>
             <TextInput editable={this.state.edit} style={styles.textInput} value={this.state.name}
                  onChangeText={(name) => this.setState({name})}/>
            <Text>price</Text>
             <TextInput editable={this.state.edit} style={styles.textInput} value={this.state.price}
                  onChangeText={(price) => this.setState({price})}/>
            <Text>description</Text>
             <TextInput editable={this.state.edit} style={styles.textInput} value={this.state.description}
                  onChangeText={(description) => this.setState({description})}/>
          </View>
          <View>
            <TouchableHighlight style={{height: 60 }} onPress={() => {
                if (this.state.edit) {
                  this.updateElement()
                  this.props.navigator.pop()
                }
                this.setState({edit: true})
                this.setState({value: 'Save'})}}>
           <Text>{this.state.value}</Text>
           </TouchableHighlight>
          </View>
        </View>
    )
}
  
  updateElement() {
    var i = this.props.store.length;
    while ( i --> 0 ) {
      if ( this.props.store[i].identifier == this.props.element.identifier ) {
        this.props.store[i].identifier = this.state.identifier
          this.props.store[i].name = this.state.name
          this.props.store[i].price = this.state.price
          this.props.store[i].description = this.state.description
          break;
      }    
    } 
  }
  
}
const styles = StyleSheet.create({
  container: {
    top: 60,
    marginLeft: 0
  },
  textInput: {
    height: 60,
    marginLeft: 0,
  },
  });
export default DescribeElementView