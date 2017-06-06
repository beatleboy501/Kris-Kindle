import React, { Component } from 'react';
import Main from './app/screens/Main.js';
import { AppRegistry, View, StyleSheet, Text } from 'react-native';

export default class kris_kindle extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Main></Main>
    );
  }
}

AppRegistry.registerComponent('kris_kindle', () => kris_kindle);
