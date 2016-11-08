import React, { Component, } from 'react'
import {
  View,
  TextInput,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'

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
        <Text>Product</Text>
          <View>
            <Text>identifier</Text>
            <TextInput style={styles.textInput} value={this.state.identifier}
                  onChangeText={(identifier) => this.setState({identifier})}/>
             <Text>name</Text>
             <TextInput style={styles.textInput} value={this.state.name}
                  onChangeText={(name) => this.setState({name})}/>
            <Text>price</Text>
             <TextInput style={styles.textInput} value={this.state.price}
                  onChangeText={(price) => this.setState({price})}/>
            <Text>description</Text>
             <TextInput style={styles.textInput} value={this.state.description}
                  onChangeText={(description) => this.setState({description})}/>
          </View>
          <View>
            <TouchableHighlight style={{height: 60 }} onPress={() => {
                this.addElement()
                this.props.navigator.pop()}}>
           <Text>Add</Text>
           </TouchableHighlight>
          </View>
        </View>
    )
  }
  
  addElement() {
     var newItem = {}
        newItem.identifier = this.state.identifier
        newItem.name = this.state.name
        newItem.price = this.state.price
        newItem.description = this.state.description
         this.props.store.push(newItem);
  }
}
const styles = StyleSheet.create({
  container: {
    top: 50,
    marginLeft: 0
  },
 textInput: {
    height: 60,
    marginLeft: 0,
  },
  });
export default AddElementView