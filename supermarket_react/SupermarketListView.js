import React, {Component} from "react";
import {AppRegistry, Alert, StyleSheet, Text, View, TouchableHighlight} from "react-native";
import DescribeElementView from "./DescribeElementView";
import {ListView} from "realm/react-native";
import realm from "./realm";
import Swipeout from "react-native-swipeout";

class SupermarketListView extends Component {
    constructor(props) {
        super(props);
        let elements = realm.objects('RealmProduct');
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        realm.objects('RealmProduct').addListener((products, changes) => {
            this.setState({dataSource: this.state.dataSource.cloneWithRows(products)})
        });
        this.state = {
            dataSource: ds.cloneWithRows(elements),
            data: elements
        };
    }

    async deleteProduct(product) {
        realm.write(() => {
            realm.delete(product)
        })
    }

    renderRow(rowData) {
        let swipeBtns = [{
            text: 'Delete',
            backgroundColor: 'red',
            underlayColor: 'white',
            onPress: () => {
                Alert.alert(
                    'Delete',
                    "Are You sure you want to delete: " + rowData.name,
                    [{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                        {text: 'OK', onPress: () => this.deleteProduct(rowData)}]
                )
            }
        }];
        return (
            <Swipeout right={swipeBtns}
                      autoClose='true'
                      backgroundColor='transparent'>
              <TouchableHighlight
                  onPress={() => this.props.navigator.push({component: DescribeElementView, title: "Describe Product", passProps: {store: this.props.store, element: rowData, navigator: this.props.navigator}, index: 2})}
                  style={styles.containerRow}>
                <Text style={styles.text}>
                  Name: {rowData.name} Price: {rowData.price}
                </Text>
              </TouchableHighlight>
            </Swipeout>
        )
    }

    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={this.state.dataSource}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
                renderRow={(data) => this.renderRow(data)}/>
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