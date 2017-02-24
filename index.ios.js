import React, { Component } from 'react';
import Home from './app/components/Home.js';
import { AppRegistry, View, StyleSheet, Text } from 'react-native';

export default class kris_kindle extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Home></Home>
    );
  }
}

AppRegistry.registerComponent('kris_kindle', () => kris_kindle);
