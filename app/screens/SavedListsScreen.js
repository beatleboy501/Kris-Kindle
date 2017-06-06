import React, { Component } from 'react';
import { AppRegistry, View, StyleSheet, Text } from 'react-native';
import ListViewComponent from '../components/ListViewComponent'

export default class SavedListsScreen extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    return(
          <ListViewComponent></ListViewComponent>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

AppRegistry.registerComponent('SavedListsScreen', () => SavedListsScreen);
