import React, { Component, } from 'react'
import {PickerField, InputField, Form} from "react-native-form-generator";
import { View, TouchableHighlight, Text, StyleSheet } from 'react-native'
import SupermarketListView from './SupermarketListView'
import RealmProduct from "./realm";

class LoginView extends Component {

  static propTypes = {}

  static defaultProps = {}

  constructor(props) {
    super(props)
    this.state = {}
    this.state.user = ""
    this.state.password = ""
  }

  render() {
    return (
      <View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Form>
          <InputField autoCapitalize={false} ref='user' label='user' placeholder='user email' onChangeText={(user) => this.setState({user})}/>
          <InputField autoCapitalize={false} secureTextEntry={true} ref='password' label='password' placeholder='password' onChangeText={(password) => this.setState({password})}/>
        </Form>
        <TouchableHighlight
                  onPress={() => 
       Realm.Sync.User.login('http://127.0.0.1:9080/', this.state.user, this.state.password, (error, user) => {
         if (!error) {
            var realm = new Realm({
              sync: {
                user: user,
                url: 'realm://127.0.0.1:9080/~/products',
              },
              schema: [RealmProduct]});
            
            this.realm = realm
            this.props.navigator.push({component: SupermarketListView, title: "SupermarketListView", passProps: {realm: this.realm, store: this.props.store, navigator: this.props.navigator}, index: 2});
         } else {
           alert("user not found")
         }
       })} style={styles.containerRow}>
                <Text style={styles.text}>Login</Text>
              </TouchableHighlight>
      </View>
    )
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

export default LoginView