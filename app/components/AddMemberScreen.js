import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Text } from 'react-native';
import {Form, InputField} from 'react-native-form-generator';

export default class AddMemberScreen extends Component {
  constructor(props) {
    super(props)
  }

  handleFormChange(formData){
    //formData will be a json object that will contain
    // refs of every field
    //formData.first_name
    //formData.last_name
  }

  render(){
    return(
        <View style={styles.container}>
          <Form
              ref='registrationForm'
              //onFocus={this.handleFormFocus.bind(this)}
              onChange={this.handleFormChange.bind(this)}
              label="Personal Information">
            <InputField
                ref='first_name'
                label='First Name'
                placeholder='First Name'/>

            <InputField
                ref='last_name'
                label='Last Name'
                placeholder='Last Name'/>
          </Form>
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    top: 100,
    marginLeft:5,
    marginRight:5,
    backgroundColor: '#F5FCFF'
  }
});

AppRegistry.registerComponent('AddMemberScreen', () => AddMemberScreen);
