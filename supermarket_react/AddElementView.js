import React, { Component, } from 'react'
import {
  View,
  TextInput,
  Text,
  TouchableHighlight,
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
      <View>
        <Text>Product</Text>
          <View>
            <Text>identifier</Text>
            <TextInput style={{height: 60 }} value={this.state.identifier}
                  onChangeText={(identifier) => this.setState({identifier})}/>
             <Text>name</Text>
             <TextInput style={{height: 60 }} value={this.state.name}
                  onChangeText={(name) => this.setState({name})}/>
            <Text>price</Text>
             <TextInput style={{height: 60 }} value={this.state.price}
                  onChangeText={(price) => this.setState({price})}/>
            <Text>description</Text>
             <TextInput style={{height: 60 }} value={this.state.description}
                  onChangeText={(description) => this.setState({description})}/>
          </View>
          <View>
            <TouchableHighlight style={{height: 60 }} onPress={() => {}}>
           <Text>
             Add
           </Text>
           </TouchableHighlight>
          </View>
        </View>
    )
  }
}

export default AddElementView