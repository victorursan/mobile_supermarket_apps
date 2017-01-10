import React, {Component} from "react";
import {View, Text, TouchableHighlight, StyleSheet, ART} from "react-native";
import {PickerField, InputField, Form} from "react-native-form-generator";
import BarChart from "react-native-chart";

class DescribeElementView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.realm = this.props.realm
        this.state.identifier = this.props.element.identifier;
        this.state.name = this.props.element.name;
        this.state.price = this.props.element.price.toString();
        this.state.description = this.props.element.productDescription;
        this.state.edit = false;
        this.state.value = 'Edit';
        this.state.priceValues = {};
        this.range(1000).map((elem) => this.state.priceValues[elem] = elem.toString());
        this.state.chartData = [];

        this.user = false;

      let elements = this.realm.objects('RealmProduct');

        for (let i = 0; i < elements.length; i++) {
            this.state.chartData.push([elements[i].name, elements[i].price])
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Product</Text>
                <Form>
                    <InputField editable={false} ref='identifier' label='identifier' placeholder='identifier'
                                value={this.state.identifier}
                                onChangeText={(identifier) => this.setState({identifier})}/>
                    <InputField editable={this.state.edit} ref='name' label='name' placeholder='John'
                                value={this.state.name} onChangeText={(name) => this.setState({name})}/>
                    <PickerField
                        fieldRef='price'
                        label='price'
                        value={this.state.price}
                        placeholder='0'
                        options={this.state.priceValues}
                        onChange={(price) => this.setState({price})}
                        onValueChange={(price) => this.setState({price})}
                    />
                    <InputField editable={this.state.edit} ref='description' label='description'
                                placeholder='description' value={this.state.description}
                                onChangeText={(description) => this.setState({description})}/>
                </Form>
                <View>
                    <TouchableHighlight style={styles.button} onPress={() => {
                if (this.state.edit) {
                  this.updateElement();
                  this.props.navigator.pop()
                }
                this.setState({edit: true});
                this.setState({value: 'Save'})}}>
                        <Text style={{color: 'white'}}>{this.state.value}</Text>
                    </TouchableHighlight>
                </View>
                <View>
                    <BarChart
                        style={styles.chart}
                        data={this.state.chartData}
                        verticalGridStep={3}
                        color={'red'}
                        type="bar"
                    />
                </View>
            </View>
        )
    }

    range(n) {
        return Array.from({length: n}, (value, key) => key)
    }

    async updateElement() {
        this.realm.write(() => {
            this.realm.create('RealmProduct', {
                identifier: this.state.identifier,
                name: this.state.name,
                price: parseFloat(this.state.price),
                productDescription: this.state.description
            }, true);
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
        marginTop: 15,
    },
    chart: {
        top: 50,
        width: 300,
        height: 200,
        flexBasis: 200,
    },
});
export default DescribeElementView
