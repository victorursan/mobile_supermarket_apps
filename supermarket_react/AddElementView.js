import React, {Component} from "react";
import {View, Text, TouchableHighlight, StyleSheet} from "react-native";
import Communications from "react-native-communications";
import realm from "./realm";
import {PickerField, InputField, Form} from "react-native-form-generator";

class AddElementView extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.identifier = '';
        this.state.name = '';
        this.state.price = '';
        this.state.description = '';
        this.state.priceValues = {};
        this.range(1000).map((elem) => this.state.priceValues[elem] = elem.toString());
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Product</Text>
                <Form>
                    <InputField ref='identifier' label='identifier' placeholder='identifier'
                                value={this.state.identifier}
                                onChangeText={(identifier) => this.setState({identifier})}/>
                    <InputField ref='name' label='name' placeholder='John'
                                value={this.state.name} onChangeText={(name) => this.setState({name})}/>
                    <PickerField
                        fieldRef='price'
                        label='price'
                        value={this.state.price}
                        placeholder='0'
                        options={this.state.priceValues}
                        onChange={(price) => this.setState({price})}
                        onValueChange={(price) => this.setState({price})}/>
                    <InputField ref='description' label='description'
                                placeholder='description' value={this.state.description}
                                onChangeText={(description) => this.setState({description})}/>
                </Form>
                <View>
                    <TouchableHighlight style={styles.button} onPress={() => {
                this.addElement();
                this.props.navigator.pop()}}>
                        <Text style={{color: 'white'}}>Add</Text>
                    </TouchableHighlight>
                </View>
            </View>)
    }

    range (n) {
        return Array.from({length: n}, (value, key) => key)
    }

    async addElement() {
        let body = "Elements:" + JSON.stringify(this.props.store) + "\n Product:" + JSON.stringify(this.state);
        Communications.email(['victor.ursan@gmail.com'], null, null, 'Added new Product', body);
        realm.write(() => {
            realm.create('RealmProduct', {
                identifier: this.state.identifier,
                name: this.state.name,
                price: parseFloat(this.state.price),
                productDescription: this.state.description
            });
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
        marginTop: 15,
    },
});
export default AddElementView