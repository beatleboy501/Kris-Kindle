import React, { Component } from 'react';
import Login from './app/components/login/Login.js';
import { AppRegistry, View, StyleSheet, Text } from 'react-native';

export default class kris_kindle extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Login></Login>
    );
  }
}

AppRegistry.registerComponent('kris_kindle', () => kris_kindle);
