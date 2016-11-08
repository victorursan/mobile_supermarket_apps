import React, { Component, } from 'react'
import {
  View,
  TextInput,
  Text,
  TouchableHighlight,
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
  }

  render() {
   if (!this.state.edit) {
    return (
      <View>
        <Text>Product</Text>
          <View>
            <Text>identifier</Text>
            <TextInput editable={this.state.edit} style={{height: 60 }} value={this.state.identifier}
                  onChangeText={(identifier) => this.setState({identifier})}/>
             <Text>name</Text>
             <TextInput editable={this.state.edit} style={{height: 60 }} value={this.state.name}
                  onChangeText={(name) => this.setState({name})}/>
            <Text>price</Text>
             <TextInput editable={this.state.edit} style={{height: 60 }} value={this.state.price}
                  onChangeText={(price) => this.setState({price})}/>
            <Text>description</Text>
             <TextInput editable={this.state.edit} style={{height: 60 }} value={this.state.description}
                  onChangeText={(description) => this.setState({description})}/>
          </View>
          <View>
            <TouchableHighlight style={{height: 60 }} onPress={() => {this.setState({edit: true})}}>
           <Text>Edit</Text>
           </TouchableHighlight>
          </View>
        </View>
    )
  } else {
   return ( <View>
        <Text>Product</Text>
          <View>
            <Text>identifier</Text>
            <TextInput editable={this.state.edit} style={{height: 60 }} value={this.state.identifier}
                  onChangeText={(identifier) => this.setState({identifier})}/>
             <Text>name</Text>
             <TextInput editable={this.state.edit} style={{height: 60 }} value={this.state.name}
                  onChangeText={(name) => this.setState({name})}/>
            <Text>price</Text>
             <TextInput editable={this.state.edit} style={{height: 60 }} value={this.state.price}
                  onChangeText={(price) => this.setState({price})}/>
            <Text>description</Text>
             <TextInput editable={this.state.edit} style={{height: 60 }} value={this.state.description}
                  onChangeText={(description) => this.setState({description})}/>
          </View>
          <View>
            <TouchableHighlight style={{height: 60 }} onPress={() => {
                this.setState({edit: false})
                this.addElement()
                this.props.navigator.pop()}}>
           <Text>Save</Text>
           </TouchableHighlight>
          </View>
        </View>
)  }

}
  
  addElement() {
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

export default DescribeElementView